Ext.define('MoMo.client.model.Rbma', {

    extend: 'Ext.data.TreeModel',

    proxy: {
        type: 'rest',
        url: BasiGX.util.Url.getWebProjectBaseUrl() + 'rest/rbma',
        headers: BasiGX.util.CSRF.getHeader()
    },

    fields: [{
        name: 'id',
        type: 'auto',
        allowNull: true
    }, {
        name: 'text',
        type: 'string'
    }, {
        name: 'index',
        type: 'int',
        defaultValue: -1,
        persist: true
    }]
});
