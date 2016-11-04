Ext.define("MoMo.client.view.grid.GazetteerGrid",{
    extend: "Ext.grid.Panel",
    xtype: "momo-grid-gazetteergrid",

    requires: [
               'BasiGX.store.GazetteerSearch',
               'BasiGX.util.Map',
               'BasiGX.util.Layer',
               'BasiGX.util.Animate'
    ],

    store: {
        type: 'basigx-gazetteersearch'
    },

    viewModel: {
        data: {
            title: 'Gazetteer Suche',
            hideToolTooltip: 'Gazetteer verbergen'
        }
    },

    bind: {
        title: '{title}'
    },

    collapsible: true,
    titleCollapse: true,

    tools:[{
        type: 'minimize',
        bind: {
            tooltip: '{hideToolTooltip}'
        },
        handler: function(e, target, gridheader){
            var grid = gridheader.up('grid');
            grid.getEl().slideOut('t', {
                duration: 250,
                callback: function(){
                    grid.hide();
                }
            });
        }
    }],


    maxHeight: 250,

    config: {
        layer: null,

        map: null
    },

    columns: {
        items: [{
            text: '',
            xtype: 'templatecolumn',
            width: 40,
            tpl: '<img src="{icon}" height="16" width="16">'
        }, {
            text: 'Name',
            xtype: 'templatecolumn',
            tpl: '<div data-qtip="{display_name}">'+
                        '{display_name}'+
                '</div>',
            flex: 2
        }, {
            text: 'Class',
            dataIndex: 'class',
            flex: 1
        }, {
            text: 'Type',
            dataIndex: 'type',
            flex: 1
        }]
    },

    initComponent: function () {
        var me = this;

        me.callParent(arguments);

        // add listeners
        me.on('boxready', me.onBoxReady, me);
        me.on('itemmouseenter', me.onItemMouseEnter, me);
        me.on('itemmouseleave', me.onItemMouseLeave, me);
        me.on('itemclick', me.onItemClick, me);

        // unregister listeners on grid hide
        me.on('hide', me.unregisterListeners, me);
    },

    /**
     *
     */
    onBoxReady: function(){
        var me = this;
        if(!me.getMap()){
            var map = BasiGX.util.Map.getMapComponent().getMap();
            me.setMap(map);
        }
        if(!me.getLayer()){
            var layer = new ol.layer.Vector({
                source: new ol.source.Vector()
            });
            var displayInLayerSwitcherKey =
                BasiGX.util.Layer.KEY_DISPLAY_IN_LAYERSWITCHER;
            layer.set(displayInLayerSwitcherKey, false);
            me.setLayer(layer);
            me.getMap().addLayer(layer);
        }
    },

    /**
     *
     */
    onItemMouseEnter: function(grid, record){
        var me = this;
        var layer = me.getLayer();
        var projection = me.getMap().getView().getProjection().getCode();
        var format = new ol.format.WKT();
        var wkt = record.get('geotext');
        var feature = format.readFeature(wkt);
        feature.getGeometry().transform('EPSG:4326', projection);
        layer.getSource().addFeature(feature);
    },

    /**
     *
     */
    onItemMouseLeave: function(){
        var me = this;
        var layer = me.getLayer();
        layer.getSource().clear();
    },

    /**
     *
     */
    onItemClick: function(grid, record){
        var me = this;
        var map = me.getMap();
        var olView = map.getView();
        var projection = olView.getProjection().getCode();
        var format = new ol.format.WKT();
        var wkt = record.get('geotext');
        var feature = format.readFeature(wkt);
        var geom = feature.getGeometry().transform('EPSG:4326', projection);
        olView.fit(geom, map.getSize());
    },

    /**
     *
     */
    unregisterListeners: function() {
        var me = this;

        me.un('boxready', me.onBoxReady, me);
        me.un('itemmouseenter', me.onItemMouseEnter, me);
        me.un('itemmouseleave', me.onItemMouseLeave, me);
        me.un('itemclick', me.onItemClick, me);
    }


});