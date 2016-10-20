Ext.define('MoMo.client.view.panel.document.DocumentTreeController', {
    extend: 'Ext.app.ViewController',

    requires: ['MoMo.client.util.User'],

    alias: 'controller.panel.document.documenttree',

    /**
     *
     */
    onItemClick: function(treePanel, nodeRecord) {
        var me = this;
        var nodeId = nodeRecord.get('id');
        var documentUrl =
            nodeRecord.getProxy().getUrl() + '/' + nodeId + '/doc';
        var pdfPreviewPanel =
            me.getView().up().down('momo-document-pdf-preview');

        // set iframe component visible
        if (!pdfPreviewPanel.down('component').isVisible()){
            pdfPreviewPanel.down('component').show();
        }

        // update URL to PDF document
        pdfPreviewPanel.getViewModel().set('pdfFile', documentUrl);
    },

    /**
     * Set store for the document tree
     */
    setDocumentStoreAndRootNode: function() {
        var me = this;
        var treeView = me.getView();
        var docRootId = treeView.up('window').docRootId;
        var documentStore;

        documentStore = Ext.create('MoMo.client.store.Document', {
            autoLoad: false
        });

        treeView.store = documentStore;

        // get the root node manually and set it
        // (as we did not yet mananged to
        // load the root node from the backend via rest-proxy)
        // TODO: make it better (so that store.load() would always work)
        Ext.Ajax.request({
            url: documentStore.getModel().getProxy().getUrl() + '/' + docRootId,
            success: function(response) {
                var rootNode = Ext.decode(response.responseText);
                treeView.setRootNode(rootNode);
            }
        });

    },

    /**
     * Shows a context menu on mouse right click in document tree
     * @param {Ext.view.View} View Document tree view
     * @param {Ext.data.Model} rec The record that belongs to the item
     * @param {HTMLElement} item
     * @param {Number} index The item's index
     * @param {Ext.event.Event} The raw event object
     */
    onItemContextMenuClick: function(view, rec, item, index, e){

        var me = this;

        // forbid the standard browser context menu
        e.preventDefault();

        // show this only for admins...
        if(MoMo.client.util.User.currentUserIsAdmin()) {

            // folder was clicked
            if (rec && rec.get('leaf') === false) {
                rec.contextmenu = me.createFolderContextMenu(rec);
                // leaf was clicked
            } else {
                if (!rec.contextmenu) {
                    rec.contextmenu = me.createLeafContextMenu(rec);
                }
            }
            rec.contextmenu.showAt(e.pageX, e.pageY);
        }

    },

    /**
     * Creates a folder context menu for the current record
     * @param {Ext.data.Model} record Clicked record
     * @return folderContextMenu
     */
    createFolderContextMenu: function(record){
        var me = this,
            vm = me.getViewModel(),
            folderContextMenu;

        if (!record || (record && record.get('leaf'))) {
            return false;
        }

        var addFolder = Ext.create('Ext.menu.Item', {
            text: vm.get('addNewFolderText'),
            handler: function(){
                Ext.Msg.prompt(
                    vm.get('folderNameText'),
                    vm.get('folderNamePromptText'),
                    function(btn, text, cfg){
                        if(btn === 'ok'){
                            if (Ext.isEmpty(text)) {
                                Ext.Msg.show(Ext.apply({}, cfg));
                            }
                            var cls =
                                'de.terrestris.momo.model.tree.' +
                                'DocumentTreeFolder';
                            record.appendChild({
                                '@class': cls,
                                text: text,
                                leaf: false
                            });
                            me.getView().getStore().sync();
                        }
                    }
                );
            }
        });

        var addLeaf = Ext.create('Ext.menu.Item', {
            text: vm.get('addNewLeafText'),
            handler: function(){
                Ext.Msg.prompt(
                        vm.get('leafNameText'),
                        vm.get('leafNamePromptText'),
                    function(btn, text, cfg){
                        if(btn === 'ok') {
                            if (Ext.isEmpty(text)) {
                                Ext.Msg.show(Ext.apply({}, cfg));
                            }
                            var cls =
                                'de.terrestris.momo.model.tree.' +
                                'DocumentTreeLeaf';
                            record.appendChild({
                                '@class': cls,
                                text: text,
                                leaf: true
                            });
                            me.getView().getStore().sync();
                        }
                    }
                );
            }
        });

        var renameFolder = Ext.create('Ext.menu.Item', {
            text: vm.get('renameFolderText'),
            handler: function(){
                Ext.Msg.prompt(
                    vm.get('folderNameText'),
                    vm.get('folderNewNamePromptText'),
                    function(btn, text, cfg){
                        if(btn === 'ok'){
                            if (Ext.isEmpty(text)) {
                                Ext.Msg.show(Ext.apply({}, cfg));
                            }
                            record.set('text', text);

                            if(record.get('root')) {
                                // root node need special handling because
                                // for some reason phantom is (initially) true
                                // here, which means the sync/save call would
                                // not lead to an update=PUT, but create=POST,
                                // which is wrong here
                                record.phantom = false;

                                // update the title of the window, which is
                                // the document title, i.e. the name of the
                                // root node
                                var documentWindow = me.getView().up('window');
                                var winVm = documentWindow.getViewModel();
                                winVm.set('title', text);
                            }

                            me.getView().getStore().sync();

                        }
                    },
                    me,
                    false,
                    record.get('text') // default value in the prompt field
                );
            }
        });

        var deleteFolder = Ext.create('Ext.menu.Item', {
            text: vm.get('deleteFolderText'),
            handler: function(){
                Ext.Msg.show({
                    title: vm.get('warningTitle'),
                    message: vm.get('deleteFolderWarnMsgText'),
                    buttons: Ext.Msg.OKCANCEL,
                    ich: Ext.Msg.WARNING,
                    fn: function(btn){
                        if(btn === 'ok') {
                            // remove all child nodes from the tree
                            // as the backend will remove them from the DB
                            // when erase is called on the parent node/folder
                            // that will be deleted here...
                            // otherwise some confusing situations may occur.
                            record.removeAll(false);

                            // remove the folder (and also trigger the proxy)
                            record.erase();
                        }
                    }
                });
            }
        });

        folderContextMenu = Ext.create('Ext.menu.Menu', {
            plain: true,
            type: 'folder-context-menu',
            items: [
                addFolder,
                addLeaf,
                renameFolder,
                deleteFolder
            ]
        });

        return folderContextMenu;
    },

    /**
     * Creates a leaf context menu for the current record
     * @param {Ext.data.Model} record Clicked record
     * @return leafContextMenu
     */
    createLeafContextMenu: function(record) {
        var me = this,
            vm = me.getViewModel(),
            leafContextMenu;

        if (!record || (record && !record.get('leaf'))) {
            return false;
        }

        var addOrReplaceDocument = Ext.create('Ext.menu.Item', {
            text: vm.get('addDocumentText'),
            handler: function() {
                var uploadForm =
                    Ext.create(
                        'MoMo.client.view.window.document.DocumentPdfUpload', {
                            rec: record
                        }
                    );
                uploadForm.show();
            }
        });

        var renameLeaf = Ext.create('Ext.menu.Item', {
            text: vm.get('renameLeafText'),
            handler: function(){
                Ext.Msg.prompt(
                    vm.get('leafNameText'),
                    vm.get('leafNewNamePromptText'),
                    function(btn, text, cfg){
                        if(btn === 'ok') {
                            if (Ext.isEmpty(text)) {
                                Ext.Msg.show(Ext.apply({}, cfg));
                            }
                            record.set('text', text);
                            me.getView().getStore().sync();
                        }
                    },
                    me,
                    false,
                    record.get('text') // default value in the prompt field
                );
            }
        });

        var deleteLeaf = Ext.create('Ext.menu.Item', {
            text: vm.get('deleteLeafText'),
            handler: function(){
                Ext.Msg.show({
                    title: vm.get('warningTitle'),
                    message: vm.get('deleteLeafWarnMsgText'),
                    buttons: Ext.Msg.OKCANCEL,
                    ich: Ext.Msg.WARNING,
                    fn: function(btn){
                        if(btn === 'ok') {
                            record.erase();
                        }
                    }
                });
            }
        });

        leafContextMenu = Ext.create('Ext.menu.Menu', {
            plain: true,
            type: 'leaf-context-menu',
            items: [
                renameLeaf,
                addOrReplaceDocument,
                deleteLeaf
            ]
        });

        return leafContextMenu;
    },

    /**
     * Synchronize the tree store after each drop event
     */
    onDragDrop: function () {
        var me = this;
        me.getView().getStore().sync();
    }
});
