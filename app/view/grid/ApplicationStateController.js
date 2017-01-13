Ext.define('MoMo.client.view.grid.ApplicationStateController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.grid.applicationstate',

    requires: [
        'BasiGX.util.Url',

        'MoMo.client.model.ApplicationState',
        'MoMo.client.util.ApplicationContext',
        'MoMo.client.util.ApplicationState',
        'MoMo.client.util.CopyClipboard',
        'MoMo.client.util.OlStyle'
    ],

    /**
     * Override the url to load webapp specific app states.
     */
    onAfterRender: function() {
        var me = this;
        var view = me.getView();
        var store = view.getStore();
        var webMapId = MoMo.client.util.ApplicationContext
                .getApplicationContext().id;

        store.load({
            url: store.getProxy().url + '/webmap/' + webMapId
        });

        me.registerKeyNav();
    },

    /**
     *
     */
    registerKeyNav: function() {
        var me = this;
        var view = me.getView();

        new Ext.util.KeyMap({
            target: view.getEl(),
            binding: [{
                key: 'c',
                ctrl: true,
                fn: function() {
                    me.copyUrlToClipboard();
                },
                scope: me
            }]
        });
    },

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
                    me.deleteApplicationState(selections[0]);
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
            me.loadApplicationState(selections[0]);
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
                        me.createApplicationState({
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
                        me.updateApplicationState(selections[0]);
                    }
                },
                scope: me
            });
        }
    },

    /**
     *
     */
    copyUrlToClipboard: function() {
        var me = this;
        var view = me.getView();
        var viewModel = me.getViewModel();
        var selection = view.getSelection()[0];

        if (!selection) {
            Ext.toast(viewModel.get('noSelectionAvailableMsg'));
            return false;
        }

        var gridView = view.getView();
        var gridNode = gridView.getNode(selection);

        var columnId;
        Ext.each(view.getColumns(), function(column) {
            if (column.copyToClipboardColumn) {
                columnId = column.getId();
                return false;
            }
        });

        var gridNodeColumnEl = gridNode.querySelector('td[data-columnid=' +
                columnId + '] a');

        if (gridNodeColumnEl) {
            MoMo.client.util.CopyClipboard.copyTextToClipboard(
                    gridNodeColumnEl.href,
                    me.onCopyToClipboardSuccess,
                    me.onCopyToClipboardFailure,
                    me
            );
        }
    },

    /**
     *
     */
    onCopyToClipboardSuccess: function() {
        var viewModel = this.getViewModel();
        Ext.toast(viewModel.get('copyToClipboardSuccessMsg'));
    },

    /**
     *
     */
    onCopyToClipboardFailure: function() {
        var viewModel = this.getViewModel();
        Ext.toast(viewModel.get('copyToClipboardFailureMsg'));
    },

    /**
     *
     */
    loadApplicationState: function(applicationState) {
        var me = this;

        MoMo.client.util.ApplicationState.setState(
                applicationState, me.onLoadSuccess, me.onLoadFailure, me);
    },

    /**
     *
     */
    createApplicationState: function(opts) {
        var me = this;
        var applicationState = Ext.create('MoMo.client.model.ApplicationState',
                    MoMo.client.util.ApplicationState.getState(opts));

        MoMo.client.util.ApplicationState.saveApplicationState(
                applicationState, me.onCreateSuccess, me.onCreateFailure, me);
    },

    /**
     *
     */
    deleteApplicationState: function(applicationState) {
        var me = this;

        MoMo.client.util.ApplicationState.deleteApplicationState(
                applicationState, me.onDeleteSuccess, me.onDeleteFailure, me);
    },

    /**
     *
     */
    updateApplicationState: function(applicationState) {
        var me = this;

        var state = MoMo.client.util.ApplicationState.getState();

        applicationState.set('layers', state.layers);
        applicationState.set('mapView', state.mapView);
        applicationState.set('redlining', state.redlining);

        MoMo.client.util.ApplicationState.saveApplicationState(
                applicationState, me.onUpdateSuccess, me.onUpdateFailure, me);
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
    },

    /**
     *
     */
    urlColumnRenderer: function(token) {
        var me = this;
        var viewModel = me.getViewModel();
        var appId = MoMo.client.util.ApplicationContext
                .getApplicationContext().id;
        var url = Ext.String.format('{0}client?id={1}&state={2}',
                BasiGX.util.Url.getWebProjectBaseUrl(), appId, token);

        return Ext.String.format('<a href="{0}" target="_blank"> {1}</a>', url,
                viewModel.get('urlColumnLinkText'));
    }

});
