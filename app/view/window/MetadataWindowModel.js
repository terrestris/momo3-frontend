Ext.define('MoMo.client.view.window.MetadataWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.window.metadata',
    data: {
        i18n: {
            title: 'Metadaten',
            metadata: {
                dataset: 'Daten',
                title: 'Titel',
                abstract: 'Abstract',
                organisation: 'Organisation',
                address: 'Anschrift',
                deliveryPoint: 'Straße und Hausnr.',
                city: 'Stadt',
                postalCode: 'Postleitzahl',
                country: 'Land',
                website: 'Website',
                person: 'Verantwortlicher',
                name: 'Name',
                email: 'E-Mail',
                referenceDate: 'Erstellungsdatum',
                topic: 'Thema',
                geography: 'Geographisch',
                extent: 'Extent',
                projection: 'Projektion',
                geoExtent: 'Extent',
                minX: 'Min X',
                minY: 'Min Y',
                maxX: 'Max X',
                maxY: 'Max Y',
                timeExtent: 'Zeitraum',
                start: 'Von',
                end: 'Bis',
                format: 'Format',
                limitations: 'Beschränkungen',
                onlineResource: 'Online Resource',
                dataSource: 'Quelle',
                publications: 'Publikationen'
            }
        },

        metadata: {
            title: null,
            abstract: null,
            organisation: {
                name: null,
                address: {
                    deliveryPoint: null,
                    city: null,
                    postalCode: null,
                    country: null
                },
                website: null
            },
            person: {
                name: null,
                email: null
            },
            referenceDate: null,
            topic: null,
            geography: {
                extent: {
                    minX: null,
                    minY: null,
                    maxX: null,
                    maxY: null
                },
                projection: null
            },
            timeExtent: {
                start: null,
                end: null
            },
            format: null,
            limitations: null,
            onlineResource: null,
            dataSource: null,
            publications: null
        }
    }
});
