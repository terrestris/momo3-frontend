Ext.define('MoMo.client.model.Base', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'BasiGX.util.Url',
        'BasiGX.util.CSRF'
    ],

    fields: [{
        name:'id',
        type:'int',
        allowNull: true
    }, {
        name: 'created',
        type: 'date',
        persist: false
    }, {
        name: 'modified',
        type: 'date',
        persist: false
    }],

    schema: {
        namespace: 'MoMo.client.model'
    }

});