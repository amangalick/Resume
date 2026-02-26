# Ahnika Mangalick — Interactive Resume

A personal resume website built as an interactive single-page app. Live at **[amresume.web.app](https://amresume.web.app)**.

## Features

- **Story mode / Recruiter mode** — browse experience as animated cards (swipeable on mobile, arrow-key navigable on desktop) or as a flat list
- **Skill filter** — click any skill tag to highlight matching projects
- **Dark / light theme** — toggleable, persisted to localStorage, respects system preference
- **Sticky nav** — scrollspy highlights the active section
- **Copy email** button + print-friendly layout (auto-switches to list view, hides UI chrome)
- **Open to Work badge** — toggled by a single constant in the source
- Skeleton loading state while Firestore data loads

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Animations | Framer Motion |
| Database | Firebase Firestore |
| Hosting | Firebase Hosting |
| Styling | Plain CSS (no framework) |

## Project Structure

```
src/
  App.jsx        # Main component — all sections, state, and logic
  App.css        # All component styles, dark/light theme, print styles
  index.css      # Global resets and base theme variables
  firebase.js    # Firestore fetch functions
```

## Firestore Collections

| Collection | Fields |
|---|---|
| `experience` | `order`, `role`, `company`, `startDate`, `endDate`, `description[]` |
| `education` | `year`, `degree`, `field`, `school`, `startDate`, `endDate` |
| `skills` | `order`, `category`, `items[]` |
| `projects` | `order`, `name`, `description`, `tech[]`, `link` |
| `certifications` | `name`, `issuer`, `date`, `link` |

## Running Locally

```bash
npm install
npm run dev
```

## Seeding Data to Firestore

To populate your resume with data, use the seed scripts:

```bash
# Seed experience (work history with AI/development emphasis)
node seed.js

# Seed skills (LLMs, IDEs, CLIs, Coding Agents, etc.)
node seed-skills.js

# Seed education
node seed-education.js

# Seed projects (with tech stack tags)
node seed-projects.js
```

**Note:** Before running seed scripts:
1. Make sure your Firebase API key is in `.env` as `VITE_FIREBASE_API_KEY`
2. Update the data in `resume-data.json` and seed files with your actual experience
3. The skills section now prominently features AI/LLM tools, coding agents, and modern development workflows

## Deploying

```bash
npm run build
firebase deploy --only hosting:resume
```
