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
 * ScaleCombo
 *
 * Lets the user control the maps scale with a combobox
 *
 * @class MoMo.client.view.combo.ScaleCombo
 */
Ext.define("MoMo.client.view.combo.ScaleCombo", {
    xtype: "momo-combo-scale",
    extend: 'BasiGX.view.combo.ScaleCombo',
    requires: [
    ],

    /**
     *
     */
    width: 150,

    config: {
        /**
         * We don't use here the predefined set of scales and resolutions as
         * it father class `BasiGX.view.combo.ScaleCombo` does. Instead of this
         * the "real" map resolutions will be used for the scale store.
         * Disadvantage: the map can possibly get "ugly" odd numbers as scales
         * if it e.g. based on the OSM resolution set.
         */
        scales: []
    },

    /**
     *
     */
    initComponent: function(){
        var me = this;

        if (!me.map) {
            me.map = BasiGX.util.Map.getMapComponent().getMap();
        }

        var resolutions = me.map.getView().getResolutions();

        var scaleData = me.buildScaleData(resolutions);

        var scaleStore = Ext.create('Ext.data.Store', {
            sorters: [],
            data: []
        });

        me.store = scaleStore;

        me.callParent([arguments]);

        me.store.loadData(scaleData);
        me.store.sort('resolution', 'ASC');

        // set the correct default value
        me.setValue(me.map.getView().getResolution());
    },

    /**
     *
     */
    buildScaleData: function(resolutions){
        var me = this,
            scaleData = [];

        Ext.each(resolutions, function(res) {
            scaleData.push({
                scale: '1:' + Math.round(
                    me.getCurrentScale(res)).toLocaleString(),
                resolution: res
            });
        });
        return scaleData;
    }
});
