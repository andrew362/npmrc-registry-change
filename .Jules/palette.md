## 2025-03-19 - Replace div color swatches with buttons
**Learning:** `div` tags used as interactive color swatches are completely inaccessible to screen reader users and keyboard navigation. Using semantic `<button type="button">` with descriptive `aria-label`s and `aria-pressed` states makes custom color pickers usable for all users.
**Action:** Always replace purely visual interactive `div` elements with `<button>`s when creating custom UI controls like color selectors, and include descriptive text for screen readers.
