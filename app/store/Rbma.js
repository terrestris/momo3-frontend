Ext.define('MoMo.client.store.Rbma', {

    extend: 'Ext.data.TreeStore',

    alias: 'store.rbma',

    model: 'MoMo.client.model.Rbma',

//    parentIdProperty: 'parentFolder',

    root: {
        expanded: false,
        text: "Document root",
        id: 678
    }
});
