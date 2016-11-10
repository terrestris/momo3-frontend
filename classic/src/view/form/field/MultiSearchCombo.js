Ext.define("MoMo.client.view.form.field.MultiSearchCombo", {
    extend: 'BasiGX.view.form.field.MultiSearchCombo',
    xtype: "momo-form-field-multisearch",


    viewModel: {
        data: {
            /*i18n*/
            emptyText: "",
            settingsWindowTitle: ""
            /*i18n*/
        }
    },

    config: {

        gazetteerGrid: "momo-grid-multisearchgazetteergrid",

        wfsSearchGrid: "momo-grid-multisearchwfssearchgrid",

        searchSettings: "momo-container-multisearchsettings",

        wfsServerUrl:"/momo/geoserver.action",

        wfsPrefix: "momo:",

        searchLayerBlackList: [
            "hoverVectorLayer",
            "OSM-WMS GRAY",
            // following is a grouplayer. If it should be searchable,
            // sublayers need to be used
            "exploitable_groundwater"
        ]
    }

});