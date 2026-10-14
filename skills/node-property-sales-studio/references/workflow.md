# Workflow

## 1. Establish scope and preservation boundaries

Inspect the workspace, repository remotes, hosted Site identity, and existing folders. Record which site and source must remain unchanged. For a new visual direction, create a separate local directory and separate hosted Site rather than reusing the previous Site ID.

## 2. Inspect source material

Inventory references, brochures, project images, plans, logos, and existing data code. View representative images and verify their intended meaning. Extract factual property data without inventing missing facts.

For this repository, use `node-residences/data.js` as the application data contract and `node-residences/assets/ghadir/` for original project material.

## 3. Build the visual system

Translate the reference into:

- Canvas, card, text, border, and accent tokens.
- Header, navigation rail, property scene, content canvas, and mobile navigation.
- One coherent icon system.
- Desktop, tablet, and mobile breakpoints.
- Motion rules and reduced-motion behavior.

Use the NODE mark as a monochrome asset. Keep contrast sufficient in light and dark appearances.

## 4. Build data-driven application routes

Keep residence records, project gallery, floor records, people, and amenities outside the view functions. Derive collection cards, plan selections, details, comparisons, and statistics from the same data.

Every route must render directly when opened by URL. At minimum test:

`overview`, `explore`, `residences`, `favorites`, `unit/<id>`, `accounts`, `account/<id>`, `pipeline`, `viewings`, `documents`, `payments`, `messages`, `insights`, `settings`, and `help`.

## 5. Connect interaction flows

Implement and verify:

- Floor and unit selection.
- Gallery thumbnails and previous/next arrows.
- Search and filters.
- Favorite state.
- Two- or three-residence comparison.
- Account creation and editing.
- Pipeline stage changes.
- Viewing request creation and cancellation.
- Payment scenario controls.
- Browser-local conversations.
- Appearance and motion settings.
- Workspace export and restore.

Close dialogs correctly, restore focus when practical, and keep interaction state after rerenders.

## 6. Validate

Follow [QA checklist](qa-checklist.md). Test representative user flows rather than only checking that files exist. Validate all referenced assets and keep source-backed facts consistent across pages.

## 7. Publish without overwriting preserved work

For GitHub, upload the project in a new folder using one atomic tree and commit when possible. Re-read the target branch before updating it and use the previous head as the expected SHA.

For Sites, use a separate project ID for a separate application. Persist the project ID in its own hosting manifest, push the exact source state, package the matching static output, save a version, deploy, and poll until a terminal result. Never claim that an expected URL is live without successful deployment status.

## 8. Report clearly

Return the GitHub folder, commit link, deployed URL when verified, validation summary, and any remaining limitation. State which earlier site was preserved.

