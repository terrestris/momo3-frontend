Ext.define("MoMo.client.view.button.AddWms", {
    extend: "BasiGX.view.button.AddWms",
    xtype: 'momo-button-addwms',

    viewModel: {
        data: {
            /* i18n */
            text: null,
            tooltip: '',
            windowTitle: ''
            /* i18n */
        }
    },

    bind: {
        tooltip: '{tooltip}'
    },

    glyph: 'xf278@FontAwesome'

});
