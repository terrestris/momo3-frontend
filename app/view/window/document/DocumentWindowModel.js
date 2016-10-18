Ext.define('MoMo.client.view.window.DocumentWindowModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.window.document.document',

    data: {
        title : '' // Should NOT be translated via CSV/locale as this will
                   // dynamically contain the name of the document (root)
    }
});
