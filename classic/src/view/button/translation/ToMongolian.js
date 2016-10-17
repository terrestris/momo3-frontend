/**
 * ToMongolian Button
 *
 * @class MoMo.client.view.button.translation.ToMongolian
 */
Ext.define('MoMo.client.view.button.translation.ToMongolian', {
    extend: 'Ext.Button',
    xtype: 'momo-translation-mn-button',
    requires: [
        'Ext.app.ViewModel',

        'MoMo.client.view.button.TranslationController',
        'MoMo.client.view.button.TranslationModel'
    ],

    controller: 'button.translation',

    viewModel: 'button.translation',

    ui: 'momo-header-tools',

    scale: 'small',

    /**
     *
     */
    bind: {
        tooltip: '{tooltipMn}'
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

        var viewModel = me.getViewModel();
        viewModel.set('translateTo', viewModel.get('tooltipMn'));
    }

});
