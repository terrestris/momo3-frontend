Ext.define('MoMo.client.view.container.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'BasiGX.*',
        'GeoExt.*',
        'MoMo.*',
        'Ext.layout.container.Absolute'
    ],

    controller: 'momo-mainviewport',

    viewModel: {
        type: 'momo-mainviewport'
    },

    listeners: {
        beforerender: 'getUserBySession'
    },

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
});
