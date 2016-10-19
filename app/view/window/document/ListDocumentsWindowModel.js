Ext.define('MoMo.client.view.window.ListDocumentsWindowModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.window.document.listdocuments',

    data: {
        title: 'Documents',
        textOpenSelectedDoc: 'Open selected document',
        textDeleteSelectedDoc: 'Delete selected document',
        textCreateNewDoc: 'Create new document',
        textPromptMessageNewDoc: 'Please enter a name for the new document',
        textDeleteDoc: 'Delete a document',
        textPromptDeleteDoc: 'Are you really sure that you want to delete ' +
            'the document "{0}"?',
        textUnknownError: 'An unknown error occured.',
        textCouldNotCreateDocument: 'Could not create document.',
        textCouldNotDeleteDocument: 'Could not delete document.',
        textSuccessDeleteDoc: 'Successfully deleted the document "{0}"',
        docSelected: false
    }
});
