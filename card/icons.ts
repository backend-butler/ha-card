import { html, svg, type TemplateResult } from "lit";
import type { TargetId } from "./config";

// 24px grid, stroke 1.75, round caps/joins, currentColor: one family so the buttons read as a set.
const icon = (body: TemplateResult) =>
  html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const camera = () =>
  icon(svg`<path d="M3.5 9A2.5 2.5 0 0 1 6 6.5h.9a1 1 0 0 0 .83-.45l.74-1.1a1 1 0 0 1 .83-.45h3.4a1 1 0 0 1 .83.45l.74 1.1a1 1 0 0 0 .83.45H18A2.5 2.5 0 0 1 20.5 9v8.5A2.5 2.5 0 0 1 18 20H6a2.5 2.5 0 0 1-2.5-2.5Z"/><circle cx="12" cy="13" r="3.5"/>`);

/** Photo frame with a mountain and a sun. */
export const image = () =>
  icon(svg`<rect x="3.5" y="4.5" width="17" height="15" rx="3.5"/><circle cx="9" cy="9.5" r="1.5"/><path d="M4 17l4.5-4.3a1.5 1.5 0 0 1 2.1 0L15 17"/><path d="M13.5 15.5l1.4-1.3a1.5 1.5 0 0 1 2.1 0L20 17"/>`);

export const microphone = () =>
  icon(svg`<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5V21"/>`);

/** Five vertical bars of varied height, like the reference voice button. */
export const waveform = () => icon(svg`<path d="M4 10v4M8 6.5v11M12 3.5v17M16 7.5v9M20 10.5v3"/>`);

/** Square with a pencil. */
export const compose = () =>
  icon(svg`<path d="M11 4.5H7A3.5 3.5 0 0 0 3.5 8v9A3.5 3.5 0 0 0 7 20.5h9a3.5 3.5 0 0 0 3.5-3.5v-4"/><path d="M19.2 3.8a1.9 1.9 0 0 1 2.7 2.7l-9.4 9.4-4 .6.6-4Z"/>`);

const BUILT_IN: Partial<Record<TargetId, () => TemplateResult>> = {
  camera,
  image,
  mic: microphone,
  voice: waveform,
  compose,
};

/** `mdi:*` icons render through HA's own <ha-icon>; anything else falls back to the built-in stroke icon. */
export function iconFor(id: TargetId, custom?: string): TemplateResult {
  if (custom && custom.startsWith("mdi:")) return html`<ha-icon .icon=${custom}></ha-icon>`;
  return (BUILT_IN[id] ?? waveform)();
}

// Butler's mark (from web/Logo.tsx). The jacket takes currentColor so it reads on a dark pill; the bow tie is brand
// orange and is never recoloured.
const JACKET = [
  "M749.942 220.58C814.037 285.517 847.277 360.473 851.65 451.672C852.85 524.818 836.905 584.683 798.107 646.903C816.745 698.038 833.92 751.768 852.025 803.36C832.712 798.988 810.362 795.163 790.682 791.323L665.695 766.828C618.287 788.975 576.242 801.478 523.285 802.985C431.761 806.18 342.835 772.213 276.748 708.808C212.578 647.36 175.077 563.188 172.307 474.386C169.745 398.835 192.519 324.596 237.006 263.479C249.022 247.018 259.48 235.645 273.417 220.948C275.84 223.88 287.478 251.398 290.068 257.307L327.609 342.739L511.99 761.698C522.782 738.763 533.552 712.828 543.812 689.45L602.95 555.05L749.942 220.58Z",
  "M506.905 434.37C518.26 431.575 529.727 438.541 532.48 449.908C535.232 461.274 528.22 472.712 516.842 475.418C505.525 478.11 494.162 471.146 491.429 459.841C488.694 448.537 495.617 437.15 506.905 434.37Z",
  "M508.16 521.797C519.575 519.712 530.54 527.219 532.708 538.627C534.883 550.027 527.443 561.044 516.058 563.294C504.56 565.574 493.403 558.044 491.209 546.524C489.016 535.004 496.625 523.905 508.16 521.797Z",
  "M510.202 609.23C521.82 608.255 532.027 616.872 533.032 628.482C534.03 640.092 525.442 650.322 513.832 651.35C502.185 652.377 491.916 643.76 490.912 632.112C489.908 620.465 498.555 610.212 510.202 609.23Z",
];
const TIE =
  "M408.633 220.664C428.508 230.775 451.307 246.223 471.295 256.877C480.312 261.412 489.669 269.054 499.455 271.644C522.885 277.845 539.438 264.565 558.323 253.605L615.293 220.648C615.3 234.676 616.403 354.8 614.7 357.238L612.885 356.602C580.988 340.038 548.385 316.924 515.58 301.693C513.09 300.538 505.845 302.407 503.43 303.694C471.585 320.639 440.174 340.756 408.582 357.973L408.633 220.664Z";

export const logoMark = () =>
  html`<svg class="logo" viewBox="160 162 704 704" aria-hidden="true" focusable="false">${JACKET.map(
    (d) => svg`<path d=${d} fill="currentColor" />`,
  )}<path d=${TIE} fill="#FC6B02" /></svg>`;
