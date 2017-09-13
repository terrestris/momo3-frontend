
Ext.define('MoMo.view.window.WaterDataChartWindow',{
    extend: 'Ext.window.Window',
    xtype: 'momo-waterdatachart',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.CrossZoom',
        'Ext.ux.DateTimeField',
        'MoMo.client.store.ChemicalAndPhysicalWaterData',
        'MoMo.client.store.WaterData'
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

    width: 900,

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
    initComponent: function(cfg) {
        var me = this;
        me.callParent([cfg]);

        var feat = me.chartFeature.getProperties();


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

        var isLocationsMaster = me.chartFeature.get('layer').get('name') ===
            'locations_master';

        if (isLocationsMaster) {
            // chemical and physical data
            me.store = Ext.create(
                'MoMo.client.store.ChemicalAndPhysicalWaterData');
            me.store.on('load', function(store, recs) {
                me.setupAxesAndSeries(store, recs);
            });
        } else {
            // ecotech locations
            me.store = Ext.create('MoMo.client.store.WaterData');
            me.store.on('load', function() {
                me.setupAxesAndSeries();
            });
        }

        me.add([{
            xtype: 'displayfield',
            width: '100%',
            fieldStyle: {
                "text-align": 'center'
            },
            bind: {
                value: me.getController().setChartHeader('{altitude}', feat)
            }
        }, {
            xtype: 'panel',
            name: 'chartpanel',
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
                series: [],
                axes: []
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
                            var win = this.up('momo-waterdatachart');
                            var form = this.up().up();
                            // destroy old chart if locations_master is used
                            var recreateChart = win.chartFeature.get(
                                'layer').get('name') === 'locations_master';
                            if (recreateChart) {
                                var chart = win.down(
                                    'cartesian');
                                if (chart) {
                                    chart.destroy();
                                    win.store = Ext.create(
                                        'MoMo.client.store.ChemicalAnd' +
                                        'PhysicalWaterData');
                                    win.store.on('load', function(store, recs) {
                                        win.setupAxesAndSeries(store, recs);
                                    });
                                }
                            }
                            form.up().getController().updateChartValues(form);
                        }
                    }
                ]
            }]
        }]);
    },

    setupAxesAndSeries: function(store, recs) {
        var axes = [];
        var series = [];
        var chart = this.down('cartesian');

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

        if (!recs) {
            if (chart && chart.getSeries().length > 0) {
                // series and axes already generated, return
                return;
            }
            // default behaviour - load ecotech location charts
            axes = [{
                type: 'numeric',
                position: 'left',
                fields: [
                    '°C',
                    'uS/cm',
                    'pH',
                    'NTU',
                    'ug/l',
                    '%local',
                    'mg/l',
                    'cm'
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
            }];

            series = [{
                type: 'line',
                xField: 'time',
                yField: '°C',
                bind: {
                    title: '{chartlegendTemp}'
                },
                marker: true,
                tooltip: commonSeriesTooltipConfig,
                highlightCfg: commonSeriesHighlightCfg
            }, {
                type: 'line',
                xField: 'time',
                yField: 'uS/cm',
                bind: {
                    title: '{chartlegendLeitfaehigkeit}'
                },
                marker: true,
                tooltip: commonSeriesTooltipConfig,
                highlightCfg: commonSeriesHighlightCfg
            }, {
                type: 'line',
                xField: 'time',
                yField: 'pH',
                bind: {
                    title: '{chartlegendpH}'
                },
                marker: true,
                tooltip: commonSeriesTooltipConfig,
                highlightCfg: commonSeriesHighlightCfg
            }, {
                type: 'line',
                xField: 'time',
                yField: 'NTU',
                bind: {
                    title: '{chartlegendTruebung}'
                },
                marker: true,
                tooltip: commonSeriesTooltipConfig,
                highlightCfg: commonSeriesHighlightCfg
            }, {
                type: 'line',
                xField: 'time',
                yField: 'ug/l',
                bind: {
                    title: '{chartlegendChlorophyll}'
                },
                marker: true,
                tooltip: commonSeriesTooltipConfig,
                highlightCfg: commonSeriesHighlightCfg
            }, {
                type: 'line',
                xField: 'time',
                yField: '%local',
                bind: {
                    title: '{chartlegendSauerstoff}'
                },
                marker: true,
                tooltip: commonSeriesTooltipConfig,
                highlightCfg: commonSeriesHighlightCfg
            }, {
                type: 'line',
                xField: 'time',
                yField: 'mg/l',
                bind: {
                    title: '{chartlegendSauerstoff2}'
                },
                marker: true,
                tooltip: commonSeriesTooltipConfig,
                highlightCfg: commonSeriesHighlightCfg
            }, {
                type: 'line',
                xField: 'time',
                yField: 'cm',
                bind: {
                    title: '{chartlegendWasserstand}'
                },
                marker: true,
                tooltip: commonSeriesTooltipConfig,
                highlightCfg: commonSeriesHighlightCfg
            }];
        } else {
            // chemical data
            axes = [{
                type: 'numeric',
                position: 'left',
                fields: []
            }, {
                type: 'time',
                dateFormat: 'Y-m-d H:i',
                position: 'bottom',
                fields: ['date_s'],
                label: {
                    rotate: {
                        degrees: -45
                    },
                    fontSize: 10
                }
            }];

            var parameters = [];
            Ext.each(recs, function(rec) {
                var parameter = rec.get('parameter');
                parameter += ' (' + rec.get('parameter_name') + ')';
                if (rec.get('parameter_unit')) {
                    parameter += ' - ' + rec.get('parameter_unit');
                }

                var oldLength = parameters.length;
                parameters = Ext.Array.merge(parameters, parameter);
                var newLength = parameters.length;

                var index = Ext.Array.indexOf(parameters, parameter);
                var displayKey = 'displayValue' + index;
                rec.data[displayKey] = rec.get('parameter_value');
                if (oldLength !== newLength) {
                    // new parameter, need to create a series
                    series.push({
                        type: 'line',
                        xField: 'date_s',
                        yField: displayKey,
                        title: parameter,
                        marker: true,
                        tooltip: commonSeriesTooltipConfig,
                        highlightCfg: commonSeriesHighlightCfg
                    });
                    axes[0].fields.push(displayKey);
                }
            });
        }
        if (!chart) {
            // recreate chart
            this.insert(2, {
                xtype: 'cartesian',
                reference: 'chart',
                bodyPadding: '0 10px 0 10px',
                height: 400,
                store: this.store,
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
                series: series,
                axes: axes
            });
        } else {
            chart.setAxes(axes);
            chart.setSeries(series);
        }
    }
});
