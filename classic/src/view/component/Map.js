/**
 * Map Component
 *
 */
Ext.define('MoMo.client.view.component.Map', {
    extend: 'GeoExt.component.Map',
    xtype: 'momo-component-map',

    requires: [
        'BasiGX.util.ConfigParser',
        'BasiGX.util.Layer',
        'BasiGX.util.Map',

        'MoMo.client.view.component.MapController',
        'MoMo.client.view.component.MapModel'
    ],

    controller: 'component.map',

    viewModel: 'component.map',

    inheritableStatics: {
        guess: function(){
            return BasiGX.util.Map.getMapComponent('momo-component-map');
        }
    },

    initComponent: function() {
        var me = this;
        var ctrl = me.getController();

        ctrl.setMap();

        me.callParent(arguments);

    }

});
