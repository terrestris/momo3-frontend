Ext.define("MoMo.client.view.combo.MultiSearchCombo", {
    extend: 'BasiGX.view.form.field.GazetteerCombo',
    xtype: "momo-combo-multisearch",

    searchPanel: null,

    onComboValueChange: function(combo, newValue){

        var me = this;

        if(newValue){
            // create the multi search panel
            me.showSearchPanel("MoMo.client.view.panel.MultiSearchPanel");

            // start the gazetteer search
            me.doGazetteerSearch(newValue);

            // start the object search
            me.doObjectSearch(newValue);

        } else {
            searchPanel =
                Ext.ComponentQuery.query('momo-panel-multisearch')[0];
            var objectSearchGrid =
                Ext.ComponentQuery.query('momo-grid-objectsearchgrid')[0];
            var searchLayer = objectSearchGrid.searchResultVectorLayer;

            if(searchPanel) {
                searchPanel.getEl().slideOut('t', {
                    duration: 250,
                    callback: searchPanel.onMultiSearchPanelSlideOut,
                    scope: searchPanel
                });
            }

            if(searchLayer) {
                searchLayer.getSource().clear();
            }
        }
    },

    doObjectSearch: function(value){

        var objectSearchGrid =
            Ext.ComponentQuery.query('momo-grid-objectsearchgrid')[0];

        if (objectSearchGrid) {
            objectSearchGrid.describeFeatureTypes(value);
            objectSearchGrid.expand();
        } else {
            console.log("ObjectSearchGrid not found");
        }

    },

    doGazetteerSearch: function(value){

        var me = this;

        var searchPanel = Ext.ComponentQuery.query('momo-panel-multisearch')[0];

        var gazetteerGrid =
            Ext.ComponentQuery.query('momo-grid-gazetteergrid')[0];
        var gazetteerStore = gazetteerGrid.getStore();
        var checkbox = searchPanel.down('checkbox[name=limitcheckbox]');
        var limitToBBox = checkbox.getValue();

        gazetteerGrid.show();

        Ext.Ajax.abort(gazetteerStore._lastRequest);

        gazetteerStore.getProxy().setExtraParam('q', value);

        if(limitToBBox){
            var map = BasiGX.util.Map.getMapComponent().getMap();
            var olView = map.getView();
            var projection = olView.getProjection().getCode();
            var bbox = map.getView().calculateExtent(map.getSize());
            var transformedBbox = ol.proj.transformExtent(bbox, projection,
                    'EPSG:4326');
            gazetteerStore.getProxy().setExtraParam('viewboxlbrt',
                    transformedBbox.toString());
        } else {
            gazetteerStore.getProxy().setExtraParam('viewboxlbrt', null);
        }
        gazetteerStore.load();
        gazetteerStore._lastRequest = Ext.Ajax.getLatest();
        gazetteerGrid.expand();
    },




    showSearchPanel: function(xtype) {
        var me = this;
        if (!me.searchPanel) {
            me.searchPanel = me.createSearchPanel(xtype);
        }
        me.searchPanel.show();
    },

    createSearchPanel: function(xtype, config) {
        var me = this;
        var parentItem = me.getEl();
        var position = me.computePosition(parentItem);

        var searchPanel = Ext.create(xtype, {
            renderTo: Ext.getBody(),
            style: {
                'top': position.top,
                'left': position.left
            },
            width: position.width
        });

        return searchPanel;
    },


    /**
     * Computes position of the search panel depending on the
     * dimensions and position of the parent search field
     */
    computePosition: function(parentItem){

        var top = parentItem.getClientRegion().bottom + "px";
//        var left = parentItem.getClientRegion().left + "px";
        var left = "10px";
        var width = parentItem.getWidth() + "px";

        return {
            top: top,
            left: left,
            width: width
        };
    }


});
