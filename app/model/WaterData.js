Ext.define('MoMo.client.model.WaterData', {

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
            typeName: 'momo:ecotech_data'
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

    fields: [{
        name: 'no',
        type: 'int',
    }, {
        name: 'time',
        type: 'date'
    }, {
        name: '°C:1',
        type: 'float'
    }, {
        name: 'uS/cm:(do.)',
        type: 'float'
    }, {
        name: 'pH:(do.)',
        type: 'float'
    }, {
        name: 'NTU:(do.)',
        type: 'float'
    }, {
        name: 'ug/l:(do.)',
        type: 'float'
    }, {
        name: '%local:(do.)',
        type: 'float'
    }, {
        name: 'mg/l:(do.)',
        type: 'float'
    }, {
        name: 'cm:0',
        type: 'float'
    }, {
        name: 'HK-Bat:V',
        type: 'float'
    }, {
        name: 'HK-Temp:oC',
        type: 'float'
    }, {
        name: 'HK-rH:%',
        type: 'float'
    }]
});
