Ext.define('MoMo.client.view.grid.ApplicationState', {
    extend: 'Ext.grid.Panel',
    xtype: 'momo-grid-applicationstate',

    requires: [
        'Ext.grid.plugin.CellEditing',

        'MoMo.client.view.grid.ApplicationStateController'
    ],

    layout: 'fit',

    height: 300,

    width: 800,

    controller: 'grid.applicationstate',

    viewModel: 'grid.applicationstate',

    store: {
        type: 'applicationstate',
        autoLoad: false,
        filters: [
            function(item) {
                var userId = MoMo.client.app.getUser().id;
                return item.data.owner === userId;
            }
        ]
    },

    collapsible: false,

    selModel: {
        mode: 'SINGLE',
        allowDeselect: true
    },

    viewConfig: {
        enableTextSelection: true
    },

    listeners: {
        afterrender: 'onAfterRender'
    },

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2
    },

    columns: [{
        bind: {
            text: '{columnDescriptionText}'
        },
        editor: 'textfield',
        dataIndex: 'description',
        flex: 1
    }, {
        bind: {
            text: '{columnUrlText}'
        },
        dataIndex: 'token',
        copyToClipboardColumn: true,
        renderer: 'urlColumnRenderer',
        width: 190
    }, {
        bind: {
            text: '{columnLastModifiedText}'
        },
        dataIndex: 'modified',
        xtype: 'datecolumn',
        format: 'd.m.Y H:i:s',
        width: 145
    }],

    bbar: [{
        xtype: 'button',
        bind: {
            text: '{deleteBtnText}'
        },
        handler: 'onDeleteBtnClick'
    }, {
        xtype: 'tbfill'
    }, {
        xtype: 'button',
        bind: {
            text: '{loadBtnText}'
        },
        handler: 'onLoadBtnClick'
    }, {
        xtype: 'button',
        bind: {
            text: '{createBtnText}'
        },
        handler: 'onCreateBtnClick'
    }]

});
