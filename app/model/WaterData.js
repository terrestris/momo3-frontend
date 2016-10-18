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
        type: 'int'
    }, {
        name: 'time',
        type: 'date',
        dateFormat: 'Y-m-d H:i',
        convert: function(value){
            var date = new Date(value);
//            var userOffset = date.getTimezoneOffset()*60000;
//            var UTCDate = new Date(date.getTime()+userOffset);
            return date;
        }
    }, {
        name: '°C',
        type: 'float'
    }, {
        name: 'uS/cm',
        type: 'float'
    }, {
        name: 'pH',
        type: 'float'
    }, {
        name: 'NTU',
        type: 'float'
    }, {
        name: 'ug/l',
        type: 'float'
    }, {
        name: '%local',
        type: 'float'
    }, {
        name: 'mg/l',
        type: 'float'
    }, {
        name: 'cm',
        type: 'float'
    }]
});
