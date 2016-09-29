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
 * ShowToolsPanelCommonController
 *
 * Common controller class that combines all properties and methods that
 * will be used by almost all main momo client tools controllers.
 *
 * @class ShowToolsPanelCommonController
 */
Ext.define('MoMo.client.view.button.ShowToolsPanelCommonController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.button.showtoolspanelcommoncontroller',

    /**
     * Placeholder for the corresponding tools panel
     */
    btnPanel: null,

    /**
     * Creates a wrapper panel containing all buttons that belongs to the
     * corresponding container/panel.
     * The position of the panel will be computed dynamically (s. method
     * #computePosition below).
     * If an additional config is provided it will be applied as well.
     * @param {String} xtype xtype of the container/panel element to be created
     * @param {Object} config additional config object that could be specific
     *      for different classes
     */
    createToolsPanel: function(xtype, config) {

        var me = this;

        var parentBtn = me.getView().getEl();

        var position = me.computePosition(parentBtn);

        var btnPanel = Ext.create(xtype, {
            style: {
                'top': position.top,
                'right': position.right
            }
        });

        // will be used e.g. by redlining tools for customized style config
        if (config) {
            btnPanel.setConfig(config);
        }

        return btnPanel;
    },

    /**
     * Shows a tools panel on call button toggle.
     * @param {String} xtype xtype of the container/panel element to be created
     * @param {Object} config additional config object that could be specific
     *      for different classes
     */
    showToolsPanel: function(xtype, config) {
        var me = this;
        if (!me.btnPanel) {
            me.btnPanel = me.createToolsPanel(xtype, config);
            // map container
            var cont = Ext.ComponentQuery
                .query('viewport > container[region=center]')[0];
            cont.add(me.btnPanel);
        } else {
            me.btnPanel.show();
        }
    },

    /**
     * Computes position of the tools panel depending on the
     * dimensions and position of the parent button and the height of the
     * application header if given.
     */
    computePosition: function(btn){
        var header = Ext.ComponentQuery.query('panel[region=north]')[0],
            hHeight = 0;

        if (header) {
            var hSplitter = header.splitter;
            hHeight = header.getHeight();
        }

        var top =
            btn.getClientRegion().top - hHeight - hSplitter.getHeight() + "px";
        var right = btn.getWidth()*2 + "px";

        return {
            top: top,
            right: right
        };
    },

    /**
     * Hides a tools panel on call button toggle.
     */
    hideToolsPanel: function() {
        var me = this;
        if (me.btnPanel) {
            me.btnPanel.hide();
        }
    },

    /**
     * Deactivates possibly activated tools if parent button was
     * untoggled and wrapper tools panel was hidden.
     */
    deactivateTools: function (){
        var me = this;
        if (me.btnPanel) {
            var measureBtns = me.btnPanel.query('button');
            Ext.each(measureBtns, function(btn){
                if (btn.pressed) {
                    btn.toggle();
                }
            });
        }
    }
});
