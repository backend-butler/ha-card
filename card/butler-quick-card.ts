import { LitElement, html, nothing, type TemplateResult } from "lit";
import { runAction } from "./actions";
import {
  DEFAULT_TITLE,
  normalizeConfig,
  type ButtonConfig,
  type CardConfig,
  type Layout,
  type NormalizedConfig,
  type TargetId,
} from "./config";
import { configForm } from "./editor";
import { iconFor, logoMark } from "./icons";
import { cardStyles } from "./styles";

const ARIA_LABEL: Record<TargetId, string> = {
  field: "Ask Butler",
  camera: "Take photo",
  image: "Choose photo",
  mic: "Dictate",
  voice: "Voice",
  compose: "New chat",
};

/** Default grid size per layout for sections dashboards (12 columns wide). */
const GRID: Record<Layout, { columns: number; rows: number; min_columns: number; min_rows: number }> = {
  chatgpt: { columns: 12, rows: 2, min_columns: 6, min_rows: 2 },
  grok: { columns: 6, rows: 3, min_columns: 3, min_rows: 3 },
};

export class ButlerQuickCard extends LitElement {
  static properties = { _config: { state: true } };
  static styles = cardStyles;
  declare _config: NormalizedConfig | undefined;
  hass: unknown;

  setConfig(config: CardConfig) {
    const normalized = normalizeConfig(config);
    // Host attributes drive the token blocks in styles.ts (layout and theme colours).
    this.setAttribute("layout", normalized.layout);
    this.setAttribute("theme", normalized.theme);
    this._config = normalized;
  }
  getCardSize() {
    return this._config?.layout === "grok" ? 3 : 2;
  }
  getGridOptions() {
    return GRID[this._config?.layout ?? "chatgpt"];
  }
  static getConfigForm() {
    return configForm();
  }
  static getStubConfig(): CardConfig {
    return { type: "custom:butler-quick-card", title: DEFAULT_TITLE, layout: "chatgpt" };
  }

  private _logo(c: NormalizedConfig): TemplateResult | typeof nothing {
    if (!c.show_logo) return nothing;
    return c.logo_url ? html`<img class="logo-img" src=${c.logo_url} alt="" />` : logoMark();
  }

  private _button(c: NormalizedConfig, b: ButtonConfig) {
    return html`<button
      class="btn"
      type="button"
      aria-label=${b.label ?? ARIA_LABEL[b.id]}
      @click=${() => void runAction(this, c, b.id)}
    >
      ${iconFor(b.id, b.icon)}
    </button>`;
  }

  render() {
    const c = this._config;
    if (!c) {
      return html`<ha-card class="chatgpt"
        ><div class="error" role="alert">
          Butler quick card is not configured. Set <code>type: custom:butler-quick-card</code> in the card YAML.
        </div></ha-card
      >`;
    }
    // Grok's pill reads "Butler" next to the logo; the "Ask Butler" placeholder is only for the ChatGPT pill
    // unless the user chose a title.
    const label = c.layout === "grok" && c.title === DEFAULT_TITLE ? "Butler" : c.title;
    return html`<ha-card class=${c.layout}>
      <button class="field" type="button" aria-label=${c.title} @click=${() => void runAction(this, c, "field")}>
        ${this._logo(c)}<span class="label">${label}</span>
      </button>
      <div class="row">${c.buttons.map((b) => this._button(c, b))}</div>
    </ha-card>`;
  }
}

if (!customElements.get("butler-quick-card")) customElements.define("butler-quick-card", ButlerQuickCard);
const w = window as unknown as { customCards?: unknown[] };
w.customCards = w.customCards ?? [];
w.customCards.push({
  type: "butler-quick-card",
  name: "Butler quick card",
  description: "A ChatGPT/Grok-style launcher for Backend Butler.",
  preview: true,
});
