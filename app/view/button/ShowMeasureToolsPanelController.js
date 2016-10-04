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
 * ShowMeasureToolsPanelController
 *
 * This controller will be used to manage the measurement tools (distance
 * and area) in the GIS applications
 *
 * @class ShowMeasureToolsPanelController
 */
Ext.define('MoMo.client.view.button.ShowMeasureToolsPanelController', {
    extend: 'MoMo.client.view.button.ShowToolsPanelCommonController',

    requires: [
    ],

    alias: 'controller.button.showmeasuretoolspanel',

    /**
     * Placeholder for the measurement tools panel
     */
    btnPanel: null,

    /**
    *
    */
    onToggle: function(btn, pressed){
        var me = this;
        if (pressed){
            me.showToolsPanel("MoMo.client.view.panel.MeasureToolsPanel");
        } else {
            me.hideToolsPanel();
            me.deactivateTools();
        }
    }

});
