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
 * RedliningStylerWindow
 *
 * Used in combination with the Redline Tools Panel and allows a user
 * to modify the styles the features are drawn with.
 * You need to require the 'ux' package in your app.json to make use of this
 * component.
 *
 * @class MoMo.client.view.window.RedliningStylerWindow
 */
Ext.define("MoMo.client.view.window.RedliningStylerWindow", {
    extend: "Ext.window.Window",
    xtype: 'momo-window-redlining',

    requires: [
        'Ext.ux.colorpick.Button',
        'BasiGX.util.Color'
    ],

    controller: 'window.redliningstyler',

    viewModel: 'window.redliningstyler',

    bind: {
        title: '{title}'
    },

    /**
    *
    */
    redliningVectorLayer: null,

    /**
     *
     */
    redlinePointStyle: null,

    /**
     *
     */
    redlineLineStringStyle: null,

    /**
     *
     */
    redlinePolygonStyle: null,

    modal: true,

    collapsible: false,

    layout: 'vbox',

    closeAction: 'hide',

    autoScroll: true,

    constrainHeader: true,

    defaults: {
        style: {
            margin: '5px 5px 0 5px'
        }
    },

    initComponent: function(config) {
        var me = this;

        me.items = [{
            xtype: 'fieldset',
            bind: {
                title: '{pointStyleFieldSetTitle}'
            },
            name: 'pointstyle',
            layout: 'hbox',
            items: [{
                xtype: 'momo-panel-redliningstyler-point',
                style: me.redlinePointStyle
            }]
        }, {
            xtype: 'fieldset',
            bind: {
                title: '{lineStyleFieldSetTitle}'
            },
            name: 'linestringstyle',
            layout: 'hbox',
            items: [{
                xtype: 'momo-panel-redliningstyler-linestring',
                style: me.redlineLineStringStyle
            }]
        }, {
            xtype: 'fieldset',
            bind: {
                title: '{polygonStyleFieldSetTitle}'
            },
            name: 'polygonstyle',
            layout: 'hbox',
            style: {
                margin: '5px'
            },
            items: [{
                xtype: 'momo-panel-redliningstyler-polygon',
                style: me.redlinePolygonStyle
            }]
        }];

        me.buttons = [{
            xtype: 'button',
            bind: {
                text: '{closeStylerBtnText}'
            },
            handler: function (){
                me.hide();

            }
        }];

        me.callParent(config);
    }
});
