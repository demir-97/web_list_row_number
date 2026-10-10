# List View Row Number

**A "#" column for every list view, out of the box.**

Odoo's list and tree views don't show a row/line number — this module adds one,
everywhere: the main list views, and the embedded one2many / many2many tables
inside a form (order lines, invoice lines, stock moves, BoM lines, ...).

No configuration, no view XML changes: install it and every list view gets the
column immediately.

## Behavior

- Numbering follows the page: it continues from where the previous page left
  off (page 2 of a 80-per-page list starts at 81), it does not restart at 1.
- Inside a grouped list, numbering restarts at 1 for each group.
- Purely presentational: no field is added, computed or stored, so it has no
  effect on exports, imports, filters or any other module.

## Limitation

List/tree views rendered by a fully custom renderer (for example sale order
lines' section-and-note renderer) replace the standard list renderer outright,
so they are not affected — this module extends the standard renderer, it
doesn't patch every possible one.

## Technical

Client-side only: one OWL template extension (`t-inherit` on
`web.ListRenderer`) plus a small stylesheet. No models, no views, no security
rules, no server-side code at all.

---
Author: Meisanqo — meisanqo@outlook.com
