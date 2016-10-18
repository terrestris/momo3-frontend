/**
 *
 */
Ext.define('MoMo.client.view.panel.document.DocumentTreeModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.panel.document.documenttree',

    data: {
        title: 'Document tree',
        addNewFolderText: 'Add new folder',
        folderNameText: 'Folder name',
        folderNamePromptText: 'Enter folder name',
        addNewLeafText: 'Add new document',
        leafNameText: 'Document name',
        leafNamePromptText: 'Enter document name',
        addDocumentText: 'Attach/replace PDF document',
        renameFolderText: 'Rename folder',
        folderNewNamePromptText: 'Enter new folder name',
        deleteFolderText: 'Delete folder',
        warningTitle: 'Warning',
        deleteFolderWarnMsgText: 'All contained documents will be also ' +
            'deleted. Are you sure?',
        renameLeafText: 'Rename document',
        leafNewNamePromptText: 'Enter new document name',
        deleteLeafText: 'Delete document',
        deleteLeafWarnMsgText: 'This document will be removed from tree. ' +
            'Are you sure?'
    }

});
