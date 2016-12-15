Ext.define('MoMo.client.model.LayerTreeNode', {

    extend: 'GeoExt.data.model.LayerTreeNode',

    /**
     * @inheritDoc
     */
    constructor: function() {

        this.callParent(arguments);

        var layer = this.getOlLayer();

        if (layer instanceof ol.layer.Group) {
            // care about the expanded property in case of folders/groups
            this.set('expanded', layer.get('expanded'));
        }
    }

});
