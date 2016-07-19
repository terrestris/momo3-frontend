Ext.define('MoMo.client.store.Rbma', {

    extend: 'Ext.data.TreeStore',

    alias: 'store.rbma',

    //model: 'MoMo.client.model.Rbma',

    mode: 'local',

    root: {
        expanded: true,
        text: "Document root"
    },
    data: [{
        text: "Chapter 1",
        children: [{
            text: "Chapter 1.1",
            leaf: true
        }, {
            text: "Chapter 1.2",
            expanded: true,
            children: [{
                text: "Chapter 1.2.1",
                leaf: true
            }, {
                text: "Chapter 1.2.2",
                leaf: true
            }]
        }]
    }, {
        text: "Chapter 2",
        expanded: true,
        children: [{
            text: "Chapter 2.1",
            leaf: true
        }]
    }]

});