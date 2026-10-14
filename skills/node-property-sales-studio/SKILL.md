---
name: node-property-sales-studio
description: Build, extend, validate, preserve, and publish the NODE/Ghadir property-sales workspace. Use when a user asks for a premium real-estate dashboard from a visual reference, interactive unit and floor selection, property detail pages, CRM-style accounts and sales flows, responsive motion, reuse of Ghadir plans or imagery, preservation of an existing Site, or GitHub packaging of this project.
---

# NODE Property Sales Studio

Turn a supplied visual reference and property source material into a complete, polished sales workspace. Treat the reference as the visual target and the supplied project files as the factual source.

Read [conversation brief](references/conversation-brief.md) before changing product scope or visual direction. Read [workflow](references/workflow.md) before implementation or publication. Read [QA checklist](references/qa-checklist.md) before declaring work complete.

## Core rules

1. Preserve existing deployed Sites and source folders unless the user explicitly asks to replace them. Create a separate project, Site identity, folder, and URL for a new design direction.
2. Keep source facts separate from prototype records. For Ghadir, unit IDs, blocks, floors, areas, bedroom counts, floor plans, and selection polygons are source-backed. Prices, availability, advisors, accounts, deals, and messages are sample data until the user supplies authoritative values.
3. Label illustrative values and project renders honestly in the interface and documentation. Do not present design renders as verified photos of a specific unit.
4. Build the full interaction model. Every visible arrow, icon, filter, tab, gallery control, unit marker, account action, and mobile navigation item must do something meaningful.
5. Design desktop, tablet, and mobile layouts deliberately. Do not rely on desktop shrinking alone.
6. Respect reduced-motion preferences and provide a motion toggle when the experience contains substantial animation.
7. Keep credentials, tokens, private URLs, and environment values out of source and documentation.

## Required product surface

For a full sales-workspace request, include:

- Overview dashboard with a featured residence, team, opportunities, conversations, and animated statistics.
- Interactive floor explorer with floor switching, original plan display, clickable unit polygons, availability states, and a selected-unit summary.
- Searchable and filterable residence collection, favorites, and comparison for up to three homes.
- Residence detail routes with gallery, facts, floor-plan crop, overview, payment scenario, documents, advisor, sharing, and viewing request.
- Accounts list and profile pages, editable browser-local contacts, sales pipeline, viewing calendar, documents, payments, messages, insights, settings, and help.
- Browser-local persistence plus workspace export and restore when no backend is requested.
- English interface copy unless the user requests another language. Preserve original source annotations inside architectural drawings.

## Project locations

When operating in this repository:

- Current application: `node-residences/`
- Main files: `node-residences/index.html`, `node-residences/app.js`, `node-residences/data.js`, `node-residences/style.css`
- Project assets: `node-residences/assets/ghadir/`
- Original Ghadir site remains at the repository root.
- Existing preserved RealE 360 deployment: `https://reale360-units.rockybell65.chatgpt.site`
- GitHub repository: `https://github.com/Cnasabri/Ghadir`

## Implementation guidance

- Prefer a buildless static application when browser-local interactions are sufficient.
- Keep data in a distinct data module and render UI from that model.
- Use hash routes for static hosting unless the host supports rewrites.
- Use accessible buttons, labels, dialog titles, focus styles, `aria-pressed`, `aria-selected`, and keyboard activation for plan polygons.
- Escape user-entered strings before injecting them into generated HTML.
- Use animation to clarify hierarchy: staggered reveals, counting statistics, progress fills, image transitions, and restrained modal motion.
- Maintain a single icon system with consistent stroke, size, and interaction states.

## Completion standard

The work is complete only after syntax checks, data validation, representative route tests, asset existence checks, responsive review where browser tooling is available, and publication verification. If browser or network access is unavailable, package the exact source and state the verification limit without claiming publication.

