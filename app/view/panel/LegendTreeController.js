/**
 *
 */
Ext.define('MoMo.client.view.panel.LegendTreeController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.panel.legendtree',

    requires: [
        'Ext.window.Toast',
        'MoMo.shared.MetadataUtil',
        'MoMo.client.view.window.MetadataWindow'
    ],

    /**
     *
     */
    setLegendStore: function() {
        var me = this;
        var view = me.getView();
        var map;

        if (!MoMo.client.view.component.Map ||
                !MoMo.client.view.component.Map.guess() ||
                !MoMo.client.view.component.Map.guess().getMap()) {
            Ext.Logger.warn('Couldn\'t find the map object. It\'s very ' +
                    'unlikely the LegendTree will work properly.');
            return false;
        }

        map = MoMo.client.view.component.Map.guess().getMap();

        var legendStore = Ext.create('GeoExt.data.store.LayersTree', {
            model: 'MoMo.client.model.LayerTreeNode',
            layerGroup: map.getLayerGroup()
        });

        // add legendStore filter for "displayInLayerSwitcher" key
        legendStore.addFilter(function(rec) {
            if(!rec.isRoot()){
                var layer = rec.getOlLayer();
                var util = BasiGX.util.Layer;
                var showKey = util.KEY_DISPLAY_IN_LAYERSWITCHER;
                if (layer.get(showKey) === false) {
                    return false;
                }
                return true;
            }
        });

        view.store = legendStore;
    },

    /**
     *
     */
    showLayerContextMenu: function(treeview, rec, item, index, e) {
        var me = this;
        var view = me.getView();
        e.preventDefault();
        if (!rec || (rec && !rec.get('leaf')) || (rec && !rec.get('checked'))) {
            return false;
        }
        var olLayer = rec.getOlLayer();
        var olLayerOpacity = 100;
        if(olLayer) {
            olLayerOpacity = olLayer.getOpacity() * 100;
        }
        Ext.create('Ext.menu.Menu', {
            bodyPadding: 10,
            plain: true,
            items: [{
                text: view.getViewModel().get('showMetadataLabel'),
                handler: me.showMetadata.bind(me, rec)
            }, {
                xtype: 'slider',
                fieldLabel: view.getViewModel().get('opacityLabel'),
                value: olLayerOpacity,
                useTips: true,
                width: 200,
                tipText: function(thumb) {
                    return String(thumb.value) + '%';
                },
                listeners: {
                    change: function(slider, newValue) {
                        if(olLayer) {
                            olLayer.setOpacity(newValue / 100);
                        }
                    }
                }
            }]
        }).showAt(e.getXY());
    },

    /**
     *
     */
    showMetadata: function(rec){
        var layer = rec.getOlLayer();
        var uuid = layer.get('metadataIdentifier');
        Ext.Ajax.request({
            url: BasiGX.util.Url.getWebProjectBaseUrl() + 'metadata/csw.action',
            method: "POST",
            params: {
                xml: MoMo.shared.MetadataUtil.getLoadXml(uuid),
                layerId: layer.get('shogunId')
            },
            defaultHeaders: BasiGX.util.CSRF.getHeader(),
            success: function(response){
                var responseObj = Ext.decode(response.responseText);
                var metadataObj = MoMo.shared.MetadataUtil.parseMetadataXml(
                        responseObj.data);

                if(metadataObj){
                    Ext.create('MoMo.client.view.window.MetadataWindow', {
                        autoShow: true,
                        metadata: metadataObj
                    });
                }
            },
            failure: function(){
                Ext.toast('Warning: Couldn\'t load Metadata for layer.');
            }
        });
    }
});
