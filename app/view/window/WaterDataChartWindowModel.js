Ext.define('MoMo.view.window.WaterDataChartWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.window.waterdatachart',
    data: {
        title: 'Gewässerparameter',
        dateFieldFromLabel: 'Von',
        dateFieldToLabel: 'Bis',
        undoZoomBtnText: 'Rauszoomen',
        updateTimeRangeBtnText: 'Aktualisieren',
        currentDayBtnText: 'Heute',
        hourLabel: 'Std',
        minuteLabel: 'Min'
    }
});
