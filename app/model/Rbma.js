Ext.define('MoMo.client.model.Rbma', {

    extend: 'Ext.data.Model',

//    proxy: {
//        type: 'rest',
//        // TODO create the backend service
//        url: BasiGX.util.Url.getWebProjectBaseUrl() + 'rest/getRbma',
//        headers: BasiGX.util.CSRF.getHeader()
//    },

    fields: [{
        name: 'id',
        type: 'auto',
        allowNull: true
    }, {
        name: 'name',
        type: 'string'
    }]
});
