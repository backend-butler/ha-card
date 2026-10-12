import { describe, expect, it, vi } from "vitest";
import { actionFor, pickPipelineId, runAction, type ActionEnv } from "../../card/actions";
import type { NormalizedConfig } from "../../card/config";
import { INTENT_KEY } from "../../shared/intent";

const base: NormalizedConfig = {
  title: "Ask Butler",
  layout: "chatgpt",
  show_logo: true,
  logo_url: null,
  panel_path: "/local_backend_butler",
  conversation_agent: null,
  theme: "dark",
  tap_action: null,
  buttons: [{ id: "camera" }, { id: "mic" }, { id: "voice" }],
};

describe("actionFor", () => {
  it("defaults to the matching Butler intent", () => {
    expect(actionFor(base, "field")).toEqual({ action: "butler", intent: "field" });
    expect(actionFor(base, "camera")).toEqual({ action: "butler", intent: "camera" });
    expect(actionFor(base, "image")).toEqual({ action: "butler", intent: "photo" });
    expect(actionFor(base, "compose")).toEqual({ action: "butler", intent: "new" });
  });
  it("uses the pill tap_action for field", () => {
    const c = { ...base, tap_action: { action: "navigate", navigation_path: "/x" } as const };
    expect(actionFor(c, "field")).toEqual({ action: "navigate", navigation_path: "/x" });
  });
  it("uses a button's tap_action, found by id", () => {
    const c = { ...base, buttons: [{ id: "camera" as const }, { id: "mic" as const, tap_action: { action: "none" as const } }] };
    expect(actionFor(c, "mic")).toEqual({ action: "none" });
    expect(actionFor(c, "camera")).toEqual({ action: "butler", intent: "camera" });
  });
  it("explicit tap_action beats conversation_agent", () => {
    const c = {
      ...base,
      conversation_agent: "conversation.x",
      buttons: [{ id: "mic" as const, tap_action: { action: "url" as const, url_path: "/u" } }],
    };
    expect(actionFor(c, "mic")).toEqual({ action: "url", url_path: "/u" });
  });
  it("conversation_agent turns only mic and voice into assist", () => {
    const c = { ...base, conversation_agent: "conversation.x" };
    expect(actionFor(c, "mic")).toEqual({ action: "assist", start_listening: true });
    expect(actionFor(c, "voice")).toEqual({ action: "assist", start_listening: true });
    expect(actionFor(c, "camera")).toEqual({ action: "butler", intent: "camera" });
    expect(actionFor(c, "field")).toEqual({ action: "butler", intent: "field" });
  });
});

describe("pickPipelineId", () => {
  const list = {
    pipelines: [
      { id: "a", conversation_engine: "conversation.home_assistant" },
      { id: "b", conversation_engine: "conversation.claude" },
    ],
    preferred_pipeline: "a",
  };
  it("matches by conversation engine", () => expect(pickPipelineId(list, "conversation.claude")).toBe("b"));
  it("falls back to preferred", () => expect(pickPipelineId(list, "conversation.none")).toBe("a"));
  it("returns undefined with nothing to pick", () => {
    expect(pickPipelineId(undefined, "x")).toBeUndefined();
    expect(pickPipelineId({ pipelines: [] }, "x")).toBeUndefined();
  });
});

function fakes() {
  const store = new Map<string, string>();
  const calls: string[] = [];
  const events: { type: string; init: any }[] = [];
  const env: ActionEnv = {
    storage: {
      getItem: (k) => store.get(k) ?? null,
      setItem: (k, v) => void store.set(k, v),
      removeItem: (k) => void store.delete(k),
    },
    pushState: (p) => void calls.push(`push:${p}`),
    dispatchLocationChanged: () => void calls.push("location-changed"),
    makeEvent: (type, init) => (events.push({ type, init }), { type } as unknown as Event),
  };
  const el = { dispatchEvent: vi.fn(), hass: undefined as any } as unknown as HTMLElement & { hass: any };
  return { store, calls, events, env, el };
}

describe("runAction", () => {
  it("butler: writes the intent then navigates without reload", async () => {
    const f = fakes();
    await runAction(f.el, base, "camera", f.env);
    expect(JSON.parse(f.store.get(INTENT_KEY)!).kind).toBe("camera");
    expect(f.calls).toEqual(["push:/local_backend_butler", "location-changed"]);
    expect(f.el.dispatchEvent).not.toHaveBeenCalled();
  });
  it("butler: still navigates when storage is unavailable", async () => {
    const f = fakes();
    f.env.storage = undefined;
    await runAction(f.el, base, "field", f.env);
    expect(f.calls).toEqual(["push:/local_backend_butler", "location-changed"]);
  });
  it("none does nothing", async () => {
    const f = fakes();
    await runAction(f.el, { ...base, tap_action: { action: "none" } }, "field", f.env);
    expect(f.calls).toEqual([]);
    expect(f.el.dispatchEvent).not.toHaveBeenCalled();
  });
  it("other actions fire hass-action", async () => {
    const f = fakes();
    await runAction(f.el, { ...base, tap_action: { action: "navigate", navigation_path: "/p" } }, "field", f.env);
    expect(f.events[0]).toEqual({
      type: "hass-action",
      init: {
        bubbles: true,
        composed: true,
        detail: { config: { tap_action: { action: "navigate", navigation_path: "/p" } }, action: "tap" },
      },
    });
    expect(f.el.dispatchEvent).toHaveBeenCalledTimes(1);
    expect(f.store.size).toBe(0);
  });
  it("assist resolves the agent's pipeline", async () => {
    const f = fakes();
    const callWS = vi
      .fn()
      .mockResolvedValue({ pipelines: [{ id: "p9", conversation_engine: "conversation.x" }], preferred_pipeline: "p1" });
    f.el.hass = { states: {}, callWS };
    await runAction(f.el, { ...base, conversation_agent: "conversation.x" }, "mic", f.env);
    expect(callWS).toHaveBeenCalledWith({ type: "assist_pipeline/pipeline/list" });
    expect(f.events[0].init.detail.config.tap_action).toEqual({ action: "assist", start_listening: true, pipeline_id: "p9" });
  });
  it("assist falls back to HA's default when the lookup fails", async () => {
    const f = fakes();
    f.el.hass = { states: {}, callWS: vi.fn().mockRejectedValue(new Error("no")) };
    await runAction(f.el, { ...base, conversation_agent: "conversation.x" }, "voice", f.env);
    expect(f.events[0].init.detail.config.tap_action).toEqual({ action: "assist", start_listening: true });
  });
});

describe("findPanelPath", () => {
  it("finds Butler's panel whatever its slug, preferring a repository install over a local copy", async () => {
    const { findPanelPath } = await import("../../card/actions");
    expect(findPanelPath({ lovelace: {}, "e0a0a4ab_backend_butler": {} })).toBe("/e0a0a4ab_backend_butler");
    expect(findPanelPath({ local_backend_butler: {}, "0123abcd_backend_butler": {} })).toBe("/0123abcd_backend_butler");
    expect(findPanelPath({ local_backend_butler: {} })).toBe("/local_backend_butler");
    expect(findPanelPath({ map: {}, "x_backend_butler_other": {} })).toBe("/e0a0a4ab_backend_butler");
    expect(findPanelPath(undefined)).toBe("/e0a0a4ab_backend_butler");
  });
});
