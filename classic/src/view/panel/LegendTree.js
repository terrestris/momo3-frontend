/**
 * LegendTree Panel
 */
Ext.define('ShogunClient.view.panel.LegendTree', {
    extend: 'BasiGX.view.panel.LegendTree',
    xtype: 'shogun-view-panel-legendtree',

    requires: [
        'ShogunClient.view.component.Map',
        'GeoExt.data.store.LayersTree',

        'ShogunClient.view.panel.LegendTreeController',
        'ShogunClient.view.panel.LegendTreeModel'
    ],

    controller: 'panel.legendtree',

    viewModel: 'panel.legendtree',

    width: 350,

    collapsible: true,

    collapsed: false,

    bind: {
        title: '{title}'
    },

    initComponent: function() {
        var me = this;
        var ctrl = me.getController();

        // set the store
        ctrl.setLegendStore();

        // call parent
        me.callParent();
    }

});
