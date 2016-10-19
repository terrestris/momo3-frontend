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
 * DocumentController
 *
 * This controller will be used to show/hide a modal window on click,
 * which lists all available documents (trees) for the current application.
 *
 * @class MoMo.client.view.button.DocumentController
 */
Ext.define('MoMo.client.view.button.ListDocumentsController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.button.listdocuments',

    /**
    *
    */
    onClick: function() {

        Ext.create('MoMo.client.view.window.document.ListDocumentsWindow', {
            autoShow: true
        });

    }
});
