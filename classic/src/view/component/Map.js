/**
 * Map Component
 *
 */
Ext.define('momo.view.component.Map', {
    extend: 'GeoExt.component.Map',
    xtype: 'momo-component-map',

    requires: [
        'BasiGX.util.ConfigParser',
        'BasiGX.util.Layer',

        'momo.view.component.MapController',
        'momo.view.component.MapModel'
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
