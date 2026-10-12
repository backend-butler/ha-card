import { writeIntent } from "../shared/intent";
import { DEFAULT_INTENT, DEFAULT_PANEL_PATH, type ActionConfig, type NormalizedConfig, type TargetId } from "./config";

/** Minimal slice of HA's `hass` object the card uses. */
export interface Hass {
  states: Record<string, unknown>;
  panels?: Record<string, unknown>;
  callWS?: <T>(msg: Record<string, unknown>) => Promise<T>;
}

/**
 * Butler's sidebar panel: its url_path is the app slug, `local_backend_butler` for a local install and
 * `<repo hash>_backend_butler` from a repository. Prefers a repository install over a local copy.
 */
export function findPanelPath(panels: Record<string, unknown> | undefined): string {
  const keys = Object.keys(panels ?? {}).filter((k) => /^[0-9a-z]+_backend_butler$/.test(k));
  const pick = keys.find((k) => !k.startsWith("local_")) ?? keys[0];
  return pick ? `/${pick}` : DEFAULT_PANEL_PATH;
}

/** The action a tap on `target` runs: explicit tap_action → conversation_agent shorthand → Butler intent. */
export function actionFor(config: NormalizedConfig, target: TargetId): ActionConfig {
  const explicit = target === "field" ? config.tap_action : config.buttons.find((b) => b.id === target)?.tap_action;
  if (explicit) return explicit;
  // The agent is resolved to a pipeline at run time; only the voice-ish buttons make sense for Assist.
  if (config.conversation_agent && (target === "mic" || target === "voice")) {
    return { action: "assist", start_listening: true };
  }
  return { action: "butler", intent: DEFAULT_INTENT[target] };
}

interface PipelineList {
  pipelines: { id: string; conversation_engine?: string }[];
  preferred_pipeline?: string | null;
}

/** Pipeline whose conversation engine is `agent`; else HA's preferred one; else undefined (HA picks its default). */
export function pickPipelineId(list: PipelineList | undefined, agent: string): string | undefined {
  const pipelines = list?.pipelines ?? [];
  return (
    pipelines.find((p) => p.conversation_engine === agent)?.id ??
    (list?.preferred_pipeline ? list.preferred_pipeline : undefined)
  );
}

/** Seams for the browser globals, so tests need no DOM. */
export interface ActionEnv {
  storage: Pick<Storage, "getItem" | "setItem" | "removeItem"> | undefined;
  pushState: (path: string) => void;
  dispatchLocationChanged: () => void;
  makeEvent: (type: string, init: { detail: unknown; bubbles?: boolean; composed?: boolean }) => Event;
}

function browserEnv(): ActionEnv {
  return {
    get storage() {
      try {
        return window.localStorage;
      } catch {
        return undefined; // storage blocked: still navigate
      }
    },
    pushState: (path) => window.history.pushState(null, "", path),
    dispatchLocationChanged: () =>
      window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } })),
    makeEvent: (type, init) => new CustomEvent(type, init),
  };
}

function fireHassAction(el: HTMLElement, env: ActionEnv, action: ActionConfig): void {
  el.dispatchEvent(
    env.makeEvent("hass-action", { bubbles: true, composed: true, detail: { config: { tap_action: action }, action: "tap" } }),
  );
}

/** Run it: `butler` writes the intent and navigates in-app (no reload); everything else is fired as `hass-action`. */
export async function runAction(
  el: HTMLElement,
  config: NormalizedConfig,
  target: TargetId,
  env: ActionEnv = browserEnv(),
): Promise<void> {
  const action = actionFor(config, target);
  if (action.action === "none") return;

  if (action.action === "butler") {
    if (env.storage) writeIntent(env.storage, action.intent ?? DEFAULT_INTENT[target]);
    env.pushState(config.panel_path ?? findPanelPath((el as unknown as { hass?: Hass }).hass?.panels));
    env.dispatchLocationChanged();
    return;
  }

  if (action.action === "assist" && config.conversation_agent && !action.pipeline_id) {
    const hass = (el as unknown as { hass?: Hass }).hass;
    let pipelineId: string | undefined;
    try {
      const list = await hass?.callWS?.<PipelineList>({ type: "assist_pipeline/pipeline/list" });
      pipelineId = pickPipelineId(list, config.conversation_agent);
    } catch {
      // lookup failed: fall through to HA's default pipeline
    }
    fireHassAction(el, env, pipelineId ? { ...action, pipeline_id: pipelineId } : action);
    return;
  }

  fireHassAction(el, env, action);
}
