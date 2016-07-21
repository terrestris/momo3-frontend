/**
 *
 */
Ext.define('MoMo.client.view.panel.RbmaTreeModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.panel.rbmatree',

    data: {
        title: 'Document tree',
        addNewFolderText: 'Add new folder',
        folderNameText: 'Folder name',
        folderNamePromptText: 'Enter folder name',
        addNewLeafText: 'Add new document',
        leafNameText: 'Document name',
        leafNamePromptText: 'Enter document name',
        renameFolderText: 'Rename folder',
        folderNewNamePromptText: 'Enter new folder name',
        deleteFolderText: 'Delete folder',
        warningTitle: 'Warning',
        deleteFolderWarnMsgText: 'All contained documents will be also deleted. ' +
            'Are you sure?',
        renameLeafText: 'Rename document',
        leafNewNamePromptText: 'Enter new document name',
        deleteLeafText: 'Delete document',
        deleteLeafWarnMsgText: 'This document will be removed from the tree. ' +
            'Are you sure?'
    }

});
