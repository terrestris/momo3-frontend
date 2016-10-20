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
 * This controller will be used to show a print dialog on the click
 * on the corresponding print button
 *
 * @class MoMo.client.view.button.PrintController
 */
Ext.define('MoMo.client.view.button.PrintController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'MoMo.client.view.form.Print'
    ],

    alias: 'controller.button.print',

    /**
    *
    */
    onToggle: function(btn, pressed) {
        var me = this;
        var printWin = Ext.ComponentQuery.query('window[name=print-window]')[0];
        if (pressed){
            var view = me.getView();
            var winX = BasiGX.util.Map.getMapComponent().getX() + 40;
            var winY = BasiGX.util.Map.getMapComponent().getY();
            if (!printWin) {
                printWin = Ext.create('Ext.window.Window', {
                    name: 'print-window',
                    title: me.getView().getViewModel().get('winTitle'),
                    autoScroll: true,
                    listeners: {
                        'close': function(){
                            btn.toggle(false);
                        }
                    },
                    constrainHeader: true,
                    items: [{
                        xtype: 'momo-form-print',
                        url: view.getPrintUrl() + '/print/'
                    }]
                });
                printWin.showAt(winX, winY);
            }
        } else {
            printWin.destroy();
        }
    }
});