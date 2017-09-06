
Ext.define('MoMo.client.view.window.MetadataWindow',{
    extend: 'Ext.window.Window',
    xtype: 'momo-window-metadata',

    name: 'metadata-window',

    requires: [
        'MoMo.client.view.window.MetadataWindowModel'
    ],

    viewModel: 'window.metadata',

    autoScroll: true,

    resizable: false,

    constrainHeader: true,

    bind: {
        title: '{i18n.title}'
    },

    layout: 'hbox',

    maxWidth: 800,

    maxHeight: 600,

    scrollable: 'y',

    bodyPadding: 10,

    initComponent: function(){
        this.callParent();
        if(this.metadata) {
            var viewModel = this.getViewModel();
            viewModel.set('metadata', this.metadata);
        }
    },

    items: [{
        xtype: 'fieldset',
        flex: 1,
        margin: '0px 5px 0 5px',
        bind: {
            title: '{i18n.metadata.dataset}'
        },
        defaults: {
            width: '100%',
            labelWidth: 150
        },
        items: [{
            xtype: 'displayfield',
            name: 'metadata-title',
            bind: {
                fieldLabel: '{i18n.metadata.title}',
                value: '{metadata.title}'
            }
        }, {
            xtype: 'displayfield',
            name: 'metadata-abstract',
            bind: {
                fieldLabel: '{i18n.metadata.abstract}',
                value: '{metadata.abstract}'
            }
        }, {
            xtype: 'displayfield',
            bind: {
                fieldLabel: '{i18n.metadata.topic}',
                value: '{metadata.topic}'
            }
        }, {
            xtype: 'displayfield',
            name: 'metadata-referenceDate',
            bind: {
                fieldLabel: '{i18n.metadata.referenceDate}',
                value: '{metadata.referenceDate}'
            }
        }, {
            xtype: 'displayfield',
            name: 'metadata-format',
            bind: {
                fieldLabel: '{i18n.metadata.format}',
                value: '{metadata.format}'
            }
        }, {
            xtype: 'displayfield',
            name: 'metadata-limitations',
            bind: {
                fieldLabel: '{i18n.metadata.limitations}',
                value: '{metadata.limitations}'
            }
        }, {
            xtype: 'displayfield',
            name: 'metadata-onlineResource',
            bind: {
                fieldLabel: '{i18n.metadata.onlineResource}',
                value: '{metadata.onlineResource}'
            }
        }, {
            xtype: 'displayfield',
            name: 'metadata-dataSource',
            disabled: true,
            bind: {
                fieldLabel: '{i18n.metadata.dataSource}',
                value: '{metadata.dataSource}'
            }
        }, {
            xtype: 'displayfield',
            name: 'metadata-publications',
            disabled: true,
            bind: {
                fieldLabel: '{i18n.metadata.publications}',
                value: '{metadata.publications}'
            }
        }]
    }, {
        xtype: 'fieldcontainer',
        flex: 1,
        defaults: {
            width: '100%',
            labelWidth: 150
        },
        items: [{
            xtype: 'fieldset',
            name: 'metadata-organisation',
            width: '100%',
            bind: {
                title: '{i18n.metadata.organisation}'
            },
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'displayfield',
                name: 'metadata-organisation-name',
                bind: {
                    fieldLabel: '{i18n.metadata.name}',
                    value: '{metadata.organisation.name}'
                }
            }, {
                xtype: 'displayfield',
                name: 'metadata-organisation-website',
                bind: {
                    fieldLabel: '{i18n.metadata.website}',
                    value: '{metadata.organisation.website}'
                }
            }, {
                xtype: 'fieldset',
                name: 'metadata-organisation-address',
                width: '100%',
                bind: {
                    title: '{i18n.metadata.address}'
                },
                defaults: {
                    width: '100%'
                },
                items: [{
                    xtype: 'displayfield',
                    name: 'metadata-organisation-address-deliveryPoint',
                    bind: {
                        fieldLabel: '{i18n.metadata.deliveryPoint}',
                        value: '{metadata.organisation.address.deliveryPoint}'
                    }
                }, {
                    xtype: 'displayfield',
                    name: 'metadata-organisation-address-postalCode',
                    bind: {
                        fieldLabel: '{i18n.metadata.postalCode}',
                        value: '{metadata.organisation.address.postalCode}'
                    }
                }, {
                    xtype: 'displayfield',
                    name: 'metadata-organisation-address-city',
                    bind: {
                        fieldLabel: '{i18n.metadata.city}',
                        value: '{metadata.organisation.address.city}'
                    }
                }, {
                    xtype: 'displayfield',
                    name: 'metadata-organisation-address-country',
                    bind: {
                        fieldLabel: '{i18n.metadata.country}',
                        value: '{metadata.organisation.address.country}'
                    }
                }]
            }]
        }, {
            xtype: 'fieldset',
            name: 'metadata-person',
            width: '100%',
            bind: {
                title: '{i18n.metadata.person}'
            },
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'displayfield',
                name: 'metadata-person-name',
                bind: {
                    fieldLabel: '{i18n.metadata.name}',
                    value: '{metadata.person.name}'
                }
            }, {
                xtype: 'displayfield',
                name: 'metadata-person-email',
                bind: {
                    fieldLabel: '{i18n.metadata.email}',
                    value: '{metadata.person.email}'
                }
            }]
        }, {
            xtype: 'fieldset',
            name: 'metadata-timeExtent',
            width: '100%',
            bind: {
                title: '{i18n.metadata.timeExtent}'
            },
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'displayfield',
                bind: {
                    fieldLabel: '{i18n.metadata.start}',
                    value: '{metadata.timeExtent.start}'
                }
            }, {
                xtype: 'displayfield',
                bind: {
                    fieldLabel: '{i18n.metadata.end}',
                    value: '{metadata.timeExtent.end}'
                }
            }]
        }, {
            xtype: 'fieldset',
            name: 'metadata-geography',
            width: '100%',
            bind: {
                title: '{i18n.metadata.geography}'
            },
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'fieldcontainer',
                layout: 'vbox',
                defaults: {
                    xtype: 'displayfield',
                    labelWidth: 40,
                    margin: '0 5px 0 0',
                    flex: 1
                },
                items: [{
                    name: 'metadata-extent-minX',
                    allowBlank: false,
                    bind: {
                        fieldLabel: '{i18n.metadata.minX}',
                        value: '{metadata.geography.extent.minX}'
                    }
                }, {
                    name: 'metadata-extent-minY',
                    allowBlank: false,
                    bind: {
                        fieldLabel: '{i18n.metadata.minY}',
                        value: '{metadata.geography.extent.minY}'
                    }
                }, {
                    name: 'metadata-extent-maxX',
                    allowBlank: false,
                    bind: {
                        fieldLabel: '{i18n.metadata.maxX}',
                        value: '{metadata.geography.extent.maxX}'
                    }
                }, {
                    name: 'metadata-extent-maxY',
                    allowBlank: false,
                    bind: {
                        fieldLabel: '{i18n.metadata.maxY}',
                        value: '{metadata.geography.extent.maxY}'
                    }
                }]
            }, {
                xtype: 'displayfield',
                name: 'metadata-geography-projection',
                labelWidth: 150,
                bind: {
                    fieldLabel: '{i18n.metadata.projection}',
                    value: '{metadata.geography.projection}'
                }
            }]
        }]
    }]

});
