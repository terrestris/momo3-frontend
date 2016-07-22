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
 * Panel where the RBMA documents should be rendered as PDF preview into
 *
 * @class MoMo.client.view.panel.rbma.RbmaPdfPreview
 */
Ext.define("MoMo.client.view.panel.rbma.RbmaPdfPreview",{
    extend: "Ext.panel.Panel",
    xtype: "momo-rbma-pdf-preview",

    controller: 'panel.rbma.rbmapdfpreview',

    viewModel: 'panel.rbma.rbmapdfpreview',

    collapsible: false,

    collapsed: false,

    layout: 'fit',

    items: [{
        xtype: 'component',
        hidden: true,
        bind: {
            html : '<iframe src="' + '{pdfFile}' +
                '" width="100%" height="100%"></iframe>'
        }
    }],

    bbar: [
        '->',
        {
            xtype: 'button',
            bind: {
                text: '{downloadBtnText}'
            },
            handler: 'onDownloadBtnClick'
        }
    ],

   /**
    *
    */
    initComponent: function() {
        var me = this;
//        var ctrl = me.getController();

        // call parent
        me.callParent();
    }
});
