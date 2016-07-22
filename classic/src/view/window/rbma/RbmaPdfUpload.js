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
 * Panel where the RBMA documents should be uploaded via form submit to the
 * backend
 *
 * @class RbmaPdfUpload
 */
Ext.define("MoMo.client.view.window.rbma.RbmaPdfUpload",{
    extend: "Ext.window.Window",
    xtype: "momo-rbma-pdf-upload",

    controller: 'window.rbma.rbmapdfupload',

    viewModel: 'window.rbma.rbmapdfupload',

    collapsible: false,

    collapsed: false,

    layout: 'auto',

    bind: {
        title: '{title}'
    },

    items: [{
        xtype: 'form',
        border: false,
        bodyPadding: 10,
        frame: true,
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        items: [{
            xtype: 'fileuploadfield',
            name: 'pdfupload',
            width: 300,
            labelWidth: 30,
            msgTarget: 'side',
            allowBlank: false,
            anchor: '100%',
            bind: {
                emptyText: '{choosePdfPlaceholderText}'
            }
        }],
        buttons: [{
            bind: {
                text: '{uploadBtnText}'
            },
            formBind: true,
            handler: 'onUploadBtnClick'
        }]

    }],

   /**
    *
    */
    initComponent: function(cfg) {
        var me = this;

        // call parent
        me.callParent();
    }
});
