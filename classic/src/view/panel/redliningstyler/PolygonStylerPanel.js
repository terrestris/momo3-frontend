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
 * Panel containing the styling options for polygon features. The following
 * parameters can be adjusted:
 *   * stroke width
 *   * stroke color
 *   * fill color
 * Thank to the provided `gx_renderer` the user can see the style changes
 * immediately in the same view.
 *
 * @class MoMo.client.view.panel.redliningstyler.PolygonStylerPanel
 */
Ext.define("MoMo.client.view.panel.redliningstyler.PolygonStylerPanel", {
    extend: "Ext.panel.Panel",
    xtype: 'momo-panel-redliningstyler-polygon',

    requires: [
    ],

    layout: 'hbox',

    border: false,

    /**
     * The style object must be provided by the instantiating of the father
     * class {@link MoMo.client.window.RedliningStylerWindow}
     */
    style: null,

    controller: 'panel.redliningstyler',

    initComponent: function(cfg){
        var me = this;

        me.items = [{
            xtype: 'panel',
            defaults: {
                margin: 3,
                width: 220
            },
            items: [{
                xtype : 'numberfield',
                labelSeparator: '',
                bind: {
                    fieldLabel: '{styleStrokeWidthFieldLabel}'
                },
                value: me.style.getStroke().getWidth(),
                minValue: 0,
                maxValue: 50,
                listeners: {
                    change: function(field, val) {
                        me.getController().updateStyle(null, null,
                            {strokewidth: val}
                        );
                    }
                }
            }, {
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                    width: 100
                },
                items: [{
                    xtype: 'displayfield',
                    bind: {
                        value: '{styleStrokeColorFieldLabel}'
                    }
                }, {
                    xtype : 'colorbutton',
                    name: 'polystrokecolor',
                    format: 'hex8',
                    value : me.style.getStroke().getColor(),
                    margin: '5 0 0 10',
                    listeners: {
                        change: function(field, val, oldVal) {
                            if (oldVal) {
                                var color = BasiGX.util.Color.hex8ToRgba(val);
                                me.getController().updateStyle(null, null,
                                    {strokecolor: color}
                                );
                            }
                        }
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                    width: 100
                },
                items: [{
                    xtype: 'displayfield',
                    bind: {
                        value: '{styleFillColorFieldLabel}'
                    }
                }, {
                    xtype : 'colorbutton',
                    name: 'polyfillcolor',
                    format: 'hex8',
                    value : me.style.getFill().getColor(),
                    margin: '5 0 0 10',
                    listeners: {
                        change: function(field, val, oldVal) {
                            if (oldVal) {
                                var color = BasiGX.util.Color.hex8ToRgba(val);
                                me.getController().updateStyle(null, null,
                                    {fillcolor: color}
                                );
                            }
                        }
                    }
                }]
            }]
        }, {
            xtype: 'panel',
            border: false,
            layout: 'fit',
            items: [{
                xtype: 'gx_renderer',
                margin: 20,
                width: 200,
                height: 100,
                name: 'polygonRenderPreview',
                symbolizers: me.style,
                symbolType: 'Polygon'
            }]
        }];

        me.callParent([cfg]);
    }
});
