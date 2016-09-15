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
 * ShowRedliningToolsPanelController
 *
 * This controller will be used to manage the redlining tools in the GIS
 * application. Actually the following actions/tools are supported:
 *  * Draw point
 *  * Draw line
 *  * Draw polygon
 *  * Draw post-it
 *  * Move object
 *  * Copy object
 *  * Modify object
 *  * Delete object
 *  * Style object (simple styling of points, lines and polygons. No images as
 *    point icon are supported at the moment).
 * The controller is based on the logic of BasiGX.view.container.Redlining
 * class, which was adapted to match the MVVC structure better.
 *
 * @class MoMo.client.view.button.ShowRedliningToolsPanelController
 */
Ext.define('MoMo.client.view.button.ShowRedliningToolsPanelController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.button.showredliningtoolspanel',

    /**
     * Placeholder for the redlining tools panel
     */
    btnPanel: null,

    /**
    *
    */
    onToggle: function(btn, pressed){
        var me = this;
        if (pressed){
            me.showRedliningToolsPanel();
        } else {
            me.hideRedliningToolsPanel();
            me.deactivateRedliningTools();
        }
    },

    /**
     * Creates a panel containing buttons for redlining tools.
     * The position of the panel will be computed dynamically (s. method
     * #computePosition below).
     * The `redlinePointStyle`, `redlineLineStringStyle` and
     * `redlinePolygonStyle` must be declared here by instanciating of the panel
     * as these will be uses as default values in the styler class (compare
     * {@link MoMo.client.view.window.RedliningStylerWindow})
     */
    createRedliningButtonsPanel: function() {

        var me = this;

        var parentBtn = me.getView().getEl();

        var viewModel = me.getView().getViewModel();

        var position = me.computePosition(parentBtn);

        var postitPictureUrl = Ext.Loader.getPath('MoMo.client') +
            '/../../../resources/img/blue-post-it.png';

        var btnPanel =
            Ext.create("MoMo.client.view.panel.RedliningToolsPanel", {
                style: {
                    'top': position.top,
                    'right': position.right
                },
                bodyStyle: {
                    background: 'transparent'
                },
                postitPictureUrl: postitPictureUrl,
                redlinePointStyle: new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: viewModel.get('defPointStyle.radius'),
                        fill: new ol.style.Fill({
                            color: viewModel.get('defPointStyle.fillColor')
                        }),
                        stroke: new ol.style.Stroke({
                            color: viewModel.get('defPointStyle.strokeColor'),
                            width: viewModel.get('defPointStyle.strokeWidth')
                        })
                    })
                }),
                redlineLineStringStyle: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: viewModel.get('defLineStringStyle.strokeColor'),
                        width: viewModel.get('defLineStringStyle.strokeWidth')
                    })
                }),
                redlinePolygonStyle: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: viewModel.get('defPolygonStyle.strokeColor'),
                        width: viewModel.get('defPolygonStyle.strokeWidth')
                    }),
                    fill: new ol.style.Fill({
                        color: viewModel.get('defPolygonStyle.fillColor')
                    })
                })
            }
        );

        return btnPanel;
    },

    /**
     * Shows a redlining tools panel on call button toggle.
     */
    showRedliningToolsPanel: function() {
        var me = this;
        if (!me.btnPanel) {
            me.btnPanel = me.createRedliningButtonsPanel();
            // map container
            var cont = Ext.ComponentQuery
                .query('viewport > container[region=center]')[0];
            cont.add(me.btnPanel);
        } else {
            me.btnPanel.show();
        }
    },

    /**
     * Computes position of the redlining tools panel depending on the
     * dimensions and position of the parent button and the height of the
     * application header if given.
     */
    computePosition: function(btn){
        var header = Ext.ComponentQuery.query('panel[region=north]')[0],
            hHeight = 0;

        if (header) {
            var hSplitter = header.splitter;
            hHeight = header.getHeight();
        }

        var top =
            btn.getClientRegion().top - hHeight - hSplitter.getHeight() + "px";
        var right = btn.getWidth()*2 + "px";

        return {
            top: top,
            right: right
        };
    },

    /**
     * Hides a redlining tools panel on call button toggle.
     */
    hideRedliningToolsPanel: function() {
        var me = this;
        if (me.btnPanel) {
            me.btnPanel.hide();
        }
    },

    /**
     * Deactivates possibly activated redlining tools if parent button was
     * untoggled and redlining tools panel was hidden.
     */
    deactivateRedliningTools: function (){
        var me = this;
        if (me.btnPanel) {
            var redlineBtns = me.btnPanel.query('button');
            Ext.each(redlineBtns, function(btn){
                if (btn.pressed) {
                    btn.toggle();
                }
            });
        }
    }
});
