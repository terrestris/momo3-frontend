Ext.define('MoMo.client.view.button.ShowMeasureToolsPanelController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.button.showmeasuretoolspanel',

    /**
     * Placeholder for the measurement tools panel
     */
    btnPanel: null,

    /**
    *
    */
    onToggle: function(btn, pressed){
        var me = this;
        if (pressed){
            me.showMeasureToolsPanel();
        } else {
            me.hideMeasureToolsPanel();
            me.deactivateMeasureTools();
        }
    },

    /**
     * Creates a panel containing two buttons for distance and area measurements
     * The position of the panel will be computed dynamically (s. method
     * #computePosition below).
     */
    createMeasurementButtonsPanel: function() {

        var me = this;

        var parentBtn = me.getView().getEl();

        var position = me.computePosition(parentBtn);

        var btnPanel = Ext.create('Ext.panel.Panel', {
            name: 'measurement-buttons-panel',
            layout: {
                type: 'hbox',
                pack: 'right'
            },
            width: 100,
            bodyStyle: {
                background: 'transparent'
            },
            style: {
                'top': position.top,
                'right': position.right
            },
            defaults: {
                style: {
                    margin: '0 5px 0 5px'
                },
                xtype: 'basigx-button-measure',
                toggleGroup: 'measure',
                showMeasureInfoOnClickedPoints: true,
                listeners: {
                    afterrender: function(btn){
                        btn.setBind({
                            text: '{text}'
                        });
                    }
                }
            },
            items: [{
                measureType: 'line',
                glyph: 'xf201@FontAwesome'
            }, {
                measureType: 'polygon',
                glyph: 'xf1fe@FontAwesome'
            }]
        });

        return btnPanel;
    },

    /**
     * Shows a measurement tools panel on call button toggle.
     */
    showMeasureToolsPanel: function() {
        var me = this;
        if (!me.btnPanel) {
            me.btnPanel = me.createMeasurementButtonsPanel();
            var cont = Ext.ComponentQuery
                .query('container[name="Map Container"]')[0];
            cont.add(me.btnPanel);
        } else {
            me.btnPanel.show();
        }
    },

    /**
     * Computes position of the measurement tools panel depending on the
     * dimensions and position of the parent button and the height of the
     * application header if given.
     */
    computePosition: function(btn){
        var header = Ext.ComponentQuery.query('panel[region=north]')[0],
            hHeight = 0;

        if (header) {
            var hSplitter = header.splitter;
            hHeight = header.getHeight();
        }

        var top =
            btn.getClientRegion().top - hHeight - hSplitter.getHeight() + "px";
        var right = btn.getWidth() + "px";

        return {
            top: top,
            right: right
        };
    },

    /**
     * Hides a measurement tools panel on call button toggle.
     */
    hideMeasureToolsPanel: function() {
        var me = this;
        if (me.btnPanel) {
            me.btnPanel.hide();
        }
    },

    /**
     * Deactivates possibly activated measure tools if parent button was
     * untoggled and measurement tools panel was hidden.
     */
    deactivateMeasureTools: function (){
        var me = this;
        if (me.btnPanel) {
            var measureBtns = me.btnPanel.query('button');
            Ext.each(measureBtns, function(btn){
                if (btn.pressed) {
                    btn.toggle();
                }
            });
        }
    }
});
