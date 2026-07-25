{
    'name': 'List View Row Number | Sr. No. / Serial Number / Line Number Column',
    'version': '19.0.1.0.0',
    'category': 'Productivity',
    'author': 'Meisanqo',
    'support': 'meisanqo@outlook.com',
    'summary': 'A "#" row-number column for every list view — zero configuration.',
    'description': """
List View Row Number
=====================

Adds a small, read-only "#" column in front of every list view — the main
list views, and the embedded one2many / many2many tables inside a form
(sale order lines, purchase order lines, invoice lines, stock moves, BoM
lines, and any other list/tree view).

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
    'license': 'OPL-1',
    'price': 8.0,
    'currency': 'USD',
}
