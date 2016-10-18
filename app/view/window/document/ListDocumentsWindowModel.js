Ext.define('MoMo.client.view.window.ListDocumentsWindowModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.window.document.listdocuments',

    data: {
        title: 'Documents',
        textOpenSelectedDoc: 'Open selected document',
        textDeleteSelectedDoc: 'Delete selected document',
        textCreateNewDoc: 'Create new document',
        textPromptMessageNewDoc: 'Please enter a name for the new document',
        textUnknownError: 'An unknown error occured.',
        textCouldNotCreateDocument: 'Could not create document.',
        docSelected: false
    }
});
