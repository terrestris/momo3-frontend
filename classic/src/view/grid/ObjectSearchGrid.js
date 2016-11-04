Ext.define("MoMo.client.view.grid.ObjectSearchGrid",{
    extend: "Ext.grid.Panel",
    xtype: "momo-grid-objectsearchgrid",

    // this class is inspired by BasiGX.view.grid.GazetteerGrid
    // BasiGX.view.container.WfsSearch

    requires: [
               'GeoExt.component.FeatureRenderer',
               'BasiGX.util.Map',
               'BasiGX.util.Layer',
               'BasiGX.util.Animate'
    ],

    viewModel: {
        data: {
            title: 'Objektsuche',
            hideToolTooltip: 'Gazetteer verbergen'
        }
    },

    bind: {
        title: '{title}'
    },

    store: null,

    searchResultVectorLayer: null,

    flashFeature: null,

    searchTerm: null,

    clusterLayer: null,

    clusterResults: false,

    collapsible: true,

    titleCollapse: true,

    maxHeight: 400,

    sortable: false,

    config: {
        searchBlackList: [
            "hoverVectorLayer",
            "OSM-WMS GRAY",
            "01_kharaa_river_basin_32648",
            "01_kharaa_subbasins_32648",
            "02_surface_water_bodies_32648",
            "exploitable_groundwater"
        ],
        searchLayers: [],
        wfsServerUrl:"/momo/geoserver.action",
        minSearchTextChars: 3,
        typeDelay: 300,
        allowedFeatureTypeDataTypes: [
            'xsd:string'
        ],
        searchTerm: null,
        map: null,
        layer: null,

        searchResultFeatureStyle: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#C5000B'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            }),
//            fill: new ol.style.Fill({
//                color: '#C5000B'
//            }),
            stroke: new ol.style.Stroke({
                color: '#C5000B',
                width: 4
            })
        }),

        /**
         *
         */
        searchResultHighlightFeatureStyleFn: function(radius, text) {
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius,
                    fill: new ol.style.Fill({
                        color: '#EE0000'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'gray',
                        width: 3
                    })
                }),
                text: text ? new ol.style.Text({
                    text: text.toString(),
                    fill: new ol.style.Fill({
                        color: '#fff'
                    })
                }) : undefined
            });
        },

        /**
         *
         */
        searchResultSelectFeatureStyle: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({
                    color: '#0099CC'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            }),
            fill: new ol.style.Fill({
                color: '#0099CC'
            }),
            stroke: new ol.style.Stroke({
                color: '#0099CC',
                width: 6
            })
        }),

        clusterStyleFn: function(amount, radius) {
            // set maxradius
            var maxRadius = this.clusterLayer.getSource().distance_ / 2;
            if (radius > maxRadius) {
                radius = maxRadius;
            }
            return [new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius,
                    stroke: new ol.style.Stroke({
                        color: '#fff'
                    }),
                    fill: new ol.style.Fill({
                        color: '#3399CC'
                    })
                }),
                text: new ol.style.Text({
                    text: amount.toString(),
                    fill: new ol.style.Fill({
                        color: '#fff'
                    })
                })
            })];
        },

        flashStyle: function() {
            return [new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 5
                    }),
                    text: new ol.style.Text({
                        text: ""
                    })
            })];
        }

    },


    /**
    *
    */
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

    /**
    *
    */
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: 'Layer: {name}'
    }],

    /**
    *
    */
    columns: [
        {
            xtype: 'widgetcolumn',
            flex: 1,
            widget: {
                xtype: 'gx_renderer'
            },
            onWidgetAttach: function(column, gxRenderer, record) {
                // update the symbolizer with the related feature
                var feature = record.olObject;
                gxRenderer.update({
                    feature: feature,
                    symbolizers: feature.getStyle() || feature.getStyleFunction() ||
                    (record.store ? record.store.layer.getStyle() : null)
                });
            }
        },
        {
            text: 'Feature',
            dataIndex: 'displayfield',
            flex: 5,
            renderer: function(value) {
                return '<span data-qtip="' + value + '">' +
                value + '</span>';
            }
        },
        {
            text: 'Area',
            dataIndex: 'area_km2',
            flex: 1,
            renderer: function(value) {
                if (value) {
                    return '<span data-qtip="' + Math.round(value) + ' km²">' +
                    Math.round(value) + ' km²</span>';
                }
            }
        },
        {
            text: 'Length',
            dataIndex: 'length',
            flex: 1,
            renderer: function(value) {
                if (value) {
                    return '<span data-qtip="' + Math.round(value) + '">' +
                    Math.round(value) + '</span>';
                }
            }
        },
        {
            text: 'Altitude',
            flex: 1,
            xtype: 'templatecolumn',
            tpl: '<div data-qtip="{altitude}">'+
            '{altitude}'+ '</div>'
        }
    ],

    /**
    *
    */
    initComponent: function() {
        var me = this;
        me.callParent(arguments);

        me.map = BasiGX.util.Map.getMapComponent().getMap();
        var allLayers = BasiGX.util.Layer.getAllLayers(me.map);
        Ext.each(allLayers, function(l) {
            if (l instanceof ol.layer.Tile && !Ext.Array.contains(me.getSearchBlackList(),
                    l.get('name'))) {
                me.searchLayers.push(l);
            }
        });

        if (Ext.isEmpty(me.getSearchLayers())) {
            Ext.log.error('No layers given to search component!');
        }

        if (!me.searchResultVectorLayer) {
            me.searchResultVectorLayer = new ol.layer.Vector({
                name: "Object Search Results",
                source: new ol.source.Vector(),
                style: me.getSearchResultFeatureStyle(),
//                visible: !me.clusterResults,
                hoverable: false
            });
            var displayInLayerSwitcherKey =
                BasiGX.util.Layer.KEY_DISPLAY_IN_LAYERSWITCHER;
            me.searchResultVectorLayer.set(displayInLayerSwitcherKey, false);
            me.map.addLayer(me.searchResultVectorLayer);
        }

        if (me.clusterResults && !me.clusterLayer) {
            var clusterSource = new ol.source.Cluster({
                distance: 40,
                source: me.searchResultVectorLayer.getSource()//new ol.source.Vector()
            });

            me.clusterLayer = new ol.layer.Vector({
                source: clusterSource,
                style: function(feature) {
                    var amount = feature.get('features').length;
                    var style = me.styleCache[amount];
                    if (!style) {
                        style = me.clusterStyleFn(amount, amount + 10);
                        me.styleCache[amount] = style;
                    }
                    return style;
                }
            });
            me.map.addLayer(me.clusterLayer);

            // correct the vectorlayerstyle for the grid symbolizer
            me.searchResultVectorLayer.setStyle(me.clusterStyleFn('', 8));
        }

        var searchResultStore = Ext.create('GeoExt.data.store.Features', {
            map: me.map,
            layer: me.searchResultVectorLayer,
            groupField: 'featuretype'
        });

        me.setStore(searchResultStore);


        me.on('describeFeatureTypeResponse', me.getFeatures);
        me.on('getFeatureResponse', me.showSearchResults);
//        me.on('show', me.down('textfield').focus);

        // add listeners
        me.on('boxready', me.onBoxReady, me);
        me.on('itemmouseenter', me.highlightFeature, me);
        me.on('itemmouseleave', me.unhighlightFeature, me);
        me.on('itemclick', me.highlightSelectedFeature, me);
        // unregister listeners on grid hide
        me.on('hide', me.unregisterListeners, me);

    },



