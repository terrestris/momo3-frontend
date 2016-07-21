Ext.define('MoMo.client.model.Rbma', {

    extend: 'Ext.data.TreeModel',

    proxy: {
        type: 'rest',
        url: BasiGX.util.Url.getWebProjectBaseUrl() + 'rest/rbma',
        headers: BasiGX.util.CSRF.getHeader(),
        reader: {
            type: 'json',
            transform: function(data) {
                // this fixes an issue that occured
                // when the drag'n'drop plugin was active, a folder was dropped
                // and the store was synced afterwards (only changing the index)
                if(data.leaf === false) {
                    return [data];
                }
                return data;
            }
        }
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
