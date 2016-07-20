/* Copyright (c) 2016 terrestris GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * A modal window where the River Basin Management Atlas (RBMA) structure will
 * be represented.
 *
 * @class MoMo.client.view.window.RBMAWindow
 */
Ext.define("MoMo.client.window.RbmaWindow", {
    extend: "Ext.window.Window",
    xtype: 'momo-window-rbma',

    requires: [
        'MoMo.client.view.panel.RbmaTree',
        'MoMo.client.view.panel.RbmaPdfPreview'
    ],

    controller: 'window.rbma',

    viewModel: 'window.rbma',

    bind: {
        title: '{title}'
    },

    modal: true,

    collapsible: false,

    width: '80%',

    height: '90%',

    layout: {
         type: 'border'
    },

    defaults: {
        style: {
            margin: '5px 5px 0 5px'
        }
    },

    items: [
        {
            xtype: 'momo-rbma-tree',
            region: 'west'
        },
        {
            xtype: 'momo-rbma-pdf-preview',
            region: 'center'
        }
    ]
});
