Ext.define('MoMo.client.model.MomoUser', {

    extend: 'MoMo.client.model.Base',

    proxy: {
        type: 'rest',
        url: BasiGX.util.Url.getWebProjectBaseUrl() + 'rest/users',
        headers: BasiGX.util.CSRF.getHeader()
    },

    fields: [{
        name: 'active',
        type: 'boolean'
    }, {
        name: 'email',
        type: 'string'
    }, {
        name: 'password',
        type: 'string'
    }, {
        name: 'firstName',
        type: 'string'
    }, {
        name: 'fullName',
        type: 'string',
        calculate: function(data){
            return data.firstName + ' ' + data.lastName;
        },
        depends: [ 'firstName', 'lastName' ],
        persist: false
    }, {
        name: 'language',
        type: 'string'
    }, {
        name: 'lastName',
        type: 'string'
    }]

});
