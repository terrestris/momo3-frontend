Ext.define('MoMo.client.view.window.document.ListDocumentsWindowModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.window.document.listdocuments',

    data: {
        /*i18n*/
        title: 'gdj',
        textOpenSelectedDoc: '',
        textDeleteSelectedDoc: '',
        textCreateNewDoc: '',
        textPromptMessageNewDoc: '',
        textUnknownError: '',
        textCouldNotCreateDocument: '',
        /*i18n*/
        docSelected: false
    }
});
