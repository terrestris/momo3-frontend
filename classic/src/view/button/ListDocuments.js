/**
 * Document Button
 *
 * @class MoMo.client.view.button.Document
 */
Ext.define('MoMo.client.view.button.ListDocuments', {
    extend: 'Ext.Button',
    xtype: 'momo-list-documents-button',
    requires: [
        'Ext.app.ViewModel',

        'MoMo.client.view.button.ListDocumentsController',
        'MoMo.client.view.button.ListDocumentsModel'
    ],

    controller: 'button.listdocuments',

    viewModel: 'button.listdocuments',

    ui: 'momo-header-tools',

    scale: 'small',

    /**
     *
     */
    bind: {
        tooltip: '{tooltip}',
        text: '{text}'
    },

    /**
     *
     */
    listeners: {
        click: 'onClick'
    },

    /**
     *
     */
    constructor: function(cfg) {
        var me = this;
        me.callParent([cfg]);
    }
});
