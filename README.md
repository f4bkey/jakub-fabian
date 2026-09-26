# Portfolio website

Single-page site: About me, Past projects, Contact. Plain HTML/CSS/JS — no build step.

## Run locally
Double-click `index.html` to open it in your browser.

## Edit content
- **Page text (English + Slovak)** → `i18n.js`. Each key matches a `data-i18n` attribute in `index.html`; the EN/SK switch in the header swaps between them and remembers the visitor's choice.
- **Skill tags, social links** → `index.html` (look for `EDIT:` comments)
- **Projects** → the `PROJECTS` list at the top of `script.js` (descriptions and tags have `en` and `sk` versions)
- **Contact email** → `CONTACT_EMAIL` in `script.js` and the `mailto:` link in `index.html`
- **Project images** → put files in `images/` and set `image: "images/my-shot.jpg"`
- **Colors** → CSS variables at the top of `styles.css` (light + dark mode)

## Deploy
Drag the folder into Netlify Drop, or push to GitHub and enable GitHub Pages / Vercel.
