Ext.define("MoMo.client.view.panel.LegendTree",{
    extend: "BasiGX.view.panel.LegendTree",
    xtype: "momo-panel-legendtree",

    controller: 'panel.legendtree',

    viewModel: 'panel.legendtree',

    width: 350,

    collapsible: true,

    collapsed: false,

    bind: {
        title: '{title}'
    },

   /**
    *
    */
    initComponent: function() {
        var me = this;
        var ctrl = me.getController();

        // set the store
        ctrl.setLegendStore();

        // call parent
        me.callParent();
    },

    listeners: {
        'itemcontextmenu': 'showLayerContextMenu'
    }
});
