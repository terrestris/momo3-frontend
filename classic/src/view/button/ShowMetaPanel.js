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
 * ShowMetaPanel Button
 *
 * Button used to show and hide a panel with meta informations for the map
 * (i.e. current map scale, used EPSG or mouse position)
 *
 * @class MoMo.client.view.button.ShowMetaPanel
 */
Ext.define("MoMo.client.view.button.ShowMetaPanel", {
    extend: "Ext.Button",
    xtype: 'momo-button-showmetapanel',

    requires: [
        'Ext.app.ViewModel',
        'BasiGX.util.Animate'
    ],

    /**
     *
     */
    bind: {
        tooltip: '{tooltip}',
        text: '{text}'
    },

    viewModel: 'button.showmetapanel',

    controller: 'button.showmetapanel',

    glyph: 'xf278@FontAwesome',

    cls: 'momo-showmetapanel-button',

    iconCls: 'momo-showmetapanel-button-icon',

    listeners: {
        click: 'onClick'
    }
});
