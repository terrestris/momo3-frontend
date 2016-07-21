Ext.define("MoMo.client.view.panel.RbmaTree",{
    extend: "Ext.tree.Panel",
    xtype: "momo-rbma-tree",

    controller: 'panel.rbmatree',

    viewModel: 'panel.rbmatree',

    width: '30%',

    collapsible: true,

    collapsed: false,

    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            dragText: 'Drag and drop to reorganize'
        }
    },

    bind: {
        title: '{title}'
    },

    listeners: {
        itemcontextmenu: 'onItemContextMenuClick',
        drop: 'onDragDrop'
    },

   /**
    *
    */
    initComponent: function() {
        var me = this;
        var ctrl = me.getController();

        // set the store
        ctrl.setRbmaStore();

        // call parent
        me.callParent();
    }
});
