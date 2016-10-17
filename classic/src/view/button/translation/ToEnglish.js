/**
 * ToEnglish Button
 *
 * @class MoMo.client.view.button.translations.ToEnglish
 */
Ext.define('MoMo.client.view.button.translation.ToEnglish', {
    extend: 'Ext.Button',
    xtype: 'momo-translation-en-button',
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
     * Check if application default language set to german
     */
    isDefaultLanguage: null,

    /**
     *
     */
    bind: {
        tooltip: '{tooltipEn}'
    },

    /**
     *
     */
    listeners: {
        click: 'onClick',
        afterrender: 'onAfterRender'
    },

    /**
     *
     */
    constructor: function(cfg) {
        var me = this;
        me.callParent([cfg]);

        var viewModel = me.getViewModel();
        viewModel.set('translateTo', viewModel.get('tooltipEn'));
    }

});
