import { describe, expect, it } from "vitest";
import { configForm } from "../../card/editor";

type Item = { name: string; type?: string; schema?: Item[]; selector?: any };
function fields(items: Item[]): Item[] {
  return items.flatMap((i) => (i.type === "expandable" ? [i, ...fields(i.schema!)] : [i]));
}

// Scalar CardConfig fields the card reads; `actions` is YAML-only, `ingress_path` is a legacy alias, `type` is HA's.
const SCALARS = ["title", "layout", "show_logo", "logo_url", "panel_path", "conversation_agent", "theme", "tap_action"];

describe("configForm", () => {
  const form = configForm();
  const all = fields(form.schema as Item[]);
  const leaves = all.filter((f) => f.type !== "expandable");

  it("lists every scalar config field exactly once, and nothing else", () => {
    expect(leaves.map((f) => f.name).sort()).toEqual([...SCALARS].sort());
  });
  it("has a label for every field and section", () => {
    for (const f of all) expect(form.computeLabel!({ name: f.name }), f.name).toBeTruthy();
  });
  it("has helper text for the advanced and action fields", () => {
    for (const n of ["tap_action", "logo_url", "panel_path", "theme", "conversation_agent"]) {
      expect(form.computeHelper!({ name: n }), n).toBeTruthy();
    }
    expect(form.computeHelper!({ name: "tap_action" })).toMatch(/YAML-only \(actions: list\)/);
  });
  it("groups the advanced fields in an expandable section", () => {
    const adv = (form.schema as Item[]).find((i) => i.type === "expandable")!;
    expect(adv.name).toBe("advanced");
    expect(adv.schema!.map((f) => f.name)).toEqual(["logo_url", "panel_path", "theme", "conversation_agent"]);
  });
  it("uses the right selectors and option labels", () => {
    const by = Object.fromEntries(leaves.map((f) => [f.name, f.selector]));
    expect(by.tap_action).toEqual({ ui_action: {} });
    expect(by.conversation_agent).toEqual({ conversation_agent: {} });
    expect(by.show_logo).toEqual({ boolean: {} });
    expect(by.layout.select.options).toEqual([
      { value: "chatgpt", label: "ChatGPT style (wide)" },
      { value: "grok", label: "Grok style (square)" },
    ]);
    expect(by.theme.select.options).toEqual([
      { value: "dark", label: "Dark widget" },
      { value: "auto", label: "Follow HA theme" },
    ]);
  });
  it("returns undefined for unknown names", () => expect(form.computeLabel!({ name: "zzz" })).toBeUndefined());
});
