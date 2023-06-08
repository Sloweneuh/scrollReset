# -*- coding: utf-8 -*-
{
    'name': "Scroll Reset",

    'summary': """
        Keeps the scroll position when editing/saving a form""",

    'description': """
        Keeps the scroll position when editing/saving a form
    """,

    'author': "Gabriel Tricoire",
    'website': "www.arios.fr",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/16.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Technical',
    'version': '14.0.1',

    # any module necessary for this one to work correctly
    'depends': ['website'],

    # always loaded
    'data': [
        'views/assets.xml',
    ],
}
