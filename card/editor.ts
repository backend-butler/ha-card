/** HA's schema-driven visual editor (`static getConfigForm`). */
export interface ConfigForm {
  schema: unknown[];
  computeLabel?: (s: { name: string }) => string | undefined;
  computeHelper?: (s: { name: string }) => string | undefined;
}

const LABELS: Record<string, string> = {
  layout: "Layout",
  title: "Title",
  show_logo: "Show logo",
  tap_action: "Tap action (pill)",
  advanced: "Advanced",
  logo_url: "Logo URL",
  panel_path: "Butler panel path",
  theme: "Theme",
  conversation_agent: "Conversation agent",
};

const HELPERS: Record<string, string> = {
  tap_action: "Default: opens Butler with the box focused. Per-button actions are YAML-only (actions: list).",
  logo_url: "Replaces the Butler mark. Leave empty for the default.",
  panel_path: "Leave empty: the card finds Butler's panel itself",
  theme: "Dark widget matches the iOS widgets; Follow HA theme uses your dashboard colors.",
  conversation_agent:
    "Mic and voice buttons run HA Assist with this agent instead of Butler. Per-button actions are YAML-only (actions: list).",
};

export function configForm(): ConfigForm {
  return {
    schema: [
      {
        name: "layout",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "chatgpt", label: "ChatGPT style (wide)" },
              { value: "grok", label: "Grok style (square)" },
            ],
          },
        },
      },
      { name: "title", selector: { text: {} } },
      { name: "show_logo", selector: { boolean: {} } },
      { name: "tap_action", selector: { ui_action: {} } },
      {
        type: "expandable",
        name: "advanced",
        title: "Advanced",
        schema: [
          { name: "logo_url", selector: { text: {} } },
          { name: "panel_path", selector: { text: {} } },
          {
            name: "theme",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "dark", label: "Dark widget" },
                  { value: "auto", label: "Follow HA theme" },
                ],
              },
            },
          },
          { name: "conversation_agent", selector: { conversation_agent: {} } },
        ],
      },
    ],
    computeLabel: (s) => LABELS[s.name],
    computeHelper: (s) => HELPERS[s.name],
  };
}
