Ext.define('MoMo.view.charts.WaterDataChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.charts.waterdatachart',
    
    
    onZoomUndo: function() {
        var chart = this.lookupReference('chart'),
            interaction = chart && Ext.ComponentQuery.query('interaction', chart)[0],
            undoButton = interaction && interaction.getUndoButton(),
            handler = undoButton && undoButton.handler;
        if (handler) {
            handler();
        }
    },
    
    updateChartValues: function(form) {

    }

});
