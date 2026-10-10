{
    'name': 'List View Row Number | Sr. No. / Serial Number / Line Number Column',
    'version': '17.0.1.0.2',
    'category': 'Productivity',
    'author': 'Meisanqo',
    'support': 'meisanqo@outlook.com',
    'summary': "Row number column for every list view: a read-only \"#\" column numbering the rows 1, 2, 3. Serial number, Sr. No. or line number display with no field added to your models. Numbering is continuous across pages instead of restarting at 1, restarts at 1 inside each group of a grouped list view, and also appears in the one2many and many2many tables embedded in a form, except lists drawn by a fully custom renderer such as sale order lines. Zero configuration: install it and the column is there, with no effect on exports or imports.",
    'description': """
List View Row Number
=====================

Adds a small, read-only "#" column in front of every list view — the main
list views, and the embedded one2many / many2many tables inside a form
(purchase order lines, stock moves, BoM lines, and any other list/tree
view). Sale order lines and invoice lines are the exception, see the known
limitation below: they are drawn by their own section-and-note renderer.

- Numbering is continuous across pages: page 2 continues from where page 1
  left off (based on the list's offset), it does not restart at 1.
- Inside grouped list views, numbering restarts at 1 for each group.
- Works out of the box on install — no settings, no XML changes, nothing to
  configure.
- Pure presentation: it does not add, store or compute any field, so it has
  no effect on exports, imports or any other module.

Known limitation: list/tree views rendered with a fully custom renderer
(for example sale order lines' section-and-note renderer) are not affected,
since they replace the standard list renderer entirely rather than
extending it.
""",
    'depends': ['web'],
    'images': ['static/description/banner.png'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            'web_list_row_number/static/src/**/*',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}
