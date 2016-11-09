Ext.define('MoMo.client.view.window.MultiSearchSettingsWindow',{
    extend: 'Ext.window.Window',
    xtype: 'multisearch-settings-window',

    requires: [
        "BasiGX.util.Layer"
    ],

    viewModel: {
        data: {
            /*i18n*/
            title: "",
            generalSettingsLabel: "",
            limitCboxLabel: "",
            gazetteerLabel: "",
            objectSearchLabel: "",
            objectSearchLayersLabel: "",
            saveBtnText: ""
            /*i18n*/
        }
    },


    bind: {
        title: '{title}'
    },

    autoScroll: true,

    constrainHeader: true,

    autoShow: true,

    padding: 20,

    width: 500,

    closeAction: 'hide',

    combo: null,

    items: [{
        xtype: 'form',
        width: '100%',
        items: [
            {
                xtype: 'fieldcontainer',
                name: 'generalsettings',
                bind: {
                    fieldLabel: '{generalSettingsLabel}'
                },
                defaultType: 'checkboxfield',
                labelWidth: 200,
                items: [
                    {
                        bind: {
                            boxLabel: '{limitCboxLabel}'
                        },
                        labelWidth: 200,
                        name: 'limitcheckbox',
                        checked: true
                    },{
                        bind: {
                            boxLabel: '{gazetteerLabel}'
                        },
                        labelWidth: 200,
                        name: 'gazetteersearch',
                        checked: true
                    },{
                        bind: {
                            boxLabel: '{objectSearchLabel}'
                        },
                        labelWidth: 200,
                        name: 'objectsearch',
                        checked: true
                    }
                 ]
            },{
                xtype: 'fieldcontainer',
                name: 'objectlayers',
                bind: {
                    fieldLabel: '{objectSearchLayersLabel}'
                },
                defaultType: 'checkboxfield',
                labelWidth: 200
            }
        ]
    },{
        xtype: 'button',
        bind: {
            text: '{saveBtnText}'
        },
        formBind: true,
        handler: function(btn) {
            var me = this.up();
            me.saveSettings(btn);
        }
    }],

    initComponent: function() {
        var me = this;

        me.combo = Ext.ComponentQuery.query('momo-combo-multisearch')[0];

        me.callParent();

        me.on('beforerender', me.addLayers);
    },

    saveSettings: function(btn) {
        var me = btn.up();

        var form = me.down('form');

        // set configured search layers to null and add the wanted below
        me.combo.setConfiguredSearchLayers([]);

        // set all configured values
        Ext.each(form.items.items, function(parentItem) {
            if (parentItem.name === 'generalsettings') {

                Ext.each(parentItem.items.items, function(item) {
                    if (item.name === 'objectsearch'){
                        me.combo.setObjectSearch(item.checked);
                    } else if (item.name === 'gazetteersearch'){
                        me.combo.setGazetteerSearch(item.checked);
                    } else if (item.name === 'limitcheckbox'){
                        me.combo.setLimitToBBox(item.checked);
                    }
                });

            } else if (parentItem.name === 'objectlayers' ) {

                Ext.each(parentItem.items.items, function(item) {
                    var l = BasiGX.util.Layer.getLayerByName(item.name);
                    if (this.checked) {
                        me.combo.configuredSearchLayers.push(l);
                    }
                });

            } else if (item.checked) {
                Ext.log.error("Found setting for which no handler exists");
            }
        });

        me.close();
    },

    addLayers: function() {
        var me = this;

        var searchLayers = me.combo.getAllSearchLayers();

        var container = me.down('fieldcontainer[name="objectlayers"]');

        Ext.each(searchLayers, function(l) {
            var item = Ext.create('Ext.form.field.Checkbox', {
                labelWidth: 200,
                name: l.get('name'),
                boxLabel:  l.get('name'),
                checked: true
            });

            container.items.items.push(item);

        });

    }

});
