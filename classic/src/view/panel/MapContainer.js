Ext.define("momo.view.panel.MapContainer",{
    extend: "BasiGX.view.panel.MapContainer",
    xtype: "momo-panel-mapcontainer",
    alias: "widget.momo-panel-mapcontainer",

    requires: [
        "momo.view.main.MainController",
        "momo.view.button.StepBack",
        "momo.view.button.StepForward"
    ],

    controller: 'component.map',

    viewModel: 'component.map',

    config: {
        mapComponentConfig: {
            xtype: 'momo-component-map'
        },
        overviewMapConfig: {
            xtype: 'gx_overviewmap',
            magnification: 10,
            width: 400,
            height: 150,
            padding: 5,
            cls: 'basigx-overview-map',
            hidden: true,
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.TileWMS({
                        url: 'http://ows.terrestris.de/osm/service?',
                        params: {
                            LAYERS: 'OSM-WMS',
                            TRANSPARENT: false,
                            VERSION: '1.1.1'
                        }
                    })
                })
            ]
        },
        // we don't need menu container (yet)
        menuConfig: null,
        // we already have our own legend panel in west region
        legendPanelConfig: null
    },

    listeners: {
        boxready: function(mapContainer){

            var me = this,
                mapComponent = mapContainer.down('momo-component-map'),
                map = mapComponent.getMap();

            // set member for map component
            me.mapPanel = mapComponent;

            map.on(
                'moveend',
                me.mapPanel.getController().setRouting,
                me.mapPanel.getController()
            );
        }
    },

    /**
    *
    */
    addLegendPanel: function() {
        var me = this;

        var existingLegendTree =
            Ext.ComponentQuery.query('momo-panel-legendtree');

        // create new legend tree container only if this wasn't provided through
        // initial beans as module
        if (Ext.isEmpty(existingLegendTree)) {
            var legendTreeConfig = me.getLegendPanelConfig();
            // set the store if not configured
            if(!legendTreeConfig.store && me.mapPanel) {
                var treeStore = Ext.create('GeoExt.data.store.LayersTree', {
                    layerGroup: me.mapPanel.getMap().getLayerGroup(),
                    showLayerGroupNode: false
                });

                // set the store
                legendTreeConfig.store = treeStore;
            }

            // add the legend panel
            me.add(legendTreeConfig);
        }
    },

    /**
     *
     */
    buildToolbarItems: function() {

        var me = this,
            toolbarItems,
            olMap = me.mapPanel.getMap();

        toolbarItems = [{
            xtype: 'basigx-button-zoomin',
            scale: 'small',
            olMap: olMap,
            ui: 'default'
        }, {
            xtype: 'basigx-button-zoomout',
            scale: 'small',
            olMap: olMap,
            ui: 'default'
        }, {
            xtype: 'basigx-button-zoomtoextent',
            scale: 'small',
            ui: 'default',
            olMap: olMap,
            center: [11532818, 5960865],
            zoom: 5
        }, {
            xtype: 'momo-button-stepback',
            scale: 'small',
            ui: 'default'
        }, {
            xtype: 'momo-button-stepforward',
            scale: 'small',
            ui: 'default'
        }];

        return toolbarItems;
    }
});
