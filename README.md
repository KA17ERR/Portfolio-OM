# Om Aletiwär — Portfolio

A responsive, static portfolio built with semantic HTML, CSS, and vanilla JavaScript. It has no build step or package dependencies.

## Run locally

Open `index.html` in a browser, or start a local static server from this folder:

```powershell
py -m http.server 8000
```

Then visit `http://localhost:8000`.

## Update projects

Add or edit entries in `projects.js`. Each entry generates its own long-form case study and supports:

- `id`, `title`, `description`, `image`, `imageAlt`
- `technologies`, `githubUrl`, `liveUrl`, `youtubeUrl`, `featured`
- Optional presentation fields: `category`, `imageKind`, `imageNote`, `visual`

Leave `liveUrl` and `youtubeUrl` empty until you have a verified destination. When a YouTube URL is added, the preview becomes a clickable video thumbnail and a touch-friendly Watch on YouTube link appears. A source link appears when `githubUrl` is present. Project imagery opens its verified live site when configured, otherwise its source repository.

The profile's three public repositories are AgentGuard, FitCraft-RPG, and SolarSmart. ReServe is retained from Om's earlier request. Repository brand marks and project imagery are labelled; screenshots are not claimed where the repositories do not publish them. The portrait is the `om.jpeg` team image in AgentGuard's public repository, optimized locally as `assets/om.webp` without face edits. Email, phone, Instagram, GitHub, and LinkedIn links are the destinations Om supplied.
