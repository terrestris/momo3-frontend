/**
 * Rbma Button
 *
 * @class MoMo.client.view.button.Rbma
 */
Ext.define('MoMo.client.view.button.Rbma', {
    extend: 'Ext.Button',
    xtype: 'momo-rbma-button',
    requires: [
        'Ext.app.ViewModel',

        'MoMo.client.view.button.RbmaController',
        'MoMo.client.view.button.RbmaModel'
    ],

    controller: 'button.rbma',

    viewModel: 'button.rbma',

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
