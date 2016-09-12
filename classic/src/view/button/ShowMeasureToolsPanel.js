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
 * ShowMeasureToolsPanel Button
 *
 * Button used to show and hide a panel with measure tools for the map
 * (i.e. Distance and area measurements)
 *
 * @class ShowMeasureToolsPanel
 */
Ext.define("MoMo.client.view.button.ShowMeasureToolsPanel", {
    extend: "Ext.button.Button",
    xtype: 'momo-button-showmeasuretoolspanel',

    requires: [
        'Ext.app.ViewModel',
        'BasiGX.util.Animate'
    ],

    controller: 'button.showmeasuretoolspanel',

    viewModel: 'button.showmeasuretoolspanel',

    bind: {
        tooltip: '{tooltip}',
        text: '{text}'
    },

    glyph: 'xf125@FontAwesome',

    enableToggle: true,

    listeners: {
        toggle: 'onToggle'
    }
});
