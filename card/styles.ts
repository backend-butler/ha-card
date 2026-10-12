import { css } from "lit";

// Every colour lives in the token blocks at the top. Everything below uses var(--bqc-*) only, so a theme (or
// card-mod) can restyle the widget by overriding the tokens.
export const cardStyles = css`
  /* ChatGPT widget, dark: bar and buttons are lighter than the card. */
  :host {
    --bqc-card: #161616;
    --bqc-fill: #3a3a3c;
    --bqc-fill-active: #4b4b4e;
    --bqc-icon: #ffffff;
    --bqc-text: #ffffff;
    --bqc-placeholder: rgba(255, 255, 255, 0.55);
    --bqc-rim: rgba(255, 255, 255, 0.07);
    --bqc-pill-rim: transparent;
    --bqc-focus: #0a84ff;
    --bqc-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  }
  /* Grok widget, dark: bar and buttons are slightly darker than the card, with a faint inner edge. */
  :host([layout="grok"]) {
    --bqc-card: #2a2a2a;
    --bqc-fill: #232323;
    --bqc-fill-active: #323232;
    --bqc-pill-rim: rgba(255, 255, 255, 0.08);
  }
  /* theme: auto follows the HA theme (a light theme gives a light widget). Last, so it wins over both layouts. */
  :host([theme="auto"]) {
    --bqc-card: var(--ha-card-background, var(--card-background-color));
    --bqc-fill: var(--secondary-background-color);
    --bqc-fill-active: color-mix(in srgb, var(--secondary-background-color), var(--primary-text-color) 10%);
    --bqc-icon: var(--primary-text-color);
    --bqc-text: var(--primary-text-color);
    --bqc-placeholder: var(--secondary-text-color);
    --bqc-rim: var(--divider-color);
    --bqc-pill-rim: transparent;
    --bqc-focus: var(--primary-color);
    --bqc-shadow: var(--ha-card-box-shadow, none);
  }

  :host {
    display: block;
    /* Geometry scales with the card's own width (160px phone column to 600px desktop), not the viewport. */
    container-type: inline-size;
    font-family: var(--ha-font-family-body, -apple-system, system-ui, sans-serif);
  }

  ha-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--gap);
    box-sizing: border-box;
    padding: var(--pad);
    overflow: hidden;
    background: var(--bqc-card);
    color: var(--bqc-text);
    border: none;
    border-radius: var(--radius);
    box-shadow: var(--bqc-shadow), inset 0 0 0 1px var(--bqc-rim);
  }

  /* ChatGPT: about 2:1, pill on top, four circles under it. */
  ha-card.chatgpt {
    --pad: 4.5cqw;
    --gap: 4.5cqw;
    --radius: 14cqw;
    --pill-h: max(44px, 17cqw);
    --btn: max(44px, 17cqw);
    --logo: calc(var(--pill-h) * 0.56);
    --fs: calc(var(--pill-h) * 0.33);
  }
  /* Grok: square, pill about 45% of the height, two circles. */
  ha-card.grok {
    --pad: 6cqw;
    --gap: 6cqw;
    --radius: 16cqw;
    --pill-h: 45cqw;
    --btn: max(44px, 32cqw);
    --logo: calc(var(--pill-h) * 0.4);
    --fs: calc(var(--pill-h) * 0.19);
    aspect-ratio: 1 / 1;
  }

  button {
    appearance: none;
    margin: 0;
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    cursor: pointer;
    background: var(--bqc-fill);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition:
      transform 120ms ease,
      background-color 120ms ease;
  }
  button:active {
    transform: scale(0.96);
    background: var(--bqc-fill-active);
  }
  button:focus-visible {
    outline: 2px solid var(--bqc-focus);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
    button:active {
      transform: none;
    }
  }

  .field {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: var(--pill-h);
    min-width: 0;
    padding: 0 calc(var(--pill-h) * 0.3);
    gap: calc(var(--pill-h) * 0.22);
    border-radius: 999px;
    box-shadow: inset 0 0 0 1px var(--bqc-pill-rim);
    text-align: left;
    color: var(--bqc-placeholder);
    font-size: var(--fs);
    line-height: 1.2;
  }
  .grok .field {
    justify-content: center;
    padding: 0 var(--pad);
    gap: calc(var(--pill-h) * 0.08);
    color: var(--bqc-text);
    font-weight: 600;
  }
  .label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .logo,
  .logo-img {
    flex: none;
    width: var(--logo);
    height: var(--logo);
    color: var(--bqc-icon);
  }
  .logo-img {
    object-fit: contain;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--gap);
  }
  .btn {
    flex: none;
    display: grid;
    place-items: center;
    width: var(--btn);
    height: var(--btn);
    border-radius: 50%;
    color: var(--bqc-icon);
    --mdc-icon-size: calc(var(--btn) * 0.46);
  }
  .btn svg {
    width: calc(var(--btn) * 0.46);
    height: calc(var(--btn) * 0.46);
  }

  .error {
    padding: 16px;
    color: var(--bqc-text);
    font-size: 14px;
    line-height: 1.4;
  }
`;
