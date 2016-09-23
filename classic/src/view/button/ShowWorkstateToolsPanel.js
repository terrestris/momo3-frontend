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
 * ShowWorkstateToolsPanel Button
 *
 * Button used to show and hide a panel with workstate tools for the map.
 * This panel includes the following tools:
 *   * Save/load workstate
 *   * Create permalink
 *
 * @class MoMo.client.view.button.ShowWorkstateToolsPanel
 */
Ext.define("MoMo.client.view.button.ShowWorkstateToolsPanel", {
    extend: "Ext.button.Button",
    xtype: 'momo-button-showworkstatetoolspanel',

    requires: [
        'Ext.app.ViewModel',
        'BasiGX.util.Animate'
    ],

    controller: 'button.showworkstatetoolspanel',

    viewModel: 'button.showworkstatetoolspanel',

    bind: {
        tooltip: '{tooltip}',
        text: '{text}'
    },

    glyph: 'xf108@FontAwesome',

    enableToggle: true,

    toggleGroup: 'momo-common-tools',

    listeners: {
        toggle: 'onToggle'
    }
});
