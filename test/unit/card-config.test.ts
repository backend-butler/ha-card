import { describe, expect, it } from "vitest";
import {
  DEFAULT_BUTTONS,
  DEFAULT_TITLE,
  MAX_BUTTONS,
  normalizeConfig,
  type CardConfig,
} from "../../card/config";

const base: CardConfig = { type: "custom:butler-quick-card" };
const cfg = (extra: Record<string, unknown>) => ({ ...base, ...extra }) as CardConfig;

describe("normalizeConfig defaults", () => {
  it("fills every field for a bare config", () => {
    expect(normalizeConfig(base)).toEqual({
      title: DEFAULT_TITLE,
      layout: "chatgpt",
      show_logo: true,
      logo_url: null,
      panel_path: null, // found in hass.panels at tap time
      conversation_agent: null,
      theme: "dark",
      tap_action: null,
      buttons: DEFAULT_BUTTONS.chatgpt.map((id) => ({ id })),
    });
  });

  it("uses the grok default buttons", () => {
    expect(normalizeConfig(cfg({ layout: "grok" })).buttons.map((b) => b.id)).toEqual(["compose", "voice"]);
  });

  it("treats blank strings as absent", () => {
    const n = normalizeConfig(cfg({ title: "  ", logo_url: "", panel_path: "" }));
    expect(n.title).toBe(DEFAULT_TITLE);
    expect(n.logo_url).toBeNull();
    expect(n.panel_path).toBeNull();
  });

  it("keeps explicit values", () => {
    const n = normalizeConfig(cfg({ title: "Hi", show_logo: false, logo_url: "/local/x.png", theme: "auto" }));
    expect(n).toMatchObject({ title: "Hi", show_logo: false, logo_url: "/local/x.png", theme: "auto" });
  });

  it("rejects a non-object config", () => {
    expect(() => normalizeConfig(null as unknown as CardConfig)).toThrow("Invalid configuration");
    expect(() => normalizeConfig([] as unknown as CardConfig)).toThrow("Invalid configuration");
  });
});

describe("panel_path / ingress_path", () => {
  it("accepts ingress_path as an alias", () => {
    expect(normalizeConfig(cfg({ ingress_path: "/hassio/ingress/x" })).panel_path).toBe("/hassio/ingress/x");
  });
  it("prefers panel_path when both are set", () => {
    expect(normalizeConfig(cfg({ panel_path: "/a", ingress_path: "/b" })).panel_path).toBe("/a");
  });
  it("rejects a non-string path", () => {
    expect(() => normalizeConfig(cfg({ panel_path: 5 }))).toThrow("panel_path must be a string");
  });
});

describe("layout and theme", () => {
  it("rejects an unknown layout", () => {
    expect(() => normalizeConfig(cfg({ layout: "bing" }))).toThrow("layout must be chatgpt or grok");
    expect(() => normalizeConfig(cfg({ layout: 3 }))).toThrow("layout must be chatgpt or grok");
  });
  it("rejects an unknown theme", () => {
    expect(() => normalizeConfig(cfg({ theme: "light" }))).toThrow("theme must be dark or auto");
  });
  it("rejects a non-boolean show_logo", () => {
    expect(() => normalizeConfig(cfg({ show_logo: "no" }))).toThrow("show_logo");
  });
});

describe("conversation_agent", () => {
  it("accepts conversation.* entities", () => {
    expect(normalizeConfig(cfg({ conversation_agent: "conversation.home_assistant" })).conversation_agent).toBe(
      "conversation.home_assistant",
    );
  });
  it("rejects anything else", () => {
    expect(() => normalizeConfig(cfg({ conversation_agent: "openai_conversation" }))).toThrow(
      'conversation_agent must start with "conversation."',
    );
  });
});

describe("actions", () => {
  it("accepts up to MAX_BUTTONS", () => {
    const actions = Array.from({ length: MAX_BUTTONS }, () => ({ id: "camera" }));
    expect(normalizeConfig(cfg({ actions })).buttons).toHaveLength(MAX_BUTTONS);
  });
  it("rejects more than MAX_BUTTONS", () => {
    const actions = Array.from({ length: MAX_BUTTONS + 1 }, () => ({ id: "camera" }));
    expect(() => normalizeConfig(cfg({ actions }))).toThrow("at most");
  });
  it("rejects an unknown or missing id", () => {
    expect(() => normalizeConfig(cfg({ actions: [{ id: "flash" }] }))).toThrow("actions[0].id");
    expect(() => normalizeConfig(cfg({ actions: [{}] }))).toThrow("actions[0].id");
    expect(() => normalizeConfig(cfg({ actions: ["camera"] }))).toThrow("actions[0]");
  });
  it("rejects a non-list", () => {
    expect(() => normalizeConfig(cfg({ actions: "camera" }))).toThrow("actions must be a list");
  });
  it("ignores unknown keys but keeps icon, label and tap_action", () => {
    const n = normalizeConfig(
      cfg({
        actions: [
          { id: "mic", icon: "mdi:microphone", label: "Talk", tap_action: { action: "none" }, bogus: 1 },
          { id: "voice", extra: true },
        ],
      }),
    );
    expect(n.buttons).toEqual([
      { id: "mic", icon: "mdi:microphone", label: "Talk", tap_action: { action: "none" } },
      { id: "voice" },
    ]);
  });
  it("rejects a malformed tap_action", () => {
    expect(() => normalizeConfig(cfg({ actions: [{ id: "mic", tap_action: "go" }] }))).toThrow("tap_action");
    expect(() => normalizeConfig(cfg({ tap_action: {} }))).toThrow("tap_action");
  });
  it("an explicit empty list means no buttons, not the defaults", () => {
    expect(normalizeConfig(cfg({ actions: [] })).buttons).toEqual([]);
  });
  it("passes the pill tap_action through", () => {
    expect(normalizeConfig(cfg({ tap_action: { action: "navigate", navigation_path: "/x" } })).tap_action).toEqual({
      action: "navigate",
      navigation_path: "/x",
    });
  });
});
