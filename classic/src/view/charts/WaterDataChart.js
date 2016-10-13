
Ext.define('MoMo.view.charts.WaterDataChart',{
    extend: 'Ext.window.Window',
    xtype: 'momo-waterdatachart',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.CrossZoom'
    ],

    controller: 'charts.waterdatachart',
    viewModel: 'charts.waterdatachart',

    waterData: null,

    chartFeature: null,

    layout: 'vbox',

    width: 650,

    scrollable: true,

    constrainHeader: true,

    store: null,

    bind: {
        title: '{title}'
    },

    initComponent: function(cfg){
        var me = this;
        me.callParent([cfg]);

        var feat = me.chartFeature.getProperties();

        me.store = Ext.create('MoMo.client.store.WaterData');

        me.add([
//            {
//                xtype: 'panel',
//                html: '<h1>' + feat.measuring_point + ' - '  + feat.station_id + '</h1>'
//                    + '<p>Altitude: ' + feat.altitude + '</p>'
//            },
            {
                xtype: 'panel',
                tbar: [
                       '->',
                       {
                           text: 'Undo Zoom',
                           handler: 'onZoomUndo'
                       }
                ],
                width: 650,
                items: [{
                    xtype: 'cartesian',
                    reference: 'chart',
                    width: '100%',
                    height: 400,
                    store: me.store,
                    interactions: {
                        type: 'crosszoom',
                        zoomOnPanGesture: false
                    },
                    insetPadding: '20 20 10 10',
                    series: [{
                        type: 'line',
                        xField: 'time',
                        yField: '°C:1',
                        marker: true
                    }, {
                        type: 'line',
                        xField: 'time',
                        yField: 'uS/cm:(do.)'
                    }, {
                        type: 'line',
                        xField: 'time',
                        yField: 'pH:(do.)'
                    }, {
                        type: 'line',
                        xField: 'time',
                        yField: 'NTU:(do.)'
                    }, {
                        type: 'line',
                        xField: 'time',
                        yField: 'ug/l:(do.)'
                    }, {
                        type: 'line',
                        xField: 'time',
                        yField: '%local:(do.)'
                    }, {
                        type: 'line',
                        xField: 'time',
                        yField: 'mg/l:(do.)'
                    }, {
                        type: 'line',
                        xField: 'time',
                        yField: 'cm:0'
                    }, {
                        type: 'line',
                        xField: 'time',
                        yField: 'HK-Bat:V'
                    }, {
                        type: 'line',
                        xField: 'time',
                        yField: 'HK-Temp:oC'
                    }, {
                        type: 'line',
                        xField: 'time',
                        yField: 'HK-rH:%'
                    }],
                    axes: [{
                        type: 'numeric',
                        position: 'left',
                        fields: [
                            'no',
                            '°C:1',
                            'uS/cm:(do.)',
                            'pH:(do.)',
                            'NTU:(do.)',
                            'ug/l:(do.)',
                            '%local:(do.)',
                            'mg/l:(do.)',
                            'cm:0',
                            'HK-Bat:V',
                            'HK-Temp:oC',
                            'HK-rH:%'
                        ],
                        titleMargin: 12,
                        title: {
                            text: 'USD to Euro'
                        }
                    }, {
                        type: 'time',
                        dateFormat: 'Y-m-d',
                        visibleRange: [0, 1],
                        position: 'bottom',
                        fields: ['time'],
                        titleMargin: 12,
                        title: {
                            text: 'Date'
                        }
                    }]
                }]
            },
            {
                xtype: 'form',
                bodyPadding: 10,
//                layout: 'hbox',
                items: [{
                    xtype: 'datefield',
                    fieldLabel: 'From',
                    name: 'from_date',
                    format:'d-M-Y',
                    allowBlank: false,
                    maxValue: new Date(),
                    flex: 1
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'To',
                    name: 'to_date',
                    format:'d-M-Y',
                    allowBlank: false,
                    value: new Date(),
                    flex: 1
                },
                {
                    xtype: 'button',
                    flex: 1,
                    text: 'Update Time Range',
                    formBind: true,
                    handler: function (btn) {
                        var form = this.up();
                        var me = form.up();
                        me.updateChartValues(form);
                    }
                }]
            }
        ]);

    },

    updateChartValues: function(form) {
        var me = this;

        var from_date = new Date(form.getValues().from_date);
        var from = Ext.Date.format(from_date, 'Ymd');
        var to_date = new Date(form.getValues().to_date);
        var to = Ext.Date.format(to_date, 'Ymd');
        var station_id = me.chartFeature.getProperties().station_id;

        var store = me.down('chart').getStore();
        var proxy = store.getProxy();
        proxy.setExtraParam("viewparams", 'station_id:' + station_id +
                ';startdate:' + from + 'T000000;enddate:' + to + 'T000000');

        store.load();

    }
});
