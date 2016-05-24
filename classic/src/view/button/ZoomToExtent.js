/* Copyright (c) 2015 terrestris GmbH & Co. KG
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
 * ZoomToExtent Button
 *
 * Button used to zoom to Extent
 *
 * @class momo.view.button.ZoomToExtent
 */
Ext.define("momo.view.button.ZoomToExtent", {
    extend: "Ext.Button",
    xtype: 'momo-button-zoomtoextent',

    requires: [
        'momo.util.ApplicationContext',
        'BasiGX.util.Map',
        'Ext.app.ViewModel'
    ],

    /**
     *
     */
    viewModel: {
        data: {
            tooltip: 'Auf Gesamtansicht zoomen',
            text: null
        }
    },

    /**
     *
     */
    bind: {
        tooltip: '{tooltip}',
        text: '{text}'
    },

    /**
     * The OL3 map this button is bounded to
     */
    olMap: null,

    /**
     * The icons the button should use.
     */
    glyph: 'xf0b2@FontAwesome',

    /**
     * Center and zoom are required on instantiation.
     */
    config: {
        center: null,
        zoom: null,
        resolution: null,
        handler: function(){

            this.setConfigValues();

            var olMap = this.olMap;

            //fallback
            if (Ext.isEmpty(olMap)) {
                olMap = BasiGX.util.Map.getMapComponent();
            }

            var olView = olMap.getView(),
                targetCenter = this.getCenter(),
                targetZoom = this.getZoom(),
                pan = ol.animation.pan({
                    source: olView.getCenter()
                }),
                zoom = ol.animation.zoom({
                    resolution: olView.getResolution()
                });

            olMap.beforeRender(pan);
            olMap.beforeRender(zoom);

            olView.setCenter(targetCenter);
            olView.setZoom(targetZoom);
        }
    },

    /**
     *
     */
    setConfigValues: function(){

        var appCtxUtil = momo.util.ApplicationContext;
        var mapConfig = appCtxUtil.getMapConfig();

        if(mapConfig){
            if(!this.getCenter()){
                this.setCenter([mapConfig.center.x, mapConfig.center.y]);
            }
            if(!this.getZoom() && !this.getResolution()){
                this.setZoom(mapConfig.zoom);
            }
        }
    }
});
