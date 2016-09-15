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
 * Panel containing the redlining tools for the temporary drawing in the
 * client.
 *
 * @class MoMo.client.view.panel.RedliningToolsPanel
 */
Ext.define("MoMo.client.view.panel.RedliningToolsPanel", {
    extend: "Ext.panel.Panel",
    xtype: 'momo-panel-redlining',

    requires: [
        'Ext.button.Button'
    ],

    viewModel: 'panel.redliningtoolspanel',

    controller: 'panel.redliningtoolspanel',

    width: 200,

    config: {
        postitPictureUrl: null,
        redlinePointStyle: null,
        redlineLineStringStyle: null,
        redlinePolygonStyle: null,
        redlineStyleFunction: function(feature) {
            var me = Ext.ComponentQuery.query('momo-panel-redlining')[0];
            if (!(feature instanceof ol.Feature)) {
                return;
            }
            var geometry = feature.getGeometry();
            if (geometry instanceof ol.geom.Point) {
                return me.getRedlinePointStyle();
            } else if (geometry instanceof ol.geom.LineString) {
                return me.getRedlineLineStringStyle();
            } else {
                return me.getRedlinePolygonStyle();
            }
        }
    },

    map: null,

    redliningVectorLayer: null,

    redlineFeatures: null,

    stateChangeActive: false,

    layout: {
        type: 'vbox',
        align: 'right'
    },

    items: [{
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'end'
        },
        defaults: {
            xtype: 'button',
            toggleGroup: 'draw',
            style: {
                margin: '0 5px 5px 5px'
            }
        },
        items: [{
            bind: {
                tooltip: '{drawPointsBtnText}'
            },
            name: 'drawPointsBtn',
            glyph: 'xf1db@FontAwesome', //fa fa-circle-thin
            listeners: {
                toggle: 'onDrawPointsBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{drawLinesBtnText}'
            },
            name: 'drawLinesBtn',
            glyph: 'xf0c9@FontAwesome', //fa fa-bars
            listeners: {
                toggle: 'onDrawLinesBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{drawPolygonsBtnText}'
            },
            name: 'drawPolygonsBtn',
            glyph: 'xf096@FontAwesome', //fa fa-square-o
            listeners: {
                toggle: 'onDrawPolygonsBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{drawPostItBtnText}'
            },
            name: 'postitBtn',
            glyph: 'xf24a@FontAwesome', //fa fa-sticky-note-o
            listeners: {
                toggle: 'onPostitBtnToggle'
            }
        }]
    }, {
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'end'
        },
        defaults: {
            xtype: 'button',
            toggleGroup: 'draw',
            style: {
                margin: '0 5px 5px 5px'
            }
        },
        items: [{
            bind: {
                tooltip: '{copyObjectBtnText}'
            },
            name: 'copyObjectBtn',
            glyph: 'xf24d@FontAwesome', //fa fa-clone
            listeners: {
                toggle: 'onCopyBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{moveObjectBtnText}'
            },
            glyph: 'xf047@FontAwesome', //fa fa-arrows
            name: 'moveObjectBtn',
            listeners: {
                toggle: 'onMoveBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{modifyObjectBtnText}'
            },
            name: 'modifyObjectBtn',
            glyph: 'xf044@FontAwesome', //fa fa-pencil-square-o
            listeners: {
                toggle: 'onModifyBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{deleteObjectBtnText}'
            },
            name: 'deleteObjectBtn',
            glyph: 'xf12d@FontAwesome', //fa fa-eraser
            listeners: {
                toggle: 'onDeleteBtnToggle'
            }
        }]
    }, {
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'end'
        },
        items: [{
            xtype: 'button',
            toggleGroup: 'draw',
            style: {
                margin: '0 5px 5px 5px'
            },
            bind: {
                tooltip: '{openStyleBtnText}'
            },
            glyph: 'xf1fc@FontAwesome', //fa fa-paint-brush
            name: 'openStyleBtn',
            listeners: {
                toggle: 'onStylerBtnToggle'
            }
        }]
    }],

    /**
     * @event redliningchanged
     * An event that fires everytime a feature is added, deleted, moved or
     * modified.
     * @param {BasiGX.view.container.Redlining} container
     *     The Redlining container.
     * @param {Object} state The current redlining state.
     * @param {Boolean} stateChangeActive While setState is runnning this will
     *     be true otherwise false.
     */

    /**
     * Initializes this component
     */
    initComponent: function() {
        var me = this;
        var displayInLayerSwitcherKey = BasiGX.util.Layer.
            KEY_DISPLAY_IN_LAYERSWITCHER;

        //set map
        me.map = BasiGX.util.Map.getMapComponent().getMap();

        if (!me.redliningVectorLayer) {
            me.redlineFeatures = new ol.Collection();
            me.redlineFeatures.on(
                'propertychange',
                me.fireRedliningChanged,
                me
            );
            me.redliningVectorLayer = new ol.layer.Vector({
                source: new ol.source.Vector({features: me.redlineFeatures}),
                style: me.getRedlineStyleFunction()
            });
            me.redliningVectorLayer.set(displayInLayerSwitcherKey, false);
            me.map.addLayer(me.redliningVectorLayer);
        }

        me.callParent(arguments);
    },

    /**
     *
     */
    fireRedliningChanged: function(){
        var me = this;
        me.fireEvent('redliningchanged', me, me.getState(),
                me.stateChangeActive);
    },

    /**
     * Returns the current state of the redlining, containing all features
     * and the configured styles
     */
    getState: function() {
        var me = this;
        var features = [];
        me.redlineFeatures.forEach(function(feature) {
            features.push(feature.clone());
        });

        var state = {
            features: features,
            pointStyle: me.getRedlinePointStyle(),
            lineStyle: me.getRedlineLineStringStyle(),
            polygonStyle: me.getRedlinePolygonStyle(),
            styleFunction: me.getRedlineStyleFunction()
        };

        return state;
    },

    /**
     * Sets the state of the redlining, containing drawn features
     * and the configured styles
     */
    setState: function(state) {
        var me = this;

        me.stateChangeActive = true;

        var styler = Ext.ComponentQuery.query(
            'basigx-container-redlinestyler')[0];

        if (state.features) {
            me.redliningVectorLayer.getSource().clear();
            me.redliningVectorLayer.getSource().addFeatures(state.features);
        }

        if (state.pointStyle) {
            me.setRedlinePointStyle(state.pointStyle);
        }

        if (state.lineStyle) {
            me.setRedlineLineStringStyle(state.lineStyle);
        }

        if (state.polygonStyle) {
            me.setRedlinePolygonStyle(state.polygonStyle);
        }

        if (styler) {
            styler.setState(state);
        }

        if (state.styleFunction) {
            me.setRedlineStyleFunction(state.styleFunction);
        }

        // reapply the styleFn on the layer so that ol3 starts redrawing
        // with new styles
        me.redliningVectorLayer.setStyle(me.redliningVectorLayer.getStyle());

        me.stateChangeActive = false;
    }
});
