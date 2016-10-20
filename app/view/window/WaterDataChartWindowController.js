Ext.define('MoMo.view.window.WaterDataChartWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.window.waterdatachart',

    /**
     * Restores the previous chart zoom level.
     * Taken from
     * http://examples.sencha.com/extjs/6.0.0/examples/kitchensink/
     * ?charts=true#line-crosszoom
     */
    onZoomUndo: function() {
        var chart = this.lookupReference('chart'),
            interaction =
                chart && Ext.ComponentQuery.query('interaction', chart)[0],
            undoButton = interaction && interaction.getUndoButton(),
            handler = undoButton && undoButton.handler;
        if (handler) {
            handler();
        }
    },

    /**
     * Creates chart header with some informations (e.g. station name and
     * altitude) about clicked feature
     * @param {ol.Feat} feat clicked feature
     */
    setChartHeader: function(feat){
        var altitude = this.getViewModel().get('altitude');
        var header = '<h3>' + feat.measuring_point + ' - ' + feat.station_id +
            '</h3><p>' + altitude + ': ' + feat.altitude + '</p>';
        return header;
    },

    /**
    * Updates chart values after some date and time are set and update button
    * was clicked. Additionally the validity of input dates will be checked
    * here (s. #validateTimeRange method)
    * @param {Ext.form.field.Field} form the date picker and chart are bound to
    */
    updateChartValues: function(form) {
        var me = this,
            chartFeat = me.getView().chartFeature;

        var from_date = new Date(form.getValues().from_date);
        var to_date = new Date(form.getValues().to_date);

        if (me.validateTimeRange(from_date, to_date)) {
            // Ymd\\THis --> 20161014T103000
            var from = Ext.Date.format(from_date, 'Ymd\\THis');
            var to = Ext.Date.format(to_date, 'Ymd\\THis');
            var station_id = chartFeat.getProperties().station_id;

            var store = me.getView().down('chart').getStore();
            var proxy = store.getProxy();
            proxy.setExtraParam("viewparams", 'station_id:' + station_id +
                    ';startdate:' + from + ';enddate:' + to);

            store.load();
        } else {
            Ext.each(form.getForm().getFields().items, function(f){
                f.markInvalid({
                    message: '',
                    msgTarget: 'side'
                });
            });
        }
    },

    /**
     * Validates given start end time via simple integer values
     * comparison
     * @param startDate
     * @param endDate
     */
    validateTimeRange: function(startDate, endDate){
        var start = Ext.Date.format(startDate, 'YmdHis');
        var end = Ext.Date.format(endDate, 'YmdHis');
        if (parseInt(start, 10) < parseInt(end, 10)) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * Renders tooltip that will be shown for each chart item on mouse hover
     * @param
     * @param
     * @param
     */
    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(item.field + ': ' + record.get(item.field));
    }
});
