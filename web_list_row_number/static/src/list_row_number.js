import { onMounted, onPatched } from "@odoo/owl";
import { patch } from "@web/core/utils/patch";
import { ListRenderer } from "@web/views/list/list_renderer";

// Why the column is registered here rather than only injected into the
// template: Odoo sizes list columns by walking the DOM's <th> list and the
// renderer's own `columns` array in lockstep. In column_width_hook.js it is
//
//     const headers = [...table.querySelectorAll("thead th")];
//     const columnOffset = state.hasSelectors ? 1 : 0;
//     const thIndex = columnIndex + columnOffset;
//
// so the offset accounts for the selector checkbox and nothing else. A column
// that exists only in the template is invisible to `columns`, which leaves the
// two sides a different length and hands every real column its neighbour's
// min/max width -- the selector ends up as wide as the first field, the first
// field as wide as the second, and the last one gets no constraint at all.
//
// Registering the column keeps both sides the same length, so the width engine,
// the footer colspans and the group-row colspans all stay correct on their own.
// `attrs.width` is the one specification getWidthSpecs() honours for a
// non-field column, and it pins ours to a fixed size.
const ROW_NUMBER_COLUMN = {
    id: "row_number",
    type: "row_number",
    attrs: { width: "40px" },
};

patch(ListRenderer.prototype, {
    setup() {
        super.setup();
        // The header cell is normally drawn by this module's own branch in
        // web.ListRenderer. A renderer that replaces the main template with a
        // `primary` t-inherit gets its copy made before this module's
        // extension is applied, since module load order puts
        // web_list_row_number after stock, account and the rest, so that copy
        // falls through to core's unlabelled `t-else` cell. The column, its
        // width and the cell counts are all correct there and only the "#" is
        // missing, which would otherwise leave the header labelled on some
        // lists and blank on others. Writing it after render keeps every list
        // looking the same.
        const labelHeader = () => {
            // Odoo 20 turned the renderer's refs into signals, so the table
            // element is read by calling tableRef rather than through `.el`.
            const table = this.tableRef();
            const columns = this.columns;
            if (!table || !columns || !columns.length) {
                return;
            }
            if (columns[0].id !== ROW_NUMBER_COLUMN.id) {
                return; // this list is one of the skipped renderers
            }
            const th = table.querySelectorAll("thead th")[this.hasSelectors ? 1 : 0];
            if (!th || th.classList.contains("o_row_number_header")) {
                return; // already drawn by the template, or nothing to label
            }
            th.classList.add("o_row_number_header", "text-center", "text-muted");
            th.textContent = "#";
        };
        onMounted(labelHeader);
        onPatched(labelHeader);
    },

    getActiveColumns() {
        const columns = super.getActiveColumns();
        // The row template is the one that decides whether the cell can be
        // drawn at all. A renderer replacing it (sale order and invoice lines
        // do, through account.SectionAndNoteListRenderer.RecordRow) takes the
        // column into its header and footer colspans while its rows render no
        // cell for it, leaving the table one column wider than its own rows.
        // Those lists are left untouched, which is the limitation the module
        // has always documented.
        //
        // Renderers that only replace the *main* template are not skipped:
        // they keep the base row template, so the cell still renders and the
        // counts still match. Several modules do this purely to add a custom
        // "no content" helper (stock, hr_expense, hr_recruitment, lunch,
        // hr_attendance, survey, loyalty), and skipping them would drop the
        // column from those lists for no reason.
        if (this.constructor.recordRowTemplate !== "web.ListRenderer.RecordRow") {
            return columns;
        }
        // Prepended after super() so the column skips the optional-field and
        // column_invisible filtering, neither of which applies to it.
        return [ROW_NUMBER_COLUMN, ...columns];
    },
});
