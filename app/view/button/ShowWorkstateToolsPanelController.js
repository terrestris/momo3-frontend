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
 * ShowWorkstateToolsPanelController
 *
 * This controller will be used to manage the workstate tools
 *
 * @class ShowWorkstateToolsPanelController
 */
Ext.define('MoMo.client.view.button.ShowWorkstateToolsPanelController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.button.showworkstatetoolspanel',

    /**
     * Placeholder for the workstate tools panel
     */
    btnPanel: null,

    /**
    *
    */
    onToggle: function(btn, pressed){
        var me = this;
        if (pressed){
            me.showWorkstateToolsPanel();
        } else {
            me.hideWorkstateToolsPanel();
            //me.deactivateWorkstateTools();
        }
    },

    /**
     * Creates a panel containing two buttons for workstate administration and
     * permalink creation. The position of the panel will be computed
     * dynamically (s. method #computePosition below).
     */
    createWorkstateButtonsPanel: function() {

        var me = this;

        var parentBtn = me.getView().getEl();

        var position = me.computePosition(parentBtn);

        var btnPanel =
            Ext.create("MoMo.client.view.panel.WorkstateToolsPanel", {
                style: {
                    'top': position.top,
                    'right': position.right
                },
                bodyStyle: {
                    background: 'transparent'
                }
            }
        );

        return btnPanel;
    },

    /**
     * Shows a workstate tools panel on call button toggle.
     */
    showWorkstateToolsPanel: function() {
        var me = this;
        if (!me.btnPanel) {
            me.btnPanel = me.createWorkstateButtonsPanel();
            // map container
            var cont = Ext.ComponentQuery
                .query('viewport > container[region=center]')[0];
            cont.add(me.btnPanel);
        } else {
            me.btnPanel.show();
        }
    },

    /**
     * Computes position of the measurement tools panel depending on the
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
     * Hides a workstate tools panel on call button toggle.
     */
    hideWorkstateToolsPanel: function() {
        var me = this;
        if (me.btnPanel) {
            me.btnPanel.hide();
        }
    },

    /**
     * Deactivates possibly activated workstate tools if parent button was
     * untoggled and workstate tools panel was hidden.
     */
    deactivateWorkstateTools: function (){
        var me = this;
        if (me.btnPanel) {
            var workstateBtns = me.btnPanel.query('button');
            Ext.each(workstateBtns, function(btn){
                if (btn.pressed) {
                    btn.toggle();
                }
            });
        }
    }
});
