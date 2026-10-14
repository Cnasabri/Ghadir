# QA checklist

## Data integrity

- Exactly 126 Ghadir residences.
- Seven floors and 18 units per floor.
- Unique unit IDs.
- Every residence references an existing advisor, image, and plan.
- Area and bedroom values match the source data.
- Illustrative fields are labeled as sample data.

## Navigation and routes

- Every navigation icon opens the intended route.
- Direct hash URLs render correctly.
- Account and residence detail URLs handle unknown IDs safely.
- Back links and internal arrows work.
- Mobile navigation matches the active route.

## Unit explorer

- All seven floor buttons work.
- Each floor shows 18 selectable polygons.
- Keyboard Enter and Space select a polygon.
- Selected unit summary updates.
- Availability colors and labels agree.
- Full-plan modal opens the correct floor.

## Sales flows

- Search, filters, sorting, pagination, favorites, and comparison work together.
- Comparison enforces its selection limit.
- Viewing requests persist and appear in the calendar.
- Account creation escapes user input and persists.
- Pipeline stage changes persist.
- Messages persist.
- Payment controls recalculate the monthly scenario.
- Downloads contain the selected residence information.

## Visual and responsive checks

- Test wide desktop, standard laptop, tablet portrait/landscape, and narrow mobile.
- No clipped navigation, unusable dialogs, overflowing tables, or inaccessible controls.
- Images use meaningful crops and do not distort.
- Motion helps hierarchy and does not block interaction.
- Reduced-motion preference and product toggle disable substantial animation.
- Light and dark appearances preserve contrast.

## Accessibility

- Visible focus states.
- Accessible names for icon-only controls.
- Dialog title and close control.
- Correct `aria-pressed` and `aria-selected` state.
- Keyboard operability for plan polygons and galleries.
- User-provided text is escaped before HTML insertion.

## Publication

- Old Site and repository-root application remain unchanged.
- New source appears only in the intended folder.
- Commit parent matches the branch head observed before publication.
- GitHub folder and commit are readable after the write.
- Hosted deployment reaches `succeeded` before returning a live URL.

