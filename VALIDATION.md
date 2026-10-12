# Validation

Current-instance browser validation used system Chromium through Playwright over HTTP.

Passed:

- All 33 original pages are present in the gallery.
- Each of seven floor tabs renders 18 selectable units.
- Selecting B4, B13, B22, B31, B40, B49 and B58 updates the correct card and unit-detail section.
- Hero cards switch with only one panel open.
- Floor viewer opens, image click toggles zoom, Escape closes it.
- Plan category contains seven pages; gallery navigation retains original 33-page sequence.
- Desktop 1440×1000 and mobile 390×844 render without horizontal document overflow.
- Reduced-motion mode hides the animated intro and keeps manual detail controls usable.
- No browser JavaScript errors or failed HTTP asset responses occurred in these checks.
- JavaScript syntax check passed.

Desktop/mobile screenshots were inspected. Source plan and specification images were visually reviewed to distinguish their placement on the left/right side of each PDF page.

Limitations:

- Original PDF is rasterized; complete brochure text remains available as original page imagery. Key introduction, location and all unit-summary fields are selectable Persian text. This is not a complete verbatim transcription of all paragraphs.
- Plan selection polygons were drawn from raster source images. Unit outlines and terrace inclusion require owner review before sales use; separate CAD plans were not supplied.
- Printed floor-plan labels and specification lists contain discrepancies. Cards use the specification lists, which remain accessible alongside each selected unit.
- No confirmed mapping exists between interior renderings and individual units; renderings are shown as shared project design material.
- No contact number or current sales status was supplied for this project.
- GitHub push, GitHub Pages publication, physical-device tests and fresh-cloud-task restoration have not been performed.
