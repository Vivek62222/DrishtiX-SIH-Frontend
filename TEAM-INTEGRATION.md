# Team Integration Notes

## Stable frontend files

- `index.html` — page structure
- `css/style.css` — styling and responsive overrides
- `js/app.js` — state, map, validation and workflow logic

## Integration targets

`parcelsData` in `js/app.js` is the current demo-state store.

`simulateIncomingParcel()` should later consume the real field-device payload.

`startTransmit()` / `sendCurrentPackage()` should later post the reviewer result to the field/mobile endpoint.

`loadParcelLayers()` should later render real GeoJSON/geometry from the backend.

`performValidation()` is a frontend demonstration of technical QA scoring; use the team's production validation service for authoritative validation.

## Git safety

Do not commit API keys, passwords, database credentials, private service URLs, or device secrets.
