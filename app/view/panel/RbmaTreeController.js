/**
 *
 */
Ext.define('MoMo.client.view.panel.RbmaTreeController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.panel.rbmatree',

    /**
     *
     */
    setRbmaStore: function() {
        var me = this;
        var view = me.getView();

        var rbmaStore = Ext.create('MoMo.client.store.Rbma', {
            autoLoad: true
        });

        view.store = rbmaStore;
    },

    /**
     *
     */
    onItemContextMenuClick: function(view, rec, item, index, e, eOpts){

        var me = this;

        peter = me;

        // forbid the standard browser context menu
        e.preventDefault();

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
    },

    /**
     *
     */
    createFolderContextMenu: function(record) {
        var me = this,
            folderContextMenu;

        if (!record || (record && record.get('leaf'))) {
            return false;
        }

        var addFolder = Ext.create('Ext.menu.Item', {
            text: 'Add new folder',
            handler: function(){
                Ext.Msg.prompt('Folder name', 'Enter folder name', function(btn, text, cfg){
                    if(btn == 'ok') {
                        if (Ext.isEmpty(text)) {
                            Ext.Msg.show(Ext.apply({}, cfg));
                        }
                        record.appendChild({
                            text: text,
                            leaf: false
                        });
                        me.getView().getStore().sync();
                    }
                });
            }
        });

        var addLeaf = Ext.create('Ext.menu.Item', {
            text: 'Add new document',
            handler: function(){
                Ext.Msg.prompt('Document name', 'Enter document name', function(btn, text, cfg){
                    if(btn == 'ok') {
                        if (Ext.isEmpty(text)) {
                            Ext.Msg.show(Ext.apply({}, cfg));
                        }
                        record.appendChild({
                            text: text,
                            leaf: true
                            //pdfFile: './resources/testPdf.pdf'
                        });
                        me.getView().getStore().sync();
                    }
                });
            }
        });

        var renameFolder = Ext.create('Ext.menu.Item', {
            text: 'Rename folder',
            handler: function(){
                Ext.Msg.prompt('Folder name', 'Enter new folder name', function(btn, text, cfg){
                    if(btn == 'ok') {
                        if (Ext.isEmpty(text)) {
                            Ext.Msg.show(Ext.apply({}, cfg));
                        }
                        record.set('text', text);
                        me.getView().getStore().sync();
                    }
                });
            }
        });

        var deleteFolder = Ext.create('Ext.menu.Item', {
            text: 'Delete folder',
            handler: function(){
                Ext.Msg.show({
                    title: 'Warning',
                    message: 'All contained documents will be also deleted. Are you sure?',
                    buttons: Ext.Msg.OKCANCEL,
                    ich: Ext.Msg.WARNING,
                    fn: function(btn){
                        if(btn == 'ok') {
                            record.erase();
                            me.getView().getStore().sync();
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
     *
     */
    createLeafContextMenu: function(record) {
        var me = this,
            leafContextMenu;

        if (!record || (record && !record.get('leaf'))) {
            return false;
        }

        var addLeaf = Ext.create('Ext.menu.Item', {
            text: 'Add new document',
            handler: function(){
                Ext.Msg.prompt('Document name', 'Enter document name', function(btn, text, cfg){
                    if(btn == 'ok') {
                        if (Ext.isEmpty(text)) {
                            Ext.Msg.show(Ext.apply({}, cfg));
                        }
                        record.appendChild({
                            text: text,
                            leaf: true,
                            pdfFile: './resources/testPdf.pdf'
                        });
                        me.getView().getStore().sync();
                    }
                });
            }
        });

        var renameLeaf = Ext.create('Ext.menu.Item', {
            text: 'Rename document',
            handler: function(){
                Ext.Msg.prompt('Document name', 'Enter new document name', function(btn, text, cfg){
                    if(btn == 'ok') {
                        if (Ext.isEmpty(text)) {
                            Ext.Msg.show(Ext.apply({}, cfg));
                        }
                        record.set('text', text);
                        me.getView().getStore().sync();
                    }
                });
            }
        });

        var deleteLeaf = Ext.create('Ext.menu.Item', {
            text: 'Delete document',
            handler: function(){
                Ext.Msg.show({
                    title: 'Warning',
                    message: 'This document will be removed from the tree. Are you sure?',
                    buttons: Ext.Msg.OKCANCEL,
                    ich: Ext.Msg.WARNING,
                    fn: function(btn){
                        if(btn == 'ok') {
                            record.erase();
                            me.getView().getStore().sync();
                        }
                    }
                });
            }
        });

        leafContextMenu = Ext.create('Ext.menu.Menu', {
            plain: true,
            type: 'leaf-context-menu',
            items: [
                addLeaf,
                renameLeaf,
                deleteLeaf
            ]
        });

        return leafContextMenu;
    }

});
