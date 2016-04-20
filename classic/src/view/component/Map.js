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
            var xtype = 'momo-panel-mapcontainer';
            return Ext.ComponentQuery.query(xtype)[0].mapPanel;
        }
    },

    initComponent: function() {
        var me = this;
        var ctrl = me.getController();

        ctrl.setMap();

        me.callParent(arguments);
    }

});
