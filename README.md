# DrishtiX — SIH Frontend

Frontend workstation for the DrishtiX cadastral parcel validation demo.

## Run in VS Code

1. Open this folder in VS Code.
2. Install **Live Server** (Ritwick Dey).
3. Open `index.html`.
4. Right-click `index.html` → **Open with Live Server**.

The browser should open a local URL similar to `http://127.0.0.1:5500/`.

### Recommended VS Code extensions

- **Live Server** — easiest local run.
- **Prettier - Code formatter** — optional.
- **ESLint** — optional when the team expands the JavaScript.

No Node.js or Python setup is required for the current frontend.

## Folder structure

```text
DrishtiX-SIH-Frontend/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   └── images/
├── .gitignore
└── TEAM-INTEGRATION.md
```

## Included functionality

- Dashboard and KPI counters
- Parcel queue
- Leaflet map
- Satellite/street basemap switching
- AI / cadastral / human-edited layers
- Geometry edit mode
- Add/delete vertex interaction
- Turf-based area/perimeter calculation
- Technical QA checks
- Cadastral reference comparison
- Three-way comparison
- Manual inspection workflow
- Approve / reject / deny workflow
- Field-device receive simulation
- Review-package transmit simulation
- Audit trail
- Responsive UI polish

## Integration points

The values in `js/app.js` are **frontend demo data**. The main integration points are:

- `parcelsData` — replace/hydrate from backend parcel records.
- `simulateIncomingParcel()` — connect to the field-phone receive API/event.
- `startTransmit()` / `sendCurrentPackage()` — connect to the result-upload API.
- `loadParcelLayers()` — render real GeoJSON/geometry.
- `performValidation()` — keep as frontend presentation until the production validation service is connected.

The UI disclaimer should remain: this workstation is a validation/review aid and does not itself establish legal ownership or final legal boundaries.

## Git

```bash
git init
git add .
git commit -m "Build DrishtiX SIH frontend workstation"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO>.git
git push -u origin main
```

Then send the GitHub repository URL to the team.

## Team workflow

Prefer branches for parallel work:

```text
main
├── integration/backend
├── integration/field-phone
├── integration/ai
└── feature/<change-name>
```

Use pull requests into `main` so integration changes can be reviewed.

## External libraries

The UI loads these from CDNs: Tailwind CSS, Leaflet 1.9.4, Turf.js 6, and Lucide icons. The first browser load therefore needs internet access.
