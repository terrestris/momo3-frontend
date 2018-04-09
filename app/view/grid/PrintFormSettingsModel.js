/**
 *
 */
Ext.define('MoMo.client.view.grid.PrintFormSettingsModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.grid.printformsettings',

    data: {
        columnDescriptionText: '',
        columnLastModifiedText: '',
        deleteBtnText: '',
        loadBtnText: '',
        createBtnText: '',
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
