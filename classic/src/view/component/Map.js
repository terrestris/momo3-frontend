/**
 * Map Component
 *
 */
Ext.define('ShogunClient.view.component.Map', {
    extend: 'GeoExt.component.Map',
    xtype: 'shogun-component-map',

    requires: [
        'BasiGX.util.ConfigParser',
        'BasiGX.util.Layer',

        'ShogunClient.view.component.MapController',
        'ShogunClient.view.component.MapModel'
    ],

    controller: 'component.map',

    viewModel: 'component.map',

    inheritableStatics: {
        guess: function(){
            return Ext.ComponentQuery.query('shogun-component-map')[0];
        }
    },

    initComponent: function() {
        var me = this;
        var ctrl = me.getController();

        ctrl.setMap();

        me.callParent(arguments);
    }

});
