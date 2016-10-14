
Ext.define('MoMo.view.window.WaterDataChartWindow',{
    extend: 'Ext.window.Window',
    xtype: 'momo-waterdatachart',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.CrossZoom',
        'Ext.ux.DateTimeField'
    ],

    controller: 'window.waterdatachart',

    viewModel: 'window.waterdatachart',

    /**
     *
     */
    waterData: null,

    /**
     * Corresponding feature on the map that was clicked before chart
     * informations are retrieved
     */
    chartFeature: null,

    layout: 'auto',

    width: 700,

    scrollable: true,

    resizable: false,

    constrainHeader: true,

    store: null,

    bind: {
        title: '{title}'
    },

    /**
     * Initializes this component
     */
    initComponent: function(cfg){
        var me = this;
        me.callParent([cfg]);

        var feat = me.chartFeature.getProperties();

        me.store = Ext.create('MoMo.client.store.WaterData');

        // instances of Ext.ux.DateTimeField
        // taken from https://github.com/gportela85/DateTimeField
        var startDatePicker = Ext.widget("datetimefield", {
            fieldLabel: me.getViewModel().get('dateFieldFromLabel'),
            todayText: me.getViewModel().get('currentDayBtnText'),
            hourText: me.getViewModel().get('hourLabel'),
            minuteText: me.getViewModel().get('minuteLabel'),
            name: 'from_date',
            format:'Y-m-d H:i:s',
            flex: 2
        });

        var endDatePicker = Ext.widget("datetimefield", {
            fieldLabel: me.getViewModel().get('dateFieldToLabel'),
            todayText: me.getViewModel().get('currentDayBtnText'),
            hourText: me.getViewModel().get('hourLabel'),
            minuteText: me.getViewModel().get('minuteLabel'),
            name: 'to_date',
            format:'Y-m-d H:i:s',
            flex: 2
        });

        var commonSeriesTooltipConfig = {
            trackMouse: true,
            showDelay: 0,
            dismissDelay: 0,
            hideDelay: 0,
            renderer: 'onSeriesTooltipRender'
        };

        var commonSeriesHighlightCfg = {
            scaling: 1.5
        };

        me.add([{
            xtype: 'displayfield',
            width: '100%',
            fieldStyle: {
                "text-align": 'center'
            },
            value: me.setChartHeader(feat)
        }, {
            xtype: 'panel',
            style: {
                padding: '0 10px 0 0'
            },
            tbar: [
                '->',
                {
                    bind: {
                        text: '{undoZoomBtnText}'
                    },
                    handler: 'onZoomUndo'
                }
            ],
            items: [{
                xtype: 'cartesian',
                reference: 'chart',
                bodyPadding: '0 10px 0 10px',
                height: 400,
                store: me.store,
                legend: {
                    docked: 'right',
                    border: 0,
                    style: {
                        margin: '0 0 0 30px'
                    }
                },
                interactions: {
                    type: 'crosszoom',
                    zoomOnPanGesture: false
                },
                insetPadding: '20 20 10 10',
                series: [{
                    type: 'line',
                    xField: 'time',
                    yField: '°C:1',
                    marker: true,
                    tooltip: commonSeriesTooltipConfig,
                    highlightCfg: commonSeriesHighlightCfg
                }, {
                    type: 'line',
                    xField: 'time',
                    yField: 'uS/cm:(do.)',
                    marker: true,
                    tooltip: commonSeriesTooltipConfig,
                    highlightCfg: commonSeriesHighlightCfg
                }, {
                    type: 'line',
                    xField: 'time',
                    yField: 'pH:(do.)',
                    marker: true,
                    tooltip: commonSeriesTooltipConfig,
                    highlightCfg: commonSeriesHighlightCfg
                }, {
                    type: 'line',
                    xField: 'time',
                    yField: 'NTU:(do.)',
                    marker: true,
                    tooltip: commonSeriesTooltipConfig,
                    highlightCfg: commonSeriesHighlightCfg
                }, {
                    type: 'line',
                    xField: 'time',
                    yField: 'ug/l:(do.)',
                    marker: true,
                    tooltip: commonSeriesTooltipConfig,
                    highlightCfg: commonSeriesHighlightCfg
                }, {
                    type: 'line',
                    xField: 'time',
                    yField: '%local:(do.)',
                    marker: true,
                    tooltip: commonSeriesTooltipConfig,
                    highlightCfg: commonSeriesHighlightCfg
                }, {
                    type: 'line',
                    xField: 'time',
                    yField: 'mg/l:(do.)',
                    marker: true,
                    tooltip: commonSeriesTooltipConfig,
                    highlightCfg: commonSeriesHighlightCfg
                }, {
                    type: 'line',
                    xField: 'time',
                    yField: 'cm:0',
                    marker: true,
                    tooltip: commonSeriesTooltipConfig,
                    highlightCfg: commonSeriesHighlightCfg
                }, {
                    type: 'line',
                    xField: 'time',
                    yField: 'HK-Bat:V',
                    marker: true,
                    tooltip: commonSeriesTooltipConfig,
                    highlightCfg: commonSeriesHighlightCfg
                }, {
                    type: 'line',
                    xField: 'time',
                    yField: 'HK-Temp:oC',
                    marker: true,
                    tooltip: commonSeriesTooltipConfig,
                    highlightCfg: commonSeriesHighlightCfg
                }, {
                    type: 'line',
                    xField: 'time',
                    yField: 'HK-rH:%',
                    marker: true,
                    tooltip: commonSeriesTooltipConfig,
                    highlightCfg: commonSeriesHighlightCfg
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
                    ]
                }, {
                    type: 'time',
                    dateFormat: 'Y-m-d H:i',
                    position: 'bottom',
                    fields: ['time'],
                    label: {
                        rotate: {
                            degrees: -45
                        },
                        fontSize: 10
                    }
                }]
            }]
        }, {
            xtype: 'form',
            bodyPadding: 10,
            items: [{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'justify'
                },
                defaults: {
                    labelWidth: 40,
                    allowBlank: false,
                    value: new Date(),
                    style: {
                        margin: '0 10px 0 10px'
                    },
                    flex: 1
                },
                items: [
                    startDatePicker,
                    endDatePicker,
                    {
                        xtype: 'button',
                        bind: {
                            text: '{updateTimeRangeBtnText}'
                        },
                        formBind: true,
                        handler: function () {
                            var form = this.up().up();
                            form.up().getController().updateChartValues(form);
                        }
                    }
                ]
            }]
        }]);
    },

    /**
     * Creates chart header with some informations (e.g. station name and
     * altitude) about clicked feature
     * @param {ol.Feat} feat clicked feature
     */
    setChartHeader: function(feat){
        var header = '<h3>' + feat.measuring_point + ' - ' + feat.station_id +
            '</h3><p>Altitude: ' + feat.altitude + '</p>';
        return header;
    }
});
