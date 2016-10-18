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
        var listDocumentsWindow = this.getView();
        var documentsGrid = listDocumentsWindow.down('grid');
        var documentRootId = documentsGrid.getSelection()[0].get('id');
        var documentName = documentsGrid.getSelection()[0].get('name');

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

    }
});
