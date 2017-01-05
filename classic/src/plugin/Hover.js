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
    */
    getToolTipHtml: function(layers, features) {
        var me = this;
        var innerHtml = '';
        Ext.each(layers, function(layer, index, allItems){
            innerHtml += '<b>' + layer.get('name') + '</b>';
            Ext.each(features, function(feat) {
                if(feat && feat.get('layer') === layer){
                    var tpl = layer.get("hoverTemplate");
                    innerHtml += '<br />' + me.replaceAttributesTpl(tpl,
                            feat.getProperties()) + '<br />';
                }
            });
            if(index + 1 !== allItems.length){
                innerHtml += '<br />';
            }
        });
        return innerHtml;
    },

    /**
     *
     */
    replaceAttributesTpl: function(tpl, feat){
        var xtpl = new Ext.XTemplate(tpl);
        var html = xtpl.apply(feat);
        return html;
    }
});
