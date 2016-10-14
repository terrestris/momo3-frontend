Ext.define('MoMo.client.plugin.Hover', {
    extend: 'BasiGX.plugin.Hover',

    alias: 'plugin.momo-client-hover',
    pluginId: 'momo-client-hover',

    /**
    *
    */
    config: {
        featureInfoEpsg: 'EPSG:32648',
//      set pointerRest to false and activate it in the map, otherwise the here
//      configured pointerRestInterval is set but not parsed
        pointerRest: false,
        pointerRestInterval: 50
    },

    /**
     * Overrides the BasiGX method.
     * Only layers with hoverable property set to true will be requested.
     */
    hoverLayerFilter: function(candidate) {
        var hoverableProp = BasiGX.plugin.Hover.LAYER_HOVERABLE_PROPERTY_NAME;
        if(candidate.get(hoverableProp)){
            return true;
        } else {
            return false;
        }
    },

    /**
    * Overrides the BasiGX method.
    * At the moment only the layer name will be shown as tooltip. If
    * #BasiGX.plugin.Hover.LAYER_HOVERFIELD_PROPERTY_NAME is set the provided
    * property name can be used for hovering. In this case the original BasiGX
    * method or extension of this override can be used.
    */
    getToolTipHtml: function(layers){

        var innerHtml = '';
        Ext.each(layers, function(layer, index, allItems){
            innerHtml += '<b>' + layer.get('name') + '</b>';
            if(index + 1 !== allItems.length){
                innerHtml += '<br />';
            }
        });
        return innerHtml;
    }
});
