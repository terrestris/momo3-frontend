Ext.define('MoMo.client.view.viewport.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.momo-mainviewport',

    data: {
        currentView: null,
        user: null,
        currentLanguage: 'en',
        i18n: {
            helpButtonText: '',
            contextHelpTooltip: ''
        }
    }
});
