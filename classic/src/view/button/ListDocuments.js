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
        'MoMo.client.view.button.ListDocumentsModel',
        'MoMo.client.view.window.document.ListDocumentsWindow'
    ],

    controller: 'button.listdocuments',

    viewModel: 'button.listdocuments',

    ui: 'momo-header-tools',

    scale: 'small',

    cls: 'dms-button',

    icon: 'resources/img/dms.svg',

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
