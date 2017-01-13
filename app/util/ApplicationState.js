Ext.define('MoMo.client.util.ApplicationState', {
    requires: [
        'BasiGX.util.Map',

        'MoMo.client.util.ApplicationContext',
        'MoMo.client.util.OlStyle'
    ],

    statics: {

        /**
         *
         */
        getState: function(opts) {
            var applicationState = {};
            var mapComponent = BasiGX.util.Map.getMapComponent();

            if (mapComponent) {
                applicationState = mapComponent.getController().getState();
            }

            var redliningPanel = Ext.ComponentQuery.query(
                    'momo-panel-redlining')[0];

            if (redliningPanel) {
                var olStyleUtil = MoMo.client.util.OlStyle;
                var redlining = redliningPanel.getController().getState();
                var redliningState = {};

                if (redlining.features) {
                    var geoJson = new ol.format.GeoJSON();
                    var feats = [];

                    Ext.each(redlining.features, function(feat) {
                        var featObj = geoJson.writeFeatureObject(feat);

                        // take care of the style (if any,
                        // e.g. for postIt features)
                        featObj.style = olStyleUtil.writeStyle(feat.getStyle());

                        feats.push(featObj);
                    });

                    var featColl = {
                        type: 'FeatureCollection',
                        features: feats
                    };

                    redliningState.features = featColl;
                }

                redliningState.pointStyle = olStyleUtil.writeStyle(
                        redlining.pointStyle);

                redliningState.lineStyle = olStyleUtil.writeStyle(
                        redlining.lineStyle);

                redliningState.polygonStyle = olStyleUtil.writeStyle(
                        redlining.polygonStyle);
            }

            applicationState.redlining = redliningState;
            applicationState.application = MoMo.client.util
                    .ApplicationContext.getApplicationContext().id;

            Ext.applyIf(applicationState, opts);

            return applicationState;
        },

        /**
         *
         */
        setState: function(applicationState, cbSuccess, cbFailure, cbScope) {
            var mapComponent = BasiGX.util.Map.getMapComponent();
            var redliningPanel = Ext.ComponentQuery.query(
                    'momo-panel-redlining')[0];

            if (!(applicationState instanceof
                    MoMo.client.model.ApplicationState)) {
                return false;
            }

            // create a copy of the input state as we don't want to manipulate
            // the original model record here (or later in the setState())
            var applicationStateCopy = Ext.clone(applicationState);
            var redlining = {};

            if (applicationStateCopy.get('redlining')) {
                var redliningObj = applicationState.get('redlining');
                var olStyleUtil = MoMo.client.util.OlStyle;

                if (redliningObj.features) {
                    var geoJson = new ol.format.GeoJSON();
                    var olFeats = [];

                    Ext.each(redliningObj.features.features, function(feat) {
                        var olFeat = geoJson.readFeature(feat);

                        // take care of the style
                        // (if any, e.g. for postIt features)
                        olFeat.setStyle(olStyleUtil.readStyle(feat.style));

                        olFeats.push(olFeat);
                    });

                    redlining.features = olFeats;
                }

                redlining.pointStyle = olStyleUtil.readStyle(
                        redliningObj.pointStyle);

                redlining.lineStyle = olStyleUtil.readStyle(
                        redliningObj.lineStyle);

                redlining.polygonStyle = olStyleUtil.readStyle(
                        redliningObj.polygonStyle);
            }

            // set(redlining)
            applicationStateCopy.set('redlining', redlining);

            if (mapComponent) {
                if (applicationStateCopy.get('layers') ||
                        applicationStateCopy.get('mapView')) {
                    mapComponent.getController().setState(
                            applicationStateCopy.getData());
                }
            }

            if (!redliningPanel) {
                var redliningBtn = Ext.ComponentQuery.query(
                        'momo-button-showredliningtoolspanel')[0];

                redliningBtn.toggle(true);
                redliningBtn.toggle(false);

                redliningPanel = Ext.ComponentQuery.query(
                        'momo-panel-redlining')[0];
            }

            if (applicationStateCopy.get('redlining')) {
                redliningPanel.getController().setState(
                        applicationStateCopy.get('redlining'));
            }

            if (Ext.isFunction(cbSuccess)) {
                cbSuccess.call(cbScope);
            }
        },

        /**
         * Loads the application state by a given application state token.
         */
        loadApplicationState: function(appStateToken, cbSuccess, cbFailure,
                cbScope) {

            if (!appStateToken) {
                return false;
            }

            MoMo.client.model.ApplicationState.load(appStateToken, {
                success: function(record) {
                    if (Ext.isFunction(cbSuccess)) {
                        cbSuccess.call(cbScope, record);
                    }
                },
                failure: function(error) {
                    if (Ext.isFunction(cbFailure)) {
                        cbFailure.call(cbScope, error);
                    }
                }
            });
        },

        /**
         *
         */
        saveApplicationState: function(applicationState, cbSuccess, cbFailure,
                cbScope) {

            if (!(applicationState instanceof
                    MoMo.client.model.ApplicationState)) {
                return false;
            }

            applicationState.save({
                success: function() {
                    if (Ext.isFunction(cbSuccess)) {
                        cbSuccess.call(cbScope);
                    }
                },
                failure: function(error) {
                    if (Ext.isFunction(cbFailure)) {
                        cbFailure.call(cbScope, error);
                    }
                }
            });
        },

        /**
         *
         */
        deleteApplicationState: function(applicationState, cbSuccess, cbFailure,
                cbScope) {

            if (!(applicationState instanceof
                    MoMo.client.model.ApplicationState)) {
                return false;
            }

            applicationState.erase({
                success: function() {
                    if (Ext.isFunction(cbSuccess)) {
                        cbSuccess.call(cbScope);
                    }
                },
                failure: function(error) {
                    if (Ext.isFunction(cbFailure)) {
                        cbFailure.call(cbScope, error);
                    }
                }
            });
        }

    }
});
