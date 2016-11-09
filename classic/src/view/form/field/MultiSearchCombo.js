Ext.define("MoMo.client.view.form.field.MultiSearchCombo", {
    extend: 'Ext.form.field.ComboBox',
    xtype: "momo-combo-multisearch",

    requires: [
        "BasiGX.util.Map",
        "MoMo.client.view.window.MultiSearchSettingsWindow",
        "MoMo.client.view.grid.ObjectSearchGrid",
        "MoMo.client.view.grid.GazetteerGrid"
    ],

    store: [],

    searchContainer: null,

    config: {

        gazetteerSearch: true,

        objectSearch: true,

        limitToBBox: true,

        allSearchLayers: [],

        configuredSearchLayers: [],

        searchLayerBlackList: [
            "hoverVectorLayer",
            "OSM-WMS GRAY",
            // following is a grouplayer. If it should be searchable,
            // sublayers need to be used
            "exploitable_groundwater"
//            "01_kharaa_subbasins_32648",
//            "01_kharaa_river_basin_32648",
//            "02_surface_water_bodies_32648"
        ]
    },

    viewModel: {
        data: {
            /*i18n*/
            emptyText: ""
            /*i18n*/
        }
    },

    bind: {
        emptyText: '{emptyText}'
    },

    triggerCls: 'default-trigger',

    triggers: {
        refresh: {
            cls: 'multisearch-refresh-trigger',
            handler: function(){
                this.refreshSearchResults();
            }
        },
        settings: {
            cls: 'multisearch-settings-trigger',
            handler: function(){
                this.showSettingsWindow();
            }
        }
    },

    initComponent: function(){
        var me = this;

        me.callParent(arguments);

        me.setHideTrigger(false);

        // get all layers from the map except the blacklisted ones
        var map = BasiGX.util.Map.getMapComponent().getMap();
        var allLayers = BasiGX.util.Layer.getAllLayers(map);
        var blackList = me.getSearchLayerBlackList();

        Ext.each(allLayers, function(l) {
            if (l instanceof ol.layer.Tile && !Ext.Array.contains(blackList,
                    l.get('name'))) {
                me.allSearchLayers.push(l);
            }
        });

        // set search layers to all above layers if not configured different
        if (me.getConfiguredSearchLayers().length == 0 ) {
            Ext.each(me.getAllSearchLayers(), function(l) {
                me.configuredSearchLayers.push(l)
            });
        }

        me.on('boxready', me.onBoxReady, me);
        me.on('change', me.onComboValueChange, me);

    },

    onBoxReady: function(){
        var me = this;
        me.nav = Ext.create('Ext.util.KeyNav', me.el, {
            esc: me.clearValue,
            scope: me
        });
    },

    onComboValueChange: function(combo, newValue){
        var me = this;

        if(newValue){
            // create the multi search panel
            me.showResults();

            // start the gazetteer search
            me.doGazetteerSearch(newValue, me.getLimitToBBox);

            // start the object search
            me.doObjectSearch(newValue);

        } else {
            var objectSearchGrid =
                Ext.ComponentQuery.query('momo-grid-objectsearchgrid')[0];
            var searchLayer = objectSearchGrid.searchResultVectorLayer;

            if(searchLayer) {
                searchLayer.getSource().clear();
            }

            if(me.searchContainer) {
                me.searchContainer.getEl().slideOut('t', {
                    duration: 250,
                    callback: function() {
                        me.searchContainer.hide();
                    },
                    scope: me.searchContainer
                });
            }

        }
    },


    doObjectSearch: function(value){

        var me = this;

        var objectSearchGrid =
            Ext.ComponentQuery.query('momo-grid-objectsearchgrid')[0];

        if (objectSearchGrid) {
            if (me.getObjectSearch()) {
                objectSearchGrid.describeFeatureTypes(value);
                objectSearchGrid.expand();
            } else {
                objectSearchGrid.getStore().removeAll();
            }
        } else {
            Ext.log.error("ObjectSearchGrid not found");
        }

    },

    doGazetteerSearch: function(value, limitToBBox){

        var me = this;

        var gazetteerGrid =
            Ext.ComponentQuery.query('momo-grid-gazetteergrid')[0];

        if (gazetteerGrid) {
            if (me.getGazetteerSearch()) {
                gazetteerGrid.doGazetteerSearch(value, limitToBBox);
                gazetteerGrid.expand();
            } else {
                gazetteerGrid.getStore().removeAll();
            }
        } else {
            Ext.log.error("ObjectSearchGrid not found");
        }

    },

    showResults: function() {
        var me = this;
        var parentItem;
        var position;
        var searchContainer;

        if (!me.searchContainer) {

            parentItem = me.getEl();

            position = {
                top: parentItem.getClientRegion().bottom + "px",
                left: parentItem.getClientRegion().left + "px",
                width: parentItem.getWidth() + "px"
            };

            searchContainer = Ext.create(Ext.container.Container, {
                renderTo: Ext.getBody(),

                items: [
                    {
                        xtype: 'momo-grid-gazetteergrid'
                    },{
                        xtype: 'momo-grid-objectsearchgrid'
                    }
                ],

                width: position.width,

                style: {
                    'top': position.top,
                    'left': position.left
                }

            });

            me.searchContainer = searchContainer;
        }

        me.searchContainer.show();
    },

    refreshSearchResults: function(){
        var me = this;

        var value = me.getValue();

        if (value) {
            me.doGazetteerSearch(value);
            me.doObjectSearch(value);
        } else {
            Ext.log.error("No value to search for");
        }
    },

    showSettingsWindow: function(){
        var me = this;

        var win = Ext.ComponentQuery.query('multisearch-settings-window')[0];

        if (win) {
            if (win.hidden) {
                win.show();
            } else {
                BasiGX.util.Animate.shake(win);
            }
        } else {
            win = Ext.create('MoMo.client.view.window.MultiSearchSettingsWindow');
        }

    }

});
