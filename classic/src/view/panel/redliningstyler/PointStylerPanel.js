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
 * Panel containing the styling options for point features. The following
 * parameters can be adjusted:
 *   * point radius
 *   * stroke width
 *   * stroke color
 *   * fill color
 * Thank to the provided `gx_renderer` the user can see the style changes
 * immediately in the same view.
 *
 * @class MoMo.client.view.panel.redliningstyler.PointStylerPanel
 */
Ext.define("MoMo.client.view.panel.redliningstyler.PointStylerPanel", {
    extend: "Ext.panel.Panel",
    xtype: 'momo-panel-redliningstyler-point',

    requires: [
    ],

    layout: 'hbox',

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
                width: 220,
                labelSeparator: ''
            },
            items: [{
                xtype: 'numberfield',
                bind: {
                    fieldLabel: '{pointStyleRadiusNumberFieldLabel}'
                },
                name: 'pointradius',
                value : me.style.getImage().getRadius(),
                minValue: 1,
                maxValue: 50,
                listeners: {
                    change: function(field, val) {
                        me.getController().updateStyle({radius: val});
                    }
                }
            }, {
                xtype: 'numberfield',
                bind: {
                    fieldLabel: '{styleStrokeWidthFieldLabel}'
                },
                name: 'pointstrokewidth',
                value : me.style.getImage().getStroke().getWidth(),
                minValue: 0,
                maxValue: 50,
                listeners: {
                    change: function(field, val) {
                        me.getController().updateStyle({strokewidth: val});
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
                    xtype: 'colorbutton',
                    name: 'pointstrokecolor',
                    format: 'hex8',
                    value : me.style.getImage().getStroke().getColor(),
                    margin: '5 0 0 10',
                    listeners: {
                        change: function(field, val, oldVal) {
                            if (oldVal) {
                                var color = BasiGX.util.Color.hex8ToRgba(val);
                                me.getController()
                                    .updateStyle({strokecolor: color});
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
                    width: 100,
                    bind: {
                        value: '{styleFillColorFieldLabel}'
                    }
                }, {
                    xtype : 'colorbutton',
                    name: 'pointfillcolor',
                    format: 'hex8',
                    margin: '0 0 0 10',
                    value : me.style.getImage().getFill().getColor(),
                    listeners: {
                        change: function(field, val, oldVal) {
                            if (oldVal) {
                                var color = BasiGX.util.Color.hex8ToRgba(val);
                                me.getController()
                                    .updateStyle({fillcolor: color});
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
                name: 'pointRenderPreview',
                symbolizers: me.style,
                symbolType: 'Point'
            }]
        }];
        me.callParent([cfg]);
    }
});
