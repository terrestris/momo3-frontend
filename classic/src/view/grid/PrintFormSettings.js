Ext.define('MoMo.client.view.grid.PrintFormSettings', {
    extend: 'Ext.grid.Panel',
    xtype: 'momo-grid-printformsettings',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'MoMo.client.store.PrintFormSettings',
        'MoMo.client.view.grid.PrintFormSettingsController'
    ],

    layout: 'fit',

    height: 300,

    width: 800,

    controller: 'grid.printformsettings',

    viewModel: 'grid.printformsettings',

    store: {
        type: 'printformsettings',
        autoLoad: true
    },

    collapsible: false,

    selModel: {
        mode: 'SINGLE',
        allowDeselect: true
    },

    viewConfig: {
        enableTextSelection: true
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
