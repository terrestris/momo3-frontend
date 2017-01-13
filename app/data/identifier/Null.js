Ext.define('MoMo.client.data.identifier.Null', {
    extend: 'Ext.data.identifier.Generator',

    alias: 'data.identifier.null',

    generate: function () {
        return null;
    }

});
