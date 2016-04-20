Ext.define('momo.view.container.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'BasiGX.*',
        'GeoExt.*',
        'momo.*'
    ],

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});
