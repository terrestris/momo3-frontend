Ext.define('MoMo.client.model.ChemicalAndPhysicalWaterData', {

    extend: 'Ext.data.Model',

    proxy: {
        type: 'rest',
        url: '/momo/geoserver.action',
        headers: BasiGX.util.CSRF.getHeader(),
        extraParams: {
            service: 'WFS',
            version: '1.1.0',
            request: 'GetFeature',
            outputFormat: 'application/json',
            typeName: 'momo:chemicalandphysical_data'
        },
        reader: {
            type: 'json',
            rootProperty: 'features',
            transform: {
                fn: function(data) {
                    var result = [];
                    Ext.each(data.features, function(feat) {
                        result.push(feat.properties);
                    });
                    return result;
                }
            }
        }
    },
    fields: [
        {
            name: 'date_s',
            type: 'date',
            dateFormat: 'Y-m-d H:i',
            convert: function(value){
                return new Date(value);
            }
        }
    ]
});
