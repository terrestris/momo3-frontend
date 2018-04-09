Ext.define('MoMo.client.view.grid.PrintFormSettingsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.grid.printformsettings',

    requires: [
        'BasiGX.util.Url',
        'MoMo.client.model.PrintFormSettings'
    ],

    /**
     *
     */
    onDeleteBtnClick: function() {
        var me = this;
        var view = me.getView();
        var viewModel = me.getViewModel();
        var selections = view.getSelection();

        if (!(selections && selections.length === 1)) {
            Ext.toast(viewModel.get('noSelectionAvailableMsg'));
            return false;
        }

        BasiGX.confirm(viewModel.get('deleteStateConfirmMsg'), {
            fn: function(decision) {
                if (decision === 'yes') {
                    me.deletePrintFormSettings(selections[0]);
                }
            },
            scope: me
        });
    },

    /**
     *
     */
    onLoadBtnClick: function() {
        var me = this;
        var view = me.getView();
        var viewModel = me.getViewModel();
        var selections = view.getSelection();

        if (selections && selections.length === 1) {
            me.loadPrintFormSettings(selections[0]);
        } else {
            Ext.toast(viewModel.get('noSelectionAvailableMsg'));
        }
    },

    /**
     *
     */
    onCreateBtnClick: function() {
        var me = this;
        var view = me.getView();
        var viewModel = me.getViewModel();
        var selections = view.getSelection();

        if (!(selections && selections.length === 1)) {
            BasiGX.prompt(viewModel.get('createStatePromptMsg'), {
                fn: function(decision, value) {
                    if (decision === 'ok') {
                        me.createPrintFormSettings({
                            description: value
                        });
                    }
                },
                scope: me
            });
        } else {
            BasiGX.confirm(viewModel.get('updateStatePromptMsg'), {
                fn: function(decision) {
                    if (decision === 'yes') {
                        me.updatePrintFormSettings(selections[0]);
                    }
                },
                scope: me
            });
        }
    },

    /**
     *
     */
    loadPrintFormSettings: function(rec) {
        var me = this;
        var printForm = Ext.ComponentQuery.query('momo-form-print')[0];
        if (!printForm) {
            return;
        }
        printForm.getForm().setValues(rec.data);
        me.onLoadSuccess();
        me.getView().up('window').close();
    },

    /**
     *
     */
    createPrintFormSettings: function(opts) {
        var me = this;
        var printForm = Ext.ComponentQuery.query('momo-form-print')[0];
        if (!printForm) {
            return;
        }
        var values = printForm.getValues();
        values.description = opts.description;
        var settingsRec = Ext.create('MoMo.client.model.PrintFormSettings',
            values
        );
        settingsRec.data.id = null;
        settingsRec.save({
            failure: me.onCreateFailure,
            success: me.onCreateSuccess,
            scope: me
        });
    },

    /**
     *
     */
    deletePrintFormSettings: function(rec) {
        var me = this;
        rec.erase({
            failure: me.onDeleteFailure,
            success: me.onDeleteSuccess,
            scope: me
        });
    },

    /**
     *
     */
    updatePrintFormSettings: function(rec) {
        var me = this;
        rec.save({
            failure: me.onUpdateFailure,
            success: me.onUpdateSuccess,
            scope: me
        });
    },

    /**
     *
     */
    onLoadSuccess: function() {
        var viewModel = this.getViewModel();
        Ext.toast(viewModel.get('loadStateSuccessMsg'));
    },

    /**
     *
     */
    onLoadFailure: function() {
        var viewModel = this.getViewModel();
        Ext.toast(viewModel.get('loadStateFailureMsg'));
    },

    /**
     *
     */
    onCreateSuccess: function() {
        var me = this;
        var viewModel = me.getViewModel();
        Ext.toast(viewModel.get('createStateSuccessMsg'));
        me.reloadStore();
    },

    /**
     *
     */
    onCreateFailure: function() {
        var viewModel = this.getViewModel();
        Ext.toast(viewModel.get('createStateFailureMsg'));
    },

    /**
     *
     */
    onDeleteSuccess: function() {
        var me = this;
        var viewModel = me.getViewModel();
        Ext.toast(viewModel.get('deleteStateSuccessMsg'));
        me.reloadStore();
    },

    /**
     *
     */
    onDeleteFailure: function() {
        var viewModel = this.getViewModel();
        Ext.toast(viewModel.get('deleteStateFailureMsg'));
    },

    /**
     *
     */
    onUpdateSuccess: function() {
        var me = this;
        var viewModel = me.getViewModel();
        Ext.toast(viewModel.get('updateStateSuccessMsg'));
        me.reloadStore();
    },

    /**
     *
     */
    onUpdateFailure: function() {
        var viewModel = this.getViewModel();
        Ext.toast(viewModel.get('updateStateFailureMsg'));
    },

    /**
     *
     */
    reloadStore: function() {
        var me = this;
        var view = me.getView();
        var gridStore = view.getStore();
        gridStore.reload();
    }

});
