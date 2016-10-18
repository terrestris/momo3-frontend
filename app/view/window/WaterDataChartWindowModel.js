Ext.define('MoMo.view.window.WaterDataChartWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.window.waterdatachart',
    data: {
        title: 'Gewässerparameter',
//        altitude: 'Höhe',
        dateFieldFromLabel: 'Von',
        dateFieldToLabel: 'Bis',
        undoZoomBtnText: 'Rauszoomen',
        updateTimeRangeBtnText: 'Aktualisieren',
        currentDayBtnText: 'Heute',
        hourLabel: 'Std',
        minuteLabel: 'Min',
        chartlegendTemp: 'Temperatur',
        chartlegendLeitfaehigkeit: 'Leitfähigkeit',
        chartlegendpH: 'pH',
        chartlegendTruebung: 'Trübung',
        chartlegendChlorophyll: 'Chlorophyll',
        chartlegendSauerstoff: 'Sauerstoffsättigung in %',
        chartlegendSauerstoff2: 'Sauerstoffkonzentration',
        chartlegendWasserstand: 'Wasserstand'
    }
});
