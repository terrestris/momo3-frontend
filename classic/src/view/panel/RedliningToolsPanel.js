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

    width: 250,

    bodyStyle: {
        background: 'transparent'
    },

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
            // do not overwrite style for (copied) postits
            if (feature.get('isPostit')) {
                return feature.getStyle();
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
            ui: 'momo-tools',
            scale: 'small',
            style: {
                margin: '0 5px 5px 5px'
            }
        },
        items: [{
            bind: {
                tooltip: '{drawPointsBtnText}'
            },
            name: 'drawPointsBtn',
            glyph: 'xf100@Flaticon',
            listeners: {
                toggle: 'onDrawPointsBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{drawLinesBtnText}'
            },
            name: 'drawLinesBtn',
            glyph: 'xf104@Flaticon',
            listeners: {
                toggle: 'onDrawLinesBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{drawPolygonsBtnText}'
            },
            name: 'drawPolygonsBtn',
            glyph: 'xf107@Flaticon',
            listeners: {
                toggle: 'onDrawPolygonsBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{drawCirclesBtnText}'
            },
            name: 'drawCirclesBtn',
            glyph: 'xf103@Flaticon',
            listeners: {
                toggle: 'onDrawCirclesBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{drawRectanglesBtnText}'
            },
            name: 'drawRectanglesBtn',
            glyph: 'xf109@Flaticon',
            listeners: {
                toggle: 'onDrawRectanlgesBtnToggle'
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
            ui: 'momo-tools',
            scale: 'small',
            style: {
                margin: '0 5px 5px 5px'
            }
        },
        items: [{
            bind: {
                tooltip: '{drawTextBtnText}'
            },
            name: 'textBtn',
            glyph: 'xf10d@Flaticon',
            listeners: {
                toggle: 'onTextBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{drawPostItBtnText}'
            },
            name: 'postitBtn',
            glyph: 'xf10a@Flaticon',
            listeners: {
                toggle: 'onPostitBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{copyObjectBtnText}'
            },
            name: 'copyObjectBtn',
            glyph: 'xf110@Flaticon',
            listeners: {
                toggle: 'onCopyBtnToggle'
            }
        }, {
            bind: {
                tooltip: '{moveObjectBtnText}'
            },
            glyph: 'xf108@Flaticon',
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
            ui: 'momo-tools',
            scale: 'small',
            style: {
                margin: '0 5px 5px 5px'
            }
        },
        items: [{
            bind: {
                tooltip: '{deleteObjectBtnText}'
            },
            name: 'deleteObjectBtn',
            glyph: 'xf12d@FontAwesome', //fa fa-eraser
            listeners: {
                toggle: 'onDeleteBtnToggle'
            }
        }, {
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
     * @param {MoMo.client.view.panel.RedliningToolsPanel} container
     *     The Redlining container.
     * @param {Object} state The current redlining state.
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
                'add',
                me.fireRedliningChanged,
                me
            );
            me.redliningVectorLayer = new ol.layer.Vector({
                name: 'redliningVectorLayer',
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
    fireRedliningChanged: function(evt){
        var me = this;
        var feat = evt.element;
        me.adjustFeatureStyle(feat);
    },

    /**
     * Sets currently defined style to the new added features.
     * @param {ol.Feature} feature drawn feature
     */
    adjustFeatureStyle: function(feature) {
        var me = this;
        var controller = me.getController();

        if (controller.stateChangeActive) {
            return;
        }

        if (feature) {
            var geometry = feature.getGeometry();

            if (geometry instanceof ol.geom.Point) {
                // do not overwrite style for (copied) postits
                if (feature.get('isPostit')) {
                    return;
                }
                feature.setStyle(me.getRedlinePointStyle());
            } else if (geometry instanceof ol.geom.LineString) {
                feature.setStyle(me.getRedlineLineStringStyle());
            } else {
                feature.setStyle(me.getRedlinePolygonStyle());
            }
        }
    }
});
