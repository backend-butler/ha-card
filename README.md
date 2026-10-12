# Butler quick card

A dashboard launcher for [Backend Butler](https://github.com/backend-butler/ha-addon), the Claude agent app for Home Assistant, modelled on the ChatGPT and Grok home screen widgets. It never chats itself: a tap opens Butler, ready to type, take a photo, or talk.

**Needs the Backend Butler app.** The card finds Butler's sidebar panel on its own.

## Install

With [HACS](https://hacs.xyz): **HACS → ⋮ → Custom repositories**, add `https://github.com/backend-butler/ha-card` as type **Dashboard**, download **Butler quick card**, and reload the browser.

By hand: copy `butler-quick-card.js` from the [latest release](https://github.com/backend-butler/ha-card/releases/latest) to `/config/www/`, then add `/local/butler-quick-card.js` as a **JavaScript module** under **Settings → Dashboards → ⋮ → Resources**.

Then edit a dashboard, **Add card**, and search for **Butler quick card**.

## Layouts

**`chatgpt`** is a wide card with a pill and four round buttons: camera, photo, mic and voice.

```yaml
type: custom:butler-quick-card
layout: chatgpt
```

**`grok`** is a square card with a pill and two buttons: new chat and voice.

```yaml
type: custom:butler-quick-card
layout: grok
title: Ask Butler
```

## What the buttons do

Tapping the pill opens Butler with the message box focused. By default each button opens Butler with a single large prompt:

- **Camera** asks you to take a photo, **Photo** asks you to choose one. Browsers only allow the camera and photo picker after a tap, so Butler cannot open them for you. Tap the prompt and it starts.
- **Mic** asks you to start recording. The transcript lands in the message box so you can review it before sending.
- **Voice** works the same way, but sends the message automatically once your words are transcribed.
- **New chat** (Grok layout) opens Butler on a fresh chat.

Mic and voice need the voice pipeline set up (see **Voice pipeline** in the app's Configuration tab).

## Options

| Option | Default | What it does |
|---|---|---|
| `layout` | `chatgpt` | `chatgpt` or `grok` |
| `title` | `Ask Butler` | The text in the pill |
| `show_logo` / `logo_url` | logo shown | Hide the logo, or use your own image |
| `panel_path` | found automatically | Where Butler's sidebar panel lives. Only set it if you renamed or forked the app |
| `theme` | `dark` | `dark`, or `auto` to follow your Home Assistant theme |
| `tap_action` | open Butler | Action for the pill |
| `conversation_agent` | none | Send buttons to Home Assistant Assist instead of Butler |
| `actions` | the layout's buttons | Choose and customise the buttons (up to 4) |

The visual editor covers everything except the actions of individual buttons. Those are set in YAML.

## Changing what a button does

Each button accepts a standard Home Assistant `tap_action`. Use `action: butler` (with an optional `intent`) for the default behaviour.

```yaml
type: custom:butler-quick-card
layout: chatgpt
theme: auto
actions:
  - id: camera
  - id: image
  - id: mic
    tap_action:
      action: navigate
      navigation_path: /lovelace/rooms
  - id: voice
    tap_action:
      action: perform-action
      perform_action: script.turn_on
      target:
        entity_id: script.goodnight
```

To start Home Assistant Assist from a button, use the `assist` action:

```yaml
type: custom:butler-quick-card
layout: grok
actions:
  - id: compose
  - id: voice
    tap_action:
      action: assist
      start_listening: true
```

`conversation_agent` is a shorthand for that: every button without its own `tap_action` runs Assist with that agent's pipeline.

```yaml
type: custom:butler-quick-card
conversation_agent: conversation.home_assistant
```

## Development

```sh
npm ci --ignore-scripts
npm run typecheck && npm test
npm run build   # → dist/butler-quick-card.js
```

## License

[MIT](LICENSE)
