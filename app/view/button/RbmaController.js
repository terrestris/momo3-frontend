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
 * RbmaController
 *
 * This controller will be used to show/hide a RBMA modal window on click
 * on the corresponding RBMA button
 *
 * @class MoMo.client.view.button.RbmaController
 */
Ext.define('MoMo.client.view.button.RbmaController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.button.rbma',

    /**
    *
    */
    onClick: function() {
        var win = Ext.create('MoMo.client.window.rbma.RbmaWindow', {});
        win.show();
    }
});
