import type { IntentKind } from "../shared/intent";

/** Wave 0 contract (Phase 8). Owner of the implementation: Task 28. */
export type Layout = "chatgpt" | "grok";
export type ThemeMode = "dark" | "auto";

/** Tap targets: the pill ("field") and the buttons. */
export type TargetId = "field" | "camera" | "image" | "mic" | "voice" | "compose";

/** HA's standard action objects, plus `butler` = write an intent and open the panel. */
export type ActionConfig =
  | { action: "butler"; intent?: IntentKind }
  | { action: "navigate"; navigation_path: string }
  | { action: "url"; url_path: string }
  | { action: "perform-action"; perform_action: string; data?: Record<string, unknown>; target?: Record<string, unknown> }
  | { action: "assist"; pipeline_id?: string; start_listening?: boolean }
  | { action: "more-info"; entity?: string }
  | { action: "none" };

export interface ButtonConfig {
  id: TargetId;
  /** `mdi:*` (rendered with ha-icon) or omitted for the built-in stroke icon for `id`. */
  icon?: string;
  label?: string;
  tap_action?: ActionConfig;
}

/** What users write in YAML or the editor. */
export interface CardConfig {
  type: string;
  title?: string;
  layout?: Layout;
  show_logo?: boolean;
  logo_url?: string;
  /** Path of the Butler panel; legacy `ingress_path` is accepted as an alias. */
  panel_path?: string;
  ingress_path?: string;
  /** Shorthand: buttons with no tap_action run HA Assist with this agent's pipeline instead of Butler. */
  conversation_agent?: string;
  theme?: ThemeMode;
  /** Tap action for the pill. */
  tap_action?: ActionConfig;
  actions?: ButtonConfig[];
}

/** After normalizeConfig: every field present, buttons resolved for the layout. */
export interface NormalizedConfig {
  title: string;
  layout: Layout;
  show_logo: boolean;
  logo_url: string | null;
  panel_path: string | null;
  conversation_agent: string | null;
  theme: ThemeMode;
  tap_action: ActionConfig | null;
  buttons: ButtonConfig[];
}

/**
 * Where the panel is when it cannot be found in `hass.panels`: the path an install from the public repository gets
 * (Supervisor prefixes the slug with the first 8 hex digits of the SHA-1 of the repository URL).
 */
export const DEFAULT_PANEL_PATH = "/e0a0a4ab_backend_butler";
export const DEFAULT_TITLE = "Ask Butler";
export const MAX_BUTTONS = 4;
/** Default buttons per layout, in order. */
export const DEFAULT_BUTTONS: Record<Layout, TargetId[]> = {
  chatgpt: ["camera", "image", "mic", "voice"],
  grok: ["compose", "voice"],
};
/** Which Butler intent each target opens when it has no tap_action. */
export const DEFAULT_INTENT: Record<TargetId, IntentKind> = {
  field: "field",
  camera: "camera",
  image: "photo",
  mic: "mic",
  voice: "voice",
  compose: "new",
};

const LAYOUTS: readonly string[] = ["chatgpt", "grok"];
const THEMES: readonly string[] = ["dark", "auto"];
const TARGET_IDS: readonly string[] = ["field", "camera", "image", "mic", "voice", "compose"];

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function optString(v: unknown, name: string): string | null {
  if (v === undefined || v === null) return null;
  if (typeof v !== "string") throw new Error(`${name} must be a string`);
  return v.trim() === "" ? null : v;
}

function isAction(v: unknown): v is ActionConfig {
  return isRecord(v) && typeof v.action === "string";
}

function normalizeButton(raw: unknown, index: number): ButtonConfig {
  if (!isRecord(raw)) throw new Error(`actions[${index}] must be an object with an id`);
  const id = raw.id;
  if (typeof id !== "string" || !TARGET_IDS.includes(id)) {
    throw new Error(`actions[${index}].id must be one of ${TARGET_IDS.join(", ")}`);
  }
  // Pick known keys only: unknown keys are ignored rather than carried into the render.
  const button: ButtonConfig = { id: id as TargetId };
  const icon = optString(raw.icon, `actions[${index}].icon`);
  const label = optString(raw.label, `actions[${index}].label`);
  if (icon) button.icon = icon;
  if (label) button.label = label;
  if (raw.tap_action !== undefined) {
    if (!isAction(raw.tap_action)) throw new Error(`actions[${index}].tap_action must be an action object`);
    button.tap_action = raw.tap_action;
  }
  return button;
}

/** Throws Error with a user-facing message on invalid config (HA shows it in the card). */
export function normalizeConfig(config: CardConfig): NormalizedConfig {
  if (!isRecord(config)) throw new Error("Invalid configuration");
  const c: Record<string, unknown> = config;

  const layout = c.layout ?? "chatgpt";
  if (typeof layout !== "string" || !LAYOUTS.includes(layout)) throw new Error("layout must be chatgpt or grok");
  const theme = c.theme ?? "dark";
  if (typeof theme !== "string" || !THEMES.includes(theme)) throw new Error("theme must be dark or auto");

  const agent = optString(c.conversation_agent, "conversation_agent");
  if (agent !== null && !agent.startsWith("conversation.")) {
    throw new Error('conversation_agent must start with "conversation."');
  }
  if (c.show_logo !== undefined && typeof c.show_logo !== "boolean") throw new Error("show_logo must be true or false");
  if (c.tap_action !== undefined && !isAction(c.tap_action)) throw new Error("tap_action must be an action object");

  let buttons: ButtonConfig[];
  if (c.actions === undefined || c.actions === null) {
    buttons = DEFAULT_BUTTONS[layout as Layout].map((id) => ({ id }));
  } else {
    if (!Array.isArray(c.actions)) throw new Error("actions must be a list");
    if (c.actions.length > MAX_BUTTONS) throw new Error(`actions can have at most ${MAX_BUTTONS} buttons`);
    buttons = c.actions.map(normalizeButton);
  }

  return {
    title: optString(c.title, "title") ?? DEFAULT_TITLE,
    layout: layout as Layout,
    show_logo: c.show_logo ?? true,
    logo_url: optString(c.logo_url, "logo_url"),
    // ingress_path is the legacy name for panel_path.
    // null = find Butler's panel at tap time (its slug depends on how the app was installed).
    panel_path: optString(c.panel_path, "panel_path") ?? optString(c.ingress_path, "ingress_path") ?? null,
    conversation_agent: agent,
    theme: theme as ThemeMode,
    tap_action: c.tap_action ?? null,
    buttons,
  };
}
