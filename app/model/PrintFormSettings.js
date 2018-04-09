Ext.define('MoMo.client.model.PrintFormSettings', {
    extend: 'MoMo.client.model.Base',
    proxy: {
        type: 'rest',
        url: BasiGX.util.Url.getWebProjectBaseUrl() + 'rest/printsettings',
        headers: BasiGX.util.CSRF.getHeader(),
        reader: {
            type: 'json'
        }
    },

    fields: [{
        name: 'description',
        type: 'string'
    }, {
        name: 'appCombo',
        type: 'string'
    }, {
        name: 'dpi',
        type: 'int'
    }, {
        name: 'format',
        type: 'string'
    }, {
        name: 'layout',
        type: 'string'
    }, {
        name: 'legend',
        type: 'string'
    }, {
        name: 'mapNumber',
        type: 'string'
    }, {
        name: 'northArrowDef',
        type: 'string'
    }, {
        name: 'scalebar',
        type: 'string'
    }, {
        name: 'title',
        type: 'string'
    }, {
        name: 'titleAuthorName',
        type: 'string'
    }, {
        name: 'titleCoordSystemString',
        type: 'string'
    }, {
        name: 'titleDataSource',
        type: 'string'
    }, {
        name: 'titleDate',
        type: 'string'
    }, {
        name: 'titleDatumString',
        type: 'string'
    }, {
        name: 'titleProjString',
        type: 'string'
    }, {
        name: 'titleScale',
        type: 'string'
    }]
});
