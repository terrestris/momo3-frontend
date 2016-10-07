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
 * PrintController
 *
 * The controller for the print. At the moment the BasiGX class
 * ´BasiGX.form.Print´ with its own logic will be used so we don't need
 * to implement here our own code (yet). Change it if the print tools
 * should be adjusted or don't work as expected.
 *
 *
 * @class MoMo.client.view.form.PrintController
 */
Ext.define('MoMo.client.view.form.PrintController', {

    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.form.print'

});
