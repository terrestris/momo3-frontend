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
 * WorkstateToolsPanelController
 *
 * The controller for the workstate tools. Contains logic to administrate
 * the state of work on the map (visible layer, map extent, zoom level etc.)
 * and to create a permalink
 *
 * @class MoMo.client.view.panel.WorkstateToolsPanelController
 */
Ext.define('MoMo.client.view.panel.WorkstateToolsPanelController', {

    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.panel.workstatetoolspanel',


    /**
     * Fires if "draw line" button was toggled. Creates a #drawLineInteraction
     * if not already exist.
     * @param {Ext.button.Button} btn
     * @param {Boolean} pressed toggle state
     */
    onLoadSaveWorkstateBtnToggle: function(btn, pressed) {
        var me = this,
            view = me.getView();
        if (!me.drawLineInteraction) {
            me.drawLineInteraction = new ol.interaction.Draw({
                features: view.redlineFeatures,
                type: 'LineString'
            });
            view.map.addInteraction(me.drawLineInteraction);
        }
        if (pressed) {
            me.drawLineInteraction.setActive(true);
        } else {
            me.drawLineInteraction.setActive(false);
        }
    },

    /**
     * Creates an instance of {@link MoMo.client.window.RedliningStylerWindow}
     * class with predefined styles for point, linestring and polygon.
     * @param {Ext.button.Button} btn
     * @param {Boolean} pressed toggle state
     */
    onPermalinkBtnToggle: function(btn, pressed) {
        var me = this,
            view = me.getView();
        if (!me.stylerWindow) {
            me.stylerWindow =
                Ext.create('MoMo.client.window.RedliningStylerWindow', {
                    redliningVectorLayer: view.redliningVectorLayer,
                    redlinePointStyle: view.getRedlinePointStyle(),
                    redlineLineStringStyle: view.getRedlineLineStringStyle(),
                    redlinePolygonStyle: view.getRedlinePolygonStyle()
                }
            );
            me.stylerWindow.on("hide", function() {
                btn.toggle();
                btn.blur();
            });
        }
        if (pressed) {
            me.stylerWindow.show();
        } else {
            me.stylerWindow.hide();
        }
    }
});
