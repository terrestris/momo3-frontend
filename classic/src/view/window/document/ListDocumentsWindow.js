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
 * A modal window where the document structure will be represented.
 *
 * @class MoMo.client.view.window.DocumentWindow
 */
Ext.define("MoMo.client.view.window.document.ListDocumentsWindow", {
    extend: "Ext.window.Window",
    xtype: 'momo-window-listdocuments',

    requires: [
        'BasiGX.util.Url',
        'MoMo.client.util.ApplicationContext',
        'MoMo.client.util.User',
        'MoMo.client.plugin.VisibleForAtLeastEditors'
    ],

    controller: 'window.document.listdocuments',

    viewModel: 'window.document.listdocuments',

    bind: {
        title: '{title}'
    },

    modal: true,

    collapsible: false,

    width: 600,

    height: 500,

    layout: {
        type: 'fit'
    },

    defaults: {
        style: {
            margin: '5px 5px 0 5px'
        }
    },

    items: [{
        xtype: 'grid',
        hideHeaders: true,
        allowDeselect: true,
        width: 400,
        height: 300,
        columns: [
            {text: 'Document', dataIndex: 'name', flex: 1}
        ],
        listeners: {
            selectionchange: function(sm, sel){
                var vm = this.lookupViewModel();
                vm.set('docSelected', sel.length > 0);
            }
        },
        store: {
            fields: ['id', 'name'],
            autoLoad: true,
            type: 'json',
            proxy: {
                type: 'ajax',
                url: BasiGX.util.Url.getWebProjectBaseUrl() +
                     'rest/momoapps/' +
                     BasiGX.util.Url.getParamValue('id') +
                     '/documentRoots',
                reader: {
                    type: 'json'
                }
            }
        },
        bbar: [{
            xtype: 'button',
            name: 'open-selected-doc',
            bind: {
                text: '{textOpenSelectedDoc}',
                disabled: '{!docSelected}'
            },
            handler: 'onClickOpenSelectedDoc'
        },
        '->',
        {
            xtype: 'button',
            name: 'create-new-doc',
            plugins: ['visibleforatleasteditors'],
            bind: {
                text: '{textCreateNewDoc}'
            },
            handler: 'onClickCreateNewDoc'
        }, {
            xtype: 'button',
            name: 'delete-selected-doc',
            plugins: ['visibleforatleasteditors'],
            bind: {
                text: '{textDeleteSelectedDoc}',
                disabled: '{!docSelected}'
            },
            handler: 'onClickDeleteSelectedDoc'
        }]
    }]
});
