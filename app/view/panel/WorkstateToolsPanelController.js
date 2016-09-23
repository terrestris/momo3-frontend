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
     * Fires if load/save workstate button was toggled.
     * @param {Ext.button.Button} btn
     * @param {Boolean} pressed toggle state
     */
    onLoadSaveWorkstateBtnToggle: function(btn, pressed) {
        if(pressed) {
            Ext.toast('Arbeitstände laden/speichern');
        }
    }
});
