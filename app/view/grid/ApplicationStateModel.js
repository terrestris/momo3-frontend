/**
 *
 */
Ext.define('MoMo.client.view.grid.ApplicationStateModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.grid.applicationstate',

    data: {
        columnDescriptionText: '',
        columnUrlText: '',
        columnLastModifiedText: '',
        urlColumnLinkText: '',
        deleteBtnText: '',
        loadBtnText: '',
        createBtnText: '',
        copyToClipboardSuccessMsg: '',
        copyToClipboardFailureMsg: '',
        noSelectionAvailableMsg: '',
        loadStateSuccessMsg: '',
        loadStateFailureMsg: '',
        createStatePromptMsg: '',
        createStateSuccessMsg: '',
        createStateFailureMsg: '',
        deleteStateConfirmMsg: '',
        deleteStateSuccessMsg: '',
        deleteStateFailureMsg: '',
        updateStatePromptMsg: '',
        updateStateSuccessMsg: '',
        updateStateFailureMsg: ''
    }
});
