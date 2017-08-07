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
 * Search Field
 *
 * Used to search in the glorious dataset of OSM combined with a WFS search
 * searching through configurable layers. Extends the
 * `BasiGX.view.form.field.MultiSearchCombo` class.
 *
 * @class MoMo.client.view.form.field.MultiSearchCombo
 */
Ext.define("MoMo.client.view.form.field.MultiSearchCombo", {
    extend: 'BasiGX.view.form.field.MultiSearchCombo',
    xtype: "momo-form-field-multisearch",


    viewModel: {
        data: {
            /*i18n*/
            emptyText: "",
            settingsWindowTitle: ""
            /*i18n*/
        }
    },

    config: {

        gazetteerGrid: "momo-grid-multisearchgazetteergrid",

        wfsSearchGrid: "momo-grid-multisearchwfssearchgrid",

        searchSettings: "momo-container-multisearchsettings",

        wfsServerUrl:"/momo/geoserver.action",

        wfsPrefix: "momo:",

        wfsDataProjection: 'EPSG:32648',

        wfsFeatureProjection: 'EPSG:3857',

        searchLayerBlackList: [
            "hoverVectorLayer",
            "OSM-WMS GRAY",
            // following is a grouplayer. If it should be searchable,
            // sublayers need to be used
            "exploitable_groundwater"
        ]
    },

    /**
     * override of basdigx class to filter out raster layers from search
     */
    initComponent: function(){
        var me = this;

        me.callParent(arguments);

        // we need to clean up the default behaviour of the basigx component
        // to avoid using of raster layers
        me.setAllSearchLayers([]);
        me.setConfiguredSearchLayers([]);

        me.setHideTrigger(false);

        // get all layers from the map except the blacklisted ones
        var map = BasiGX.util.Map.getMapComponent().getMap();
        var allLayers = BasiGX.util.Layer.getAllLayers(map);
        var blackList = me.getSearchLayerBlackList();

        Ext.each(allLayers, function(l) {
            if (l instanceof ol.layer.Tile && !Ext.Array.contains(blackList,
                    l.get('name')) && l.get('dataType') !== "Raster") {
                me.allSearchLayers.push(l);
            }
        });

        // set search layers to all above layers if not configured different
        if (me.getConfiguredSearchLayers().length === 0 ) {
            Ext.each(me.getAllSearchLayers(), function(l) {
                me.configuredSearchLayers.push(l);
            });
        }

        me.on('boxready', me.onBoxReady, me);
        me.on('change', me.onComboValueChange, me);
        me.on('afterrender', function() {
            me.el.down('.default-trigger').on('click', function() {
                if (me.searchContainer.isHidden()) {
                    me.searchContainer.show();
                } else {
                    me.searchContainer.hide();
                }
            });
        });
    },

    showResults: function() {
        this.callParent(arguments);
        if (!this.showHideTriggerListenersSet) {
            this.showHideTriggerListenersSet = true;
            var me = this;
            var elm = me.el.down('.default-trigger');
            me.searchContainer.on('show', function() {
                elm.toggleCls('x-tool-collapse-top');
                elm.toggleCls('x-form-trigger-default');
            });
            me.searchContainer.on('hide', function() {
                elm.toggleCls('x-tool-collapse-top');
                elm.toggleCls('x-form-trigger-default');
            });
        }
    }

});
