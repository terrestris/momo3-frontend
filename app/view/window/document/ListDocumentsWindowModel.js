Ext.define('MoMo.client.view.window.document.ListDocumentsWindowModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.window.document.listdocuments',

    data: {
        /*i18n*/
        title: '',
        textOpenSelectedDoc: '',
        textDeleteSelectedDoc: '',
        textCreateNewDoc: '',
        textPromptMessageNewDoc: '',
        textDeleteDoc: '',
        textPromptDeleteDoc: '',
        textUnknownError: '',
        textCouldNotCreateDocument: '',
        textCouldNotDeleteDocument: '',
        textSuccessDeleteDoc: '',
        /*i18n*/
        docSelected: false
    }
});
