Ext.define('MoMo.client.view.container.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'BasiGX.*',
        'GeoExt.*',
        'MoMo.client.*'
    ],

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});
