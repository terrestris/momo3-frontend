Ext.define('MoMo.client.view.component.MapController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.component.map',

    /**
     *
     */
    statics: {
        FOLDER_CLASS_NAME: 'de.terrestris.momo.model.tree.LayerTreeFolder',
        LEAF_CLASS_NAME: 'de.terrestris.momo.model.tree.LayerTreeLeaf'
    },

    /**
     *
     */
    setMap: function() {
        var me = this;
        var view = me.getView();

        if (!view.getMap()) {
            var olMap = me.createOlMap();
            view.setMap(olMap);
        }
        olMap.on('moveend', me.setRouting, me);
    },

    /**
     *
     */
    createOlMapControls: function(mapControls) {
        var mapCtrls = [];

        // iterate over all control configurations
        Ext.each(mapControls, function(mapControl) {
            // create the ol3 control
            var mapCtrl = new ol.control[mapControl.mapControlName](
                    mapControl.mapControlProperties);
            mapCtrls.push(mapCtrl);
        });

        return mapCtrls;
    },

    /**
     * load the default interactions only, specific interactions
     * should be loaded and added by single modules.
     */
    createOlMap: function() {
        var me = this;
        var appCtxUtil = MoMo.client.util.ApplicationContext;
        var mapConfig = appCtxUtil.getMapConfig();
        var mapControls = appCtxUtil.getMapControls();
        var map;

        if (!mapConfig) {
            Ext.Logger.error('No mapConfig object found!');
            return false;
        }

        map = new ol.Map({
            controls: me.createOlMapControls(mapControls),
            logo: false,
            renderer: me.createOlMapRenderer(),
            view: me.createOlMapView(mapConfig)
        });

        var layerGroup = me.createOlLayers();
        map.setLayerGroup(layerGroup);

        return map;
    },

    /**
     * Returns the map renderer to use.
     */
    createOlMapRenderer: function() {
        return 'canvas';
    },

    /**
     *
     */
    createOlMapView: function(mapConfig) {
        var me = this;
        var olMapView;

        olMapView = new ol.View({
            center: [
                mapConfig.center.x,
                mapConfig.center.y
            ],
            zoom: mapConfig.zoom || 2,
            maxResolution: mapConfig.maxResolution,
            minResolution: mapConfig.minResolution,
            extent: [
                mapConfig.extent.lowerLeft.x,
                mapConfig.extent.lowerLeft.y,
                mapConfig.extent.upperRight.x,
                mapConfig.extent.upperRight.y
            ],
            projection: me.getProjectionString(),
            resolutions: mapConfig.resolutions,
            rotation: mapConfig.rotation || 0
        });

        return olMapView;
    },

    /**
     *
     */
    createOlLayers: function() {
        var me = this;
        var appCtxUtil = MoMo.client.util.ApplicationContext;
        var appCtx = appCtxUtil.getApplicationContext();
        var mapLayers = appCtxUtil.getValue('mapLayers');
        var layerTreeRootNode = appCtx.layerTree;

        var layerTreeLayers = me.createTreeNodeOlLayer(
                layerTreeRootNode,
                mapLayers
            );

        return layerTreeLayers;
    },

    /**
     *
     * Creates an OL layer "tree" hierarchy (with ol.layer.Group as folders)
     * based on the given tree structure coming from the SHOGun2/MoMo
     * backend. In case of folders, this function will be called recursively
     * with the children of a folder.
     *
     * @param {Object} layerTreeNode A node of the layerTree that is attached
     * to the appContext. This information is based on the TreeNode Java model
     * and represents a Ext.data.NodeInterface
     *
     * @param {Array} mapLayers A flat array of the layers that are available in
     * the given application. Necessary to find complete layer information as
     * they are referenced by their IDs in the layerTreeNodes.
     *
     * @return {Object} An instance of ol.layer.Group in case of folders. An
     * instance of ol.layer.Layer otherwise.
     *
     */
    createTreeNodeOlLayer: function(layerTreeNode, mapLayers) {
        var me = this;
        var nodeClass = layerTreeNode['@class'];
        var statics = me.statics();
        var olLayer;

        if (nodeClass === statics.FOLDER_CLASS_NAME) {
            // handle folders/ol-layergroups

            // children of the folder/group
            var layers = [];

            // reverse() as ol uses painters algorithm...
            Ext.each(layerTreeNode.children.reverse(), function(childNode) {
                // recursive call
                var childNodeOlLayer = me.createTreeNodeOlLayer(
                        childNode,
                        mapLayers
                    );

                if (childNodeOlLayer instanceof ol.layer.Base) {
                    layers.push(childNodeOlLayer);
                } else {
                    Ext.Logger.warn('Could not build a valid instance of ' +
                            ' "ol.layer.Base"');
                }
            });

            olLayer = new ol.layer.Group({
                layers: layers,
                name: layerTreeNode.text,
                visible: layerTreeNode.checked,
                // set expanded here even though GeoExt does not handle it.
                // 'MoMo.client.model.LayerTreeNode' as an extension
                // of 'GeoExt.data.model.LayerTreeNode' will care about this!
                expanded: layerTreeNode.expanded
            });
        } else if (nodeClass === statics.LEAF_CLASS_NAME) {
            // handle leafs/ol-layers

            // fetch full layer info from the mapLayer array
            var mapLayer = Ext.Array.findBy(mapLayers, function(mL) {
                return mL.id === layerTreeNode.layer.id;
            });

            if (mapLayer) {
                // currently we dont get any type info from the backend
                olLayer = me.createOlLayer(mapLayer, layerTreeNode);
            } else {
                Ext.Logger.warn('Could not find a layer in the mapLayer array' +
                        ' that is referenced in a tree node by its id.');
            }

        } else {
            Ext.Logger.error('Unknown class information ' +
                    'for layertree node!');
            return;
        }

        return olLayer;
    },

    /**
     *
     */
    createOlLayer: function(mapLayer, layerTreeNode) {
        var me = this;
        var mapLayerAppearance = mapLayer.appearance;

        // currently we dont get any type info from the backend
        // TODO support more than just 'Tile'
        var olLayer = new ol.layer['Tile']({
            name: mapLayer.name || 'UNNAMED LAYER',
            routingId: mapLayer.id,
            shogunId: mapLayer.id,
            hoverable: mapLayerAppearance.hoverable || mapLayer.hoverable ||
                false,
            hoverTemplate: mapLayerAppearance.hoverTemplate,
            chartable: mapLayer.chartable || false,
            minResolution: mapLayerAppearance.minResolution || undefined,
            maxResolution: mapLayerAppearance.maxResolution || undefined,
            opacity: mapLayerAppearance.opacity,
            visible: layerTreeNode.checked,
            metadataIdentifier: mapLayer.metadataIdentifier,
            legendUrl: mapLayer.legendUrl || me.generateLegendUrl(mapLayer),
            source: me.createOlLayerSource(mapLayer),
            dataType: mapLayer.dataType
        });

        olLayer.set(BasiGX.util.Layer.KEY_DISPLAY_IN_LAYERSWITCHER, true);

        return olLayer;
    },

    /**
     *
     */
    generateLegendUrl: function(mapLayer) {
        var layer = mapLayer.source.layerNames;
        var url = mapLayer.source.url + Ext.urlAppend(
            '?SERVICE=WMS&VERSION=1.1.1&' +
            'REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&' +
            'LAYER=' + layer
        );
        return url;
    },

    /**
     * based on ol.source.TileWMS
     */
    createOlLayerSource: function(mapLayer) {
        var me = this;
        var mapLayerAppearance = mapLayer.appearance;
        var mapLayerSource = mapLayer.source;
        var olLayerSource;

        olLayerSource = new ol.source[mapLayerSource.type]({
            attributions: me.createOlLayerAttribution(
                    mapLayerAppearance.attribution),
            params: {
                'LAYERS': mapLayerSource.layerNames,
                'VERSION': mapLayerSource.version,
                'TILED': true,
                'TRANSPARENT': mapLayerSource.transparent || true
            },
            crossOrigin: mapLayerSource.crossOrigin || null,
            gutter: mapLayerSource.gutter || 0,
            logo: {
                href: mapLayerSource.logoHref || "",
                src: mapLayerSource.logoSrc || ""
            },
            tileGrid: me.createOlLayerTileGrid(
                    mapLayerSource.tileGrid),
            url: mapLayerSource.url
        });

        return olLayerSource;
    },

    /**
     *
     */
    createOlLayerTileGrid: function(tileGridConfig) {
        var olLayerTileGrid;
        var tileGridOrigin;
        var tileGridExtent;

        // check for required options
        if (!tileGridConfig.type || !tileGridConfig.tileGridResolutions) {
            Ext.Logger.warn('Could not create the ol.tilegrid for the ' +
                    'current layer. Missing properties type and/or ' +
                    'tileGridResolutions');
            return false;
        }

        if (tileGridConfig.tileGridOrigin) {
            tileGridOrigin = [
                tileGridConfig.tileGridOrigin.x,
                tileGridConfig.tileGridOrigin.y
            ];
        }

        if (tileGridConfig.tileGridExtent) {
            tileGridExtent = [
                tileGridConfig.tileGridExtent.lowerLeft.x,
                tileGridConfig.tileGridExtent.lowerLeft.y,
                tileGridConfig.tileGridExtent.upperRight.x,
                tileGridConfig.tileGridExtent.upperRight.y
            ];
        }

        olLayerTileGrid = new ol.tilegrid[tileGridConfig.type]({
            extent: tileGridExtent,
            origin: tileGridOrigin,
            resolutions: tileGridConfig.tileGridResolutions,
            tileSize: tileGridConfig.tileSize || 256
        });

        return olLayerTileGrid;
    },

    /**
     *
     */
    createOlLayerAttribution: function(attributionConfig) {
        var olLayerAttributions = [];

        var olLayerAttribution = new ol.Attribution({
            html: attributionConfig
        });

        olLayerAttributions.push(olLayerAttribution);

        return olLayerAttributions;
    },

    /**
     *
     */
    getProjectionString: function() {
        var appCtxUtil = MoMo.client.util.ApplicationContext;
        var mapConfig = appCtxUtil.getMapConfig();
        var mapConfigProjection = mapConfig.projection;

        if (!mapConfigProjection) {
            Ext.Logger.error('No map projection found in mapConfig!');
        }

        if (mapConfigProjection.indexOf('EPSG') > -1) {
            return mapConfigProjection;
        } else {
            return Ext.String.format('EPSG:{0}', mapConfigProjection);
        }
    },

    setRouting: function(){
        var mapComponentXType = 'momo-component-map';
        var viewModel = this.getView().getViewModel();
        var hash = BasiGX.util.Application.getRoute(mapComponentXType);

        // If the map moved without hitting a navigationhistorybutton,
        // the history starts new.
        if(!viewModel.get('clickedNav')){
            viewModel.set('currentMapStateIndex', null);
        }
        // Store new mapState unless the stepForward button was clicked.
        if(viewModel.get('clickedNav') !== 'stepForward'){
            this.storeRoute(hash);
        }
        // After storing the route reset the clickedNav value.
        viewModel.set('clickedNav', null);
        return hash;
    },

    storeRoute: function(hash){
        var hist = this.getViewModel().get('mapStateHistory');
        hist.push(hash);
    },

    /**
     * Restores map state from navigation history or given permalink hash.
     * @param {String} hash Hash containing values for center, zoom or/and map
     * layers.
     * @param {Boolean} restoreLayers If the state of visible layers should
     * be restored as well. If not, only center and zoom will be restored
     * (this case is useful for navigation history buttons)
     */
    restoreMapState: function(hash, restoreLayers){
        var center = hash.split('center/')[1].split('|')[0];
        var zoom = hash.split('zoom/')[1].split('|')[0];
        var layers = hash.split('layers/')[1].split('|')[0];
        if (center) {
            this.loadCenter(center);
        }
        if (zoom) {
            this.loadZoom(zoom);
        }
        if (restoreLayers && layers) {
            this.loadLayer(layers);
        }
    },

    loadCenter: function(centerString){
        var mapComponent = this.getView();
        var map = mapComponent.getMap();
        var center = centerString.split(',');
        var olView = map.getView();
        var pan = ol.animation.pan({
            source: olView.getCenter()
        });

        center[0] = parseInt(center[0], 10);
        center[1] = parseInt(center[1], 10);

        map.beforeRender(pan);
        map.getView().setCenter(center);
    },

    loadZoom: function(zoomString){
        var mapComponent = this.getView();
        var map = mapComponent.getMap();
        var olView = map.getView();
        var zoom = ol.animation.zoom({
            resolution: olView.getResolution()
        });

        map.beforeRender(zoom);
        map.getView().setZoom(parseInt(zoomString, 10));
    },

    loadLayer: function(layersString){
        var mapComponent = this.getView();
        var map = mapComponent.getMap();
        var mapLayers = BasiGX.util.Layer.getAllLayers(map.getLayerGroup());
        var layers = layersString.split(',');

        Ext.each(layers, function(layer){
            layer = parseInt(layer, 10);
            mapLayers.forEach(function(mapLayer){
                if(mapLayer.get('routingId') &&
                        !mapLayer.get('isSliderLayer') &&
                        layer === mapLayer.get('routingId')){
                    mapLayer.set('visible', true);
                }
            });
        });
    },

    /**
    * Shows feature info window on hover feature clicked. If at least one
    * feature with property `chartable` was retrieved a chart window
    * as instance of `MoMo.view.window.WaterDataChartWindow` will be shown
    * instead
    * @param {Array} olFeats Array of retrieved features
    */
    onHoverFeatureClicked: function(olFeats){
        var me = this;
        var map = me.getView().getMap();

        var showChartWin = false;

        Ext.each(olFeats, function(olFeat){
            var layer = olFeat.get('layer');
            if (layer.get('chartable')) {
                showChartWin = true;
            }
        });
        if (!showChartWin) {
            me.showFeatureInfoResponseWindow(olFeats);
        } else {
            me.requestChartingData(olFeats[0]);
        }

        map.getOverlays().forEach(function(o) {
            map.removeOverlay(o);
        });
    },

    /**
     * Sends WFS GetFeature request to the geoserver to get all charting data
     * @param {ol.Feature} feat feature containing station_id value
     */
    requestChartingData: function(feat) {
        var me = this;

        var win = Ext.ComponentQuery.query('momo-waterdatachart')[0];
        if (win) {
            win.destroy();
        }

        win = Ext.create('MoMo.view.window.WaterDataChartWindow', {
            chartFeature: feat
        });
        win.show();

        var map = me.getView().getMap();
        var store = win.down('chart').getStore();
        var proxy = store.getProxy();
        proxy.setExtraParam("srsname", map.getView().getProjection().getCode());
        proxy.setExtraParam("viewparams", 'station_id:' +
            feat.get('station_id'));
        store.load();
    },

    /**
     * Shows a window with tabpanels where the attributes of all retrieved
     * features are listed in a grid
     * @param {Array} olFeats Array of retrieved features
     */
    showFeatureInfoResponseWindow: function (olFeats){
        var me = this,
            items = [];
        var win = Ext.ComponentQuery.query('window[name=hsi-window]')[0];
        if (win) {
            win.destroy();
        }
        Ext.each(olFeats, function(olFeat){
            var layer = olFeat.get('layer');
            var tab = {
                title: layer.get('name'),
                xtype: 'propertygrid',
                width: 400,
                source: olFeat.getProperties(),
                closable: true,
                listeners: {
                    close: function(card){
                        var selectInteraction = me.getView()
                                .getPlugin('momo-client-hover')
                                .getHoverVectorLayerInteraction();
                        selectInteraction.getFeatures()
                                .remove(card.olFeature);
                    },
                    scope: me.getView()
                }
            };
            items.push(tab);
        });
        Ext.create('Ext.window.Window',{
            title: 'Feature Info',
            name: 'hsi-window',
            items:[{
                xtype: 'tabpanel',
                items: items
            }],
            listeners: {
                close: function(){
                    var selectInteraction = me.getView()
                    .getPlugin('momo-client-hover')
                    .getHoverVectorLayerInteraction();
                    selectInteraction.getFeatures().clear();
                },
                scope: me.getView()
            }
        }).show();
    },

    /**
     * Method gets the current maps state and returns an state object containing
     * the center, zoom and visibility of layers
     */
    getState: function() {
        var me = this;
        var map = me.getView().getMap();
        var mapView = map.getView();
        var center = mapView.getCenter();
        var zoom = mapView.getZoom();
        var rotation = mapView.getRotation();
        var allLayers = BasiGX.util.Layer.getAllLayers(map);
        var stateLayers = [];

        Ext.each(allLayers, function(layer) {
            var showKey = BasiGX.util.Layer.KEY_DISPLAY_IN_LAYERSWITCHER;

            if (layer.get(showKey)) {
                stateLayers.push({
                    identifier: layer.get('shogunId'),
                    visible: layer.get('visible')
                });
            }
        });

        var state = {
            mapView: {
                center: center,
                zoom: zoom,
                rotation: rotation
            },
            layers: stateLayers
        };

        return state;
    },

    /**
     * Method sets the maps state by the given state object, which may contain
     * the center, zoom and visibility of layers
     */
    setState: function(state) {
        var me = this;
        var map = me.getView().getMap();
        var mapView = map.getView();

        // take care of the map view settings (center, zoom, etc.)
        if (!Ext.isEmpty(state.mapView.center)) {
            mapView.setCenter(state.mapView.center);
        }
        if (!Ext.isEmpty(state.mapView.zoom)) {
            mapView.setZoom(state.mapView.zoom);
        }
        if (!Ext.isEmpty(state.mapView.rotation)) {
            mapView.setRotation(state.mapView.rotation);
        }

        // take care of the map layers
        if (!Ext.isEmpty(state.layers)) {
            Ext.each(state.layers, function(layer) {
                var mapLayer = BasiGX.util.Layer.getLayerBy('shogunId',
                        parseInt(layer.identifier, 0));
                if (mapLayer) {
                    mapLayer.set('visible', layer.visible);
                }
            });
        }
    }

});
