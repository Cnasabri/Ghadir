# NODE — Ghadir Residences

A separate English property workspace inspired by the supplied reference. The original RealE 360 site remains at https://reale360-units.rockybell65.chatgpt.site and has not been modified.

## Contents

- Overview, interactive seven-floor explorer, residence collection and 126 residence detail routes.
- Original Ghadir project images and architectural floor plans.
- Accounts, account profiles, property opportunities, viewing calendar, saved homes, documents, payment scenarios, conversations, insights, settings and help.
- Filter and search, three-home comparison, image galleries, viewing requests, local account editing and local conversations.
- Animated statistics and reveal transitions with reduced-motion support; responsive desktop, tablet and mobile layouts.
- Workspace export and restore. User data is stored in the current browser.

## Data provenance

Residence IDs, areas, bedrooms, floors, blocks and polygon selections follow the supplied Ghadir project brochure via the existing Ghadir source. Project: Pardisan, Qom, by Zagros Construction Group. Asking prices, availability, identities and sales records are illustrative. Images are original project design renders, not verified photos of individual units. Original drawings retain Persian source annotations; application controls and summaries are English.

## Run

Serve `dist/` with any static web server, for example `python -m http.server 4173 --directory dist`, then open its local URL. Hash routes require no server rewrite.

## Site identity

The new independent Site is recorded in `.openai/hosting.json`.
Expected URL after successful publication: https://node-ghadir-residences.rockybell65.chatgpt.site
This URL is not proof of publication.

## Validation

Syntax and DOM interaction checks passed for 16 representative routes and the key user flows. All source asset references were validated. Browser rendering and device screenshots are unverified: the current execution sandbox denies socket operations, so the preview server and Chromium could not start. Git publication is also blocked by the current environment's network restriction.

To finish publication, use the Sites workflow with the existing project ID. Push this exact source revision, package `.openai/hosting.json` plus `dist/`, then save and deploy the new Site. Do not create another Site or overwrite RealE 360.
