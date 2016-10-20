Ext.define('MoMo.client.view.window.document.ListDocumentsWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.window.document.listdocuments',

    requires: [
        'MoMo.client.window.document.DocumentWindow'
    ],

    /**
     *
     */
    onClickOpenSelectedDoc: function() {
        var selectedDoc = this.getSelectedDocument();
        var documentRootId = selectedDoc.get('id');
        var documentName = selectedDoc.get('name');

        var documentWindow = Ext.create(
            'MoMo.client.window.document.DocumentWindow', {
                docRootId: documentRootId
            }
        );

        documentWindow.getViewModel().set('title', documentName);

        documentWindow.show();
    },

    /**
     *
     */
    onClickCreateNewDoc: function() {
        var me = this;
        var vm = me.getViewModel();

        var promptTitle = vm.get('textCreateNewDoc');
        var promptText = vm.get('textPromptMessageNewDoc');

        Ext.Msg.prompt(
            promptTitle,
            promptText,
            function(btn, text) {
                if(btn === 'ok') {
                    var window = me.getView();
                    var grid = window.down('grid');
                    var store = grid.getStore();
                    var proxy = store.getProxy();
                    var url = proxy.getUrl();

                    window.setLoading(true);

                    Ext.Ajax.request({
                        url: url,
                        method: "POST",
                        params: {
                            name: text
                        },
                        headers: BasiGX.util.CSRF.getHeader(),
                        callback: function() {
                            window.setLoading(false);
                        },
                        success: function() {
                            store.reload();
                        },
                        failure: function(response) {
                            var msg = vm.get('textUnknownError');
                            if(response.status && response.statusText) {
                                msg = vm.get('textCouldNotCreateDocument') +
                                    '<br>' + response.statusText +
                                    ' (HTTP Status ' + response.status + ')';
                            }
                            BasiGX.util.MsgBox.error(msg);
                        }
                    });

                }
            },
            me
        );
    },

    /**
     *
     */
    onClickDeleteSelectedDoc: function() {
        var me = this;
        var vm = me.getViewModel();

        var selectedDoc = me.getSelectedDocument();
        var documentRootId = selectedDoc.get('id');
        var documentName = selectedDoc.get('name');

        var promptTitle = vm.get('textDeleteDoc');
        var promptDeleteDocTmpl = vm.get('textPromptDeleteDoc');
        var successDeleteDocTmpl = vm.get('textSuccessDeleteDoc');

        var promptText = Ext.String.format(promptDeleteDocTmpl, documentName);
        var successDeleteText =
            Ext.String.format(successDeleteDocTmpl, documentName);

        var confirmCfg = {
            title: promptTitle,
            fn: function(btn) {
                if(btn === 'yes') {
                    var window = me.getView();
                    var grid = window.down('grid');
                    var store = grid.getStore();
                    var proxy = store.getProxy();
                    var url = proxy.getUrl() + '/' + documentRootId;

                    window.setLoading(true);

                    Ext.Ajax.request({
                        url: url,
                        method: "DELETE",
                        headers: BasiGX.util.CSRF.getHeader(),
                        callback: function() {
                            window.setLoading(false);
                        },
                        success: function() {
                            store.reload();
                            BasiGX.util.MsgBox.info(successDeleteText);
                        },
                        failure: function(response) {
                            var msg = vm.get('textUnknownError');
                            if(response.status && response.statusText) {
                                msg = vm.get('textCouldNotDeleteDocument') +
                                    '<br>' + response.statusText +
                                    ' (HTTP Status ' + response.status + ')';
                            }
                            BasiGX.util.MsgBox.error(msg);
                        }
                    });
                }
            }
        };

        BasiGX.util.MsgBox.confirm(promptText, confirmCfg);

    },

    /**
    *
    */
    getSelectedDocument: function() {
        var listDocumentsWindow = this.getView();
        var documentsGrid = listDocumentsWindow.down('grid');
        var selectedDoc = null;

        var selection = documentsGrid.getSelection();
        if(Ext.isArray(selection) && !Ext.isEmpty(selection)) {
            selectedDoc = selection[0];
        }

        return selectedDoc;
    }
});
