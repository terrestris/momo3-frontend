Ext.define('MoMo.client.view.button.TranslationController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.button.translation',


    /**
    *
    */
    onClick: function() {
        var me = this;
        var viewModel = me.getViewModel();
        var lang = viewModel.get('translateTo').toUpperCase();

        Ext.Msg.alert(
            'Info',
            'Application will be translated in ' +
                viewModel.get('translateTo').toUpperCase() +' now.'
        );

        viewModel.set('tooltip', lang);
    }
});
