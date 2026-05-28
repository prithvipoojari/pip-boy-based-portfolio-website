# PIP-BOY 3000 // PERSONAL TERMINAL

A retro-futuristic portfolio site themed after the Fallout Pip-Boy 3000, with
a working Linux-style terminal. No build step, no framework, no npm install.
Pure HTML/CSS/JS.

```
pip-boy-portfolio/
├── index.html       ← page structure (rarely touched)
├── styles.css       ← all CRT/Pip-Boy styling
├── data.js          ← YOUR content — edit this most
├── app.js           ← boot, rendering, terminal logic
├── README.md        ← you are here
└── .gitignore
```

---

## ➊ Quick start

Just open `index.html` in your browser. That's it. Everything works locally.

If your browser complains about loading local files (rare these days), spin
up a one-line dev server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

or with Node:

```bash
npx serve .
```

---

## ➋ Customizing your info

**Edit `data.js`.** That's the only file you need to touch for normal updates.

It exports a single `USER_DATA` object with these sections:

| Field        | Shows up in              | Notes                                   |
|--------------|--------------------------|-----------------------------------------|
| `name`       | STATUS pane, terminal    | Your name                               |
| `role`       | STATUS pane              | Job title                               |
| `level`      | STATUS pane              | Years of experience (or any number)     |
| `bio`        | STATUS pane              | Short bio paragraph                     |
| `special`    | STATUS pane              | 7 S.P.E.C.I.A.L. stats (values 1–10)    |
| `inventory`  | INV pane                 | Skills grouped by category              |
| `projects`   | DATA pane                | Your projects as "quests"               |
| `timeline`   | MAP pane                 | Career / education history              |
| `radio`      | RADIO pane               | Contact links (email, GitHub, etc.)     |
| `caps`       | Bottom status bar        | Just flavor — any number                |

Save the file. Refresh the browser. Done.

---

## ➌ Common tweaks

### Change the default theme

In `app.js`, find Section 8 (INIT) and add a line before `renderAll()`:

```javascript
document.body.classList.add("theme-amber");  // or theme-blue, theme-white
```

Or just let visitors switch themes themselves via the terminal: `theme amber`.

### Add a new theme color

In `styles.css`, copy one of the `body.theme-*` blocks at the top and rename it:

```css
body.theme-red {
  --bg: #0a0303;
  --fg: #ff6b6b;
  --fg-bright: #ffb0b0;
  /* ... etc ... */
}
```

Then in `app.js`, find the `theme` command and add the name to `valid`:

```javascript
const valid = ["green", "amber", "blue", "white", "red"];
```

### Add a new terminal command

In `app.js` Section 6, add a key to the `COMMANDS` object:

```javascript
const COMMANDS = {
  // ...existing commands...
  
  resume: () => {
    window.open("https://example.com/my-resume.pdf", "_blank");
    termPrint("opening resume in a new tab...", "echo");
  },
};
```

The command name is the key, the function is what runs. Use `termPrint(text)`
to write output. Add a row to `help` so people know it exists.

### Add a new tab

Three small edits:

1. **`index.html`** — add a new `<div class="tab">` in the `<nav class="tabs">`,
   and a new `<div class="pane">` block in `.panes`.
2. **`app.js`** — add the new tab name to the `tabOrder` array.
3. **`app.js`** — add a `renderMyNewTab()` function and call it from `renderAll()`.

### Skip the boot sequence entirely

In `app.js` Section 8, replace `renderBoot()` with `finishBoot()`. The app
will appear instantly.

### Change boot text

Edit the `bootLines` array at the top of `app.js`.

---

## ➍ Deploying

This is a static site. Any static host works. Pick one:

### Netlify (easiest, 30 seconds)
1. Go to <https://app.netlify.com/drop>
2. Drag the whole `pip-boy-portfolio` folder onto the page.
3. Done. You get a URL like `lovely-vault-dweller.netlify.app`.
4. (Optional) Settings → Domain → change subdomain or add custom domain.

### GitHub Pages (best if you'll use Git anyway)
1. Create a new repo, push these files to the `main` branch.
2. Repo Settings → Pages → Source: `main` branch, `/` (root).
3. Your site appears at `<yourname>.github.io/<reponame>`.

### Vercel
```bash
npm i -g vercel
vercel              # follow prompts
```

### Cloudflare Pages
Connect the repo at <https://pages.cloudflare.com> or drag-and-drop the folder.

### Custom domain
Buy a domain (Namecheap, Porkbun, Cloudflare ~$10/yr), then in your host's
dashboard add a DNS record pointing to them. All four hosts above handle HTTPS
automatically.

---

## ➎ Keyboard shortcuts (for users of the site)

- `1`–`5`   switch tabs (STATUS / INV / DATA / MAP / RADIO)
- `/`       focus the terminal
- `ESC`     skip the boot sequence
- `↑` `↓`   command history in the terminal
- `Tab`     autocomplete a command
- type `help` in the terminal for the full command list

---

## ➏ License / credit

The visual concept is inspired by Bethesda's Fallout series (Pip-Boy 3000 is
their property — it's fan-art aesthetic, not affiliated with or endorsed by
them). The code is yours to do whatever you want with.
