Ext.define("MoMo.client.view.panel.MultiSearchPanel", {
    extend: "Ext.panel.Panel",
    xtype: 'momo-panel-multisearch',

    requires: [
        'BasiGX.util.Map',
        'BasiGX.util.Layer',
        'BasiGX.util.Animate'
    ],

    viewModel: {
        data: {
            limitCboxLabel: 'Auf den sichtbaren Kartenbereich einschränken',
            refreshBtnTooltip: 'Aktualisieren',
            helpBtnTooltip: 'Hinweise zur Multisuche',
            helpWindowTitle: 'Hinweise zur Multisuche',
            helpWindowText:'Führen Sie die Maus über die Suchergebnisse, ' +
                'um diese auf der Karte zu markieren.<br/> Klicken Sie auf ' +
                'ein Element, um die Karte darauf zu zentrieren.<br/>' +
                'Beachten Sie, dass einige Suchergebnisse außerhalb des ' +
                'sichtbaren Kartenbereichs liegen können, falls die ' +
                'Option "Auf den sichtbaren Kartenbereich einschränken" ' +
                'abgewählt ist.'
        }
    },

    bind: {},

    constrain: true,

    hideHeaders: true,

    tbar: [{
        xtype: 'checkbox',
        name: 'limitcheckbox',
        checked: true,
        bind: {
            boxLabel: '{limitCboxLabel}'
        }
    },
    {
        xtype: 'button',
        name: 'refreshsearchbutton',
        bind: {
            tooltip: '{refreshBtnTooltip}'
        },
        glyph: 'xf021@FontAwesome'
    },
    '->',
    {
        xtype: 'button',
        name: 'directionsbutton',
        bind: {
            tooltip: '{helpBtnTooltip}'
        },
        glyph: 'xf128@FontAwesome'
    }
    ],

    items: [{
        xtype: 'momo-grid-gazetteergrid'
    },
    {
        xtype: 'momo-grid-objectsearchgrid'
    }
    ],

    initComponent: function() {
        var me = this;

        me.callParent(arguments);

        // overwrite listeners to don't trigger other basigx class
        me.down('checkbox[name=limitcheckbox]')
            .on('change', me.refreshSearchResults, me);
        me.down('button[name=refreshsearchbutton]')
            .setHandler(me.refreshSearchResults, me);
        me.down('button[name=directionsbutton]')
            .setHandler(me.showDirections, me);
    },

    refreshSearchResults: function(){
        var multiSearchCombo =
            Ext.ComponentQuery.query('momo-combo-multisearch')[0];
        var value = multiSearchCombo.getValue();
        if (value) {
            multiSearchCombo.doGazetteerSearch(value);
            multiSearchCombo.doObjectSearch(value);
        } else {
            console.log("No value to search for");
        }
    },

    showDirections: function(){
        var win = Ext.ComponentQuery.query(
                'window[name="multisearchdirections"]')[0];
        if(win){
            if(win.isVisible()){
                BasiGX.util.Animate.shake(win);
            } else {
                win.show();
            }
        } else {
            Ext.create('Ext.window.Window', {
                title: this.getViewModel().get('helpWindowTitle'),
                name: 'multisearchdirections',
                height: 200,
                width: 400,
                layout: 'fit',
                bodyPadding: 5,
                html: this.getViewModel().get('helpWindowText')
            }).show();
        }
    },

    onMultiSearchPanelSlideOut: function(){
        var me = this;
        me.hide();
    }

});