// first add the needed methods of BasiGX.view.container.WfsSearch

    /**
    *
    */
    describeFeatureTypes: function(searchterm) {
        var me = this,
            typeNames = [],
            featureTypes;
        var layerobjects = [];

        me.searchResultVectorLayer.getSource().clear();

        me.setSearchTerm(searchterm);

        Ext.each(me.getSearchLayers(), function(l) {
            if (l.getSource().getParams) {
                typeNames.push(l.getSource().getParams().LAYERS);
            }
        });

        var describeFeatureTypeParams = {
            REQUEST: "DescribeFeatureType",
            SERVICE: "WFS",
            VERSION: "1.1.0",
            OUTPUTFORMAT: "application/json",
            TYPENAME: typeNames.toString()
        };

        var url = me.getWfsServerUrl() + "?";
        Ext.iterate(describeFeatureTypeParams, function(k, v) {
            url += k + "=" + v + "&";
        });

        me.setLoading(true);

        Ext.Ajax.request({
            url: url,
            success: function(response){
                me.setLoading(false);
                if(Ext.isString(response.responseText)) {
                    featureTypes = Ext.decode(response.responseText);
                } else if(Ext.isObject(response.responseText)) {
                    featureTypes = response.responseText;
                } else {
                    Ext.log.error("Error! Could not parse " +
                        "describe featuretype response!");
                }
                me.fireEvent('describeFeatureTypeResponse', featureTypes);
            },
            failure: function(response) {
                me.setLoading(false);
                Ext.log.error("Error on describe featuretype request:",
                    response);
            }
        });
    },

    /**
    *
    */
    getFeatures: function(resp) {
        var me = this;
        var featureTypes = resp.featureTypes;
        var cleanedFeatureType = me.cleanUpFeatureDataTypes(featureTypes);
        var url = me.getWfsServerUrl();
        var xml = me.setupXmlPostBody(cleanedFeatureType);
        var features;

        me.setLoading(true);

        Ext.Ajax.request({
            url: url,
            method: 'POST',
            headers: BasiGX.util.CSRF.getHeader(),
            xmlData: xml,
            success: function(response){
                me.setLoading(false);
                if(Ext.isString(response.responseText)) {
                    features = Ext.decode(response.responseText).features;
                } else if(Ext.isObject(response.responseText)) {
                    features = response.responseText.features;
                } else {
                    Ext.log.error("Error! Could not parse " +
                        "GetFeature response!");
                }
                me.fireEvent('getFeatureResponse', features);
            },
            failure: function(response) {
                me.setLoading(false);
                Ext.log.error("Error on GetFeature request:",
                    response);
            }
        });
    },

    /**
    *
    */
    cleanUpFeatureDataTypes: function(featureTypes) {
        var me = this,
            cleanedFeatureType = [];
        Ext.each(featureTypes, function(ft, index) {
            cleanedFeatureType.push({
                typeName: ft.typeName,
                properties: []
            });

            Ext.each(ft.properties, function(prop) {
                if (Ext.Array.contains(
                    me.getAllowedFeatureTypeDataTypes(), prop.type) &&
                    prop.name.indexOf(" ") < 0) {
                        cleanedFeatureType[index].properties.push(prop);
                }
            });
        });
        return cleanedFeatureType;
    },

    /**
    *
    */
    setupXmlPostBody: function(featureTypes) {
        var me = this;

        var checkbox = me.up().down('checkbox[name=limitcheckbox]');
        var limitToBBox = checkbox.getValue();

        var map = BasiGX.util.Map.getMapComponent().getMap();
        var projection = map.getView().getProjection().getCode();
        var bbox;
        var visibleExtent = map.getView().calculateExtent(map.getSize());
        var totalExtent = map.getView().getProjection().getExtent();
//        var transformedBbox = ol.proj.transformExtent(bbox, projection,
//        'EPSG:4326').toString();

        if(limitToBBox){
            console.log("limited extent");
            bbox = visibleExtent;
        } else {
            bbox = totalExtent;
        }

        var bboxll = bbox[0] + ' ' + bbox[1];
        var bboxur = bbox[2] + ' ' + bbox[3];

        var xml =
            '<wfs:GetFeature service="WFS" version="1.1.0" ' +
              'outputFormat="application/json" ' +
              'xmlns:wfs="http://www.opengis.net/wfs" ' +
              'xmlns:ogc="http://www.opengis.net/ogc" ' +
              'xmlns:gml="http://www.opengis.net/gml" ' +
              'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
              'xsi:schemaLocation="http://www.opengis.net/wfs ' +
              'http://schemas.opengis.net/wfs/1.1.0/WFS-basic.xsd">';

        Ext.each(featureTypes, function(ft) {
            Ext.each(ft.properties, function(prop) {
                xml +=
                    '<wfs:Query typeName="momo:' + ft.typeName + '">' +
                     '<ogc:Filter>' +
                      '<ogc:And>' +
                       '<ogc:BBOX>' +
                        '<gml:Envelope srsName="' + projection  + '">' +
                         '<gml:lowerCorner>' + bboxll + '</gml:lowerCorner>' +
                         '<gml:upperCorner>' + bboxur + '</gml:upperCorner>' +
                        '</gml:Envelope>' +
                       '</ogc:BBOX>' +
                       '<ogc:PropertyIsLike wildCard="*" singleChar="." escape="\\" matchCase="false">' +
                        '<ogc:PropertyName>' + prop.name + '</ogc:PropertyName>' +
                        '<ogc:Literal>*' + me.searchTerm + '*</ogc:Literal>' +
                       '</ogc:PropertyIsLike>' +
                      '</ogc:And>' +
                     '</ogc:Filter>' +
                   '</wfs:Query>';
            });
        });

        xml += '</wfs:GetFeature>';

        return xml;
    },

    /**
    *
    */
    showSearchResults: function(features) {

        var me = this,
            parser = new ol.format.GeoJSON();

        if(features.length > 0){
            me.show();
        }

        Ext.each(features, function(feature) {
            var featuretype = feature.id.split(".")[0];
            var displayfield;

            // find the matching value in order to display it
            Ext.iterate(feature.properties, function(k, v) {
                if (v && v.toString().toLowerCase().indexOf(me.searchTerm) > -1) {
                    displayfield = v;
                    return false;
                }
            });

            feature.properties.displayfield = displayfield;
            feature.properties.featuretype = featuretype;

            var olFeat = parser.readFeatures(feature, {
                dataProjection: 'EPSG:32648',
                featureProjection: 'EPSG:3857'
            })[0];
            me.searchResultVectorLayer.getSource().addFeature(olFeat);
        });

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
                name: "me.getLayer layer",
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
    unregisterListeners: function() {
        var me = this;

        me.un('boxready', me.onBoxReady, me);
        me.un('itemmouseenter', me.highlightFeature, me);
        me.un('itemmouseleave', me.unhighlightFeature, me);
        me.un('itemclick', me.highlightSelectedFeature, me);

    },

    /**
    *
    */
    updateRenderer: function(item, style){
//        var renderer = Ext.getCmp(
//            Ext.query('div[id^=gx_renderer', true, item)[0].id);
//        var src = renderer.map.getLayers().getArray()[0].getSource();
//        src.getFeatures()[0].setStyle(style);
    },

    /**
    *
    */
    highlightFeature: function(tableView, record, item) {

        var me = this;
        var layer = me.getLayer();
        var feature = record.getFeature()
        layer.getSource().addFeature(feature);


        if(this.enterEventRec === record){
            return;
        }
        var me = this;
        var feature;
        var radius;
        var text;

        this.enterEventRec = record;
        ol.Observable.unByKey(this.flashListenerKey);

        if (this.clusterResults) {
            feature = this.getClusterFeatureFromFeature(record.olObject);
            var featureStyle = this.clusterLayer.getStyle()(
                feature, me.map.getView().getResolution())[0];
            radius = featureStyle.getImage().getRadius();
            text = featureStyle.getText().getText();
        } else {
            feature = record.olObject;
            radius = 5; // default value
        }

        if (tableView.getSelection()[0] !== record) {
            feature.setStyle(
                this.getSearchResultHighlightFeatureStyleFn()(radius, text)
            );
            this.updateRenderer(item,
                this.getSearchResultHighlightFeatureStyleFn()(8, text)
            );
        }
        if (feature) {
//            this.flashListenerKey = BasiGX.util.Animate.flashFeature(
//                feature, 1000, radius);
        }
    },

    /**
     *
     */
    unhighlightFeature: function(tableView, record, item) {

        var me = this;
        var layer = me.getLayer();
        layer.getSource().clear();


        if(this.leaveEventRec === record){
            return;
        }
        this.leaveEventRec = record;
        if (tableView.getSelection()[0] !== record) {
            record.olObject.setStyle(this.getSearchResultFeatureStyle());
            if (this.clusterResults) {
//                this.updateRenderer(item, this.clusterStyleFn('', 8));
            } else {
//                this.updateRenderer(item, this.getSearchResultFeatureStyle());
            }
        }
    },

    /**
     *
     */
    highlightSelectedFeature: function(tableView, record, item) {

        var me = this;
        var projection = me.getMap().getView().getProjection().getCode();
        var feature = record.getFeature()
        var geom = feature.getGeometry();
        me.getMap().getView().fit(geom, me.getMap().getSize());


        record.olObject.setStyle(this.getSearchResultSelectFeatureStyle());
        this.updateRenderer(item, this.getSearchResultSelectFeatureStyle());

        this.zoomToExtent(record.olObject.getGeometry());
    }

});