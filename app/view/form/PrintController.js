/* Copyright (c) 2016 terrestris GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * PrintController
 *
 * The controller for the print. Based on the methods of
 * `BasiGX.view.form.Print` class and extends this with special logic to
 * match momo project print properties
 *
 *
 * @class MoMo.client.view.form.PrintController
 */
Ext.define('MoMo.client.view.form.PrintController', {

    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.form.print',

    /**
     * Override for BasiGX class method
     */
    onPrintProviderReady: function(provider){
        this.addGenericFieldset(provider);
    },

    /**
     * Override for BasiGX class method (hbox layout should be used)
     */
    addGenericFieldset: function(provider){
        var view = this.getView();
        var fs = view.down('[name="generic-fieldset"]');
        var defaultFieldContainer = view.down(
            'fieldcontainer[name=defaultFieldContainer]');

        if (fs) {
            fs.removeAll();
        } else {
            defaultFieldContainer.add({
                xtype: 'fieldset',
                bind: {
                    title: '{genericFieldSetTitle}'
                },
                name: 'generic-fieldset',
                layout: {
                    type: 'hbox',
                    pack: 'end'
                }
            });
        }
        this.addLayoutCombo(provider);
        this.addFormatCombo(provider);

        this.fireEvent('genericfieldsetadded');
    },

    /**
     * Override for BasiGX class method (combo labels should be placed on the
     * top of combo)
     */
    addLayoutCombo: function(provider){
        var view = this.getView();
        var fs = view.down('fieldset[name=generic-fieldset]');
        var layoutStore = provider.capabilityRec.layouts();
        layoutStore.sort('name', 'ASC');
        var layoutCombo = {
            xtype: 'combo',
            name: 'layout',
            displayField: 'name',
            bind: {
                fieldLabel: '{layoutComboLabel}'
            },
            labelAlign: 'top',
            editable: false,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'name',
            store: layoutStore,
            listeners: {
                change: this.onLayoutSelect,
                scope: this
            }
        };
        layoutCombo = fs.add(layoutCombo);
        layoutCombo.select(layoutStore.getAt(0));
    },

    /**
     * Override for BasiGX class method (combo labels should be placed on the
     * top of combo)
     */
    addFormatCombo: function(provider){
        var view = this.getView();
        var fs = view.down('fieldset[name=generic-fieldset]');
        var formatStore = provider.capabilityRec.get('formats');
        Ext.Array.sort(formatStore);
        var formatCombo = {
            xtype: 'combo',
            name: 'format',
            displayField: 'name',
            labelAlign: 'top',
            editable: false,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'name',
            store: formatStore,
            bind: {
                value: '{printFormat}',
                fieldLabel: '{formatComboLabel}'
            }
        };
        fs.add(formatCombo);
    },


    /**
     * Override for BasiGX method to get translatable labels for print
     * attributes scalebar, northArrow and legend
     * @param {Object} attributeRec record with attribute properties
     */
    getCheckBoxAttributeFields: function (attributeRec) {
        var fl;
        if (attributeRec.get('name') === "scalebar") {
            fl = '{scalebarLabel}';
        } else if (attributeRec.get('name') === "northArrowDef") {
            fl = '{northArrowLabel}';
        } else if (attributeRec.get('name') === "legend") {
            fl = '{legendLabel}';
        }
        return {
            xtype: 'checkbox',
            name: attributeRec.get('name'),
            checked: true,
            bind: {
                fieldLabel: fl
            }
        };
    },

    /**
     * Override for BasiGX class method
     */
    onLayoutSelect: function(combo, layoutname){
        var view = this.getView(),
            attributesFieldset = view.down('fieldset[name=attributes]'),
            layoutRec = combo.findRecordByValue(layoutname),
            attributeFieldset,
            defaultFieldContainer = view.down(
                'fieldcontainer[name=defaultFieldContainer]');

        view.remove(attributesFieldset);

        // add the layout attributes fieldset:
        if(defaultFieldContainer && attributesFieldset){
            defaultFieldContainer.remove(attributesFieldset);
        }
        attributeFieldset = defaultFieldContainer.add({
            xtype: 'fieldset',
            bind: {
                title: '{attributesTitle}'
            },
            name: 'attributes',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            }
        });

        layoutRec.attributes().each(function(attribute){
            this.addAttributeFields(attribute, attributeFieldset);
        }, this);

        view.renderAllClientInfos();
    },

    /**
     * Override for BasiGX class method (removed case DataSourceAttributeValue)
     */
    addAttributeFields: function(attributeRec, fieldset){
        var me = this;
        var view = me.getView();
        var map = view.getMapComponent().getMap();

        var attributeFields;
        switch (attributeRec.get('type')) {
        case "MapAttributeValues":
            attributeFields = view.getMapAttributeFields(attributeRec);
            map.on('moveend', view.renderAllClientInfos, view);
            break;
        case "NorthArrowAttributeValues":
            attributeFields = view.getNorthArrowAttributeFields(attributeRec);
            break;
        case "ScalebarAttributeValues":
            attributeFields = view.getScalebarAttributeFields(attributeRec);
            break;
        case "LegendAttributeValue":
            attributeFields = view.getLegendAttributeFields(attributeRec);
            break;
        case "String":
            attributeFields = me.getStringField(attributeRec);
            break;
        default:
            break;
        }

        if (attributeFields) {
            var doContinue = me.fireEvent(
                    'beforeattributefieldsadd', me, attributeFields
                );
            // a beforeattributefieldsadd handler may have cancelled the adding
            if (doContinue !== false) {
                var added = fieldset.add(attributeFields);
                me.fireEvent('attributefieldsadd', me, attributeFields, added);
            }
        }
    },


    /**
     * Override for BasiGX method to get translatable labels for all string
     * based attributes of the print template. To achieve dynamic translatable
     * templates all string based attributes should be defined via data binding
     * from view model.
     * Fields and values `titleCoordSystemString`, `coordSystemString`,
     * `titleProjString`, `projStringtitle`, `DatumStringtitle` `DatumString`,
     * `titleAuthorName`, `titleScaletitleDate` and `titleDataSource` are hidden
     * @param {Object} attributeRec record with attribute properties
     */
    getStringField: function (attributeRec) {
        var fl = '';
        var hidden = false;
        var xtype = 'textfield';
        var childFieldKey = '';
        var value = attributeRec.get('default');

        if (attributeRec.get('name') === 'title') {
            fl = '{mapTitleLabel}';
        } else if (attributeRec.get('name') === 'mapNumber') {
            fl = '{mapNumberLabel}';
        } else if (attributeRec.get('name') === 'titleAuthorName') {
            fl = '{titleAuthorName}';
            childFieldKey = 'authorName';
        } else if (attributeRec.get('name') === 'titleScale') {
            hidden = true;
            childFieldKey = 'titleScale';
            value = '{titleScale}';
            fl = value;
        } else if (attributeRec.get('name') === 'titleDate') {
            hidden = true;
            childFieldKey = 'titleDate';
            value = '{titleDate}';
            fl = value;
        } else if (attributeRec.get('name') === 'titleDataSource') {
            fl = '{titleDataSource}';
            xtype = 'textarea';
            childFieldKey = 'dataSource';
        } else if (attributeRec.get('name') === 'titleCoordSystemString') {
            fl = '{titleCoordSystemString}';
            value = '{coordSystemString}';
            hidden = true;
            childFieldKey = 'coordSystemString';
        } else if (attributeRec.get('name') === 'titleProjString') {
            fl = '{titleProjString}';
            value = '{projString}';
            hidden = true;
            childFieldKey = 'projString';
        } else if (attributeRec.get('name') === 'titleDatumString') {
            fl = '{titleDatumString}';
            value = '{datumString}';
            hidden = true;
            childFieldKey = 'datumString';
        }

        if (!Ext.isEmpty(fl)){
            return {
                xtype: xtype,
                width: 400,
                hidden: hidden,
                name: attributeRec.get('name'),
                childFieldKey: childFieldKey,
                bind: {
                    fieldLabel: fl,
                    value: value
                },
                allowBlank: true
            };
        }
    },

    /**
     * Override for BasiGX method to control the visibility of scalebar,
     * north arrow and legend dynamically through (un)check
     * the corresponding properties in print window
     */
    createPrint: function(){
        var view = this.getView();
        var spec = {};
        var mapComponent = view.getMapComponent();
        var mapView = mapComponent.getMap().getView();
        var layout = view.down('combo[name="layout"]').getValue();
        var format = view.down('combo[name="format"]').getValue();
        var attributes = {};
        var projection = mapView.getProjection().getCode();
        var rotation = mapView.getRotation();

        var gxPrintProvider = GeoExt.data.MapfishPrintProvider;

        var serializedLayers = gxPrintProvider.getSerializedLayers(
            mapComponent, view.layerFilter, view
        );

        var fieldsets = view.query('fieldset[name=attributes] fieldset');

        Ext.each(fieldsets, function(fs){
            var name = fs.name;
            // TODO double check when rotated
            var featureBbox = fs.extentFeature.getGeometry().getExtent();
            var dpi = fs.down('[name="dpi"]').getValue();

            attributes[name] = {
                bbox: featureBbox,
                dpi: dpi,
                // TODO Order of Layers in print seems to be reversed.
                layers: serializedLayers.reverse(),
                projection: projection,
                rotation: rotation
            };

        }, this);
        // Get all Fields except the DPI Field
        // TODO This query should be optimized or changed into some
        // different kind of logic
        var additionalFields = view.query(
            'fieldset[name=attributes]>field[name!=dpi]'
        );
        Ext.each(additionalFields, function(field){

            if(field.getName() === 'legend') {
                attributes.legend = this.getLegendObject();
                attributes.printLegend = field.getValue();
            } else if (field.getName() === 'scalebar') {
                // override basigx method here
                attributes.printScalebar = field.getValue();
            } else if (field.getName() === 'northArrowDef') {
                // override basigx method here
                attributes.printNorthArrow = field.getValue();
            } else if (field.childFieldKey &&
                    !Ext.isEmpty(field.childFieldKey)) {
                // add coordinate system, projection, date and scale title
                // attributes
                this.addHiddenTextAttributes(field, attributes);
            } else {
                attributes[field.getName()] = field.getValue();
            }
        }, this);

        var url = view.getUrl();
        var app = view.down('combo[name=appCombo]').getValue();
        spec.attributes = attributes;
        spec.layout = layout;
        var submitForm = Ext.create('Ext.form.Panel', {
            standardSubmit: true,
            url: url + app + '/buildreport.' + format,
            method: 'POST',
            items: [
                {
                    xtype: 'textfield',
                    name: 'spec',
                    value: Ext.encode(spec)
                }
            ]
        });
        submitForm.submit();
    },

    /**
     * Override for BasiGX method (check if layer is hoverable added. If not,
     * this shouldn't get a legend by print)
     */
    legendLayerFilter: function(layer) {
        if (layer.checked && layer.get('hoverable') &&
            layer.get('opacity') > 0) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * Override for BasiGX method (LEGEND_OPTIONS parameters added)
     */
    getLegendObject: function() {
        var classes = [];
        var url;
        var iconString;
        var view = this.getView();
        var printLayers = GeoExt.data.MapfishPrintProvider.getLayerArray(
                view.getMapComponent().getLayers().getArray()
        );

        var filteredLayers = Ext.Array.filter(printLayers,
            this.legendLayerFilter);

        Ext.each(filteredLayers, function(layer){
            if(layer.get("legendUrl")){
                classes.push({
                    icons: [layer.get("legendUrl")],
                    name: layer.get('name')
                });
            } else {
                if (layer.getSource() instanceof ol.source.TileWMS) {
                    url = layer.getSource().getUrls()[0];
                    iconString = url + "?" +
                        "TRANSPARENT=TRUE&" +
                        "VERSION=1.1.1&" +
                        "SERVICE=WMS&" +
                        "REQUEST=GetLegendGraphic&" +
                        "EXCEPTIONS=application%2Fvnd.ogc.se_xml&" +
                        "FORMAT=image%2Fgif&" +
                        //"LEGEND_OPTIONS=fontAntiAliasing:true;fontSize:16;" +
                        "LEGEND_OPTIONS=fontSize:12;" +
                        "forceLabels:on;forceTitles:on" +
                        "SCALE=6933504.262556662&" +
                        "LAYER=";
                    iconString += layer.getSource().getParams().LAYERS;
                    classes.push({
                        icons: [iconString],
                        name: layer.get('name')
                    });
                } else if (layer.getSource() instanceof ol.source.ImageWMS){
                    url = layer.getSource().getUrl();
                    iconString = url + "?" +
                    "TRANSPARENT=TRUE&" +
                    "VERSION=1.1.1&" +
                    "SERVICE=WMS&" +
                    "REQUEST=GetLegendGraphic&" +
                    "EXCEPTIONS=application%2Fvnd.ogc.se_xml&" +
                    "FORMAT=image%2Fgif&" +
                    //"LEGEND_OPTIONS=fontAntiAliasing:true;fontSize:16;" +
                    "LEGEND_OPTIONS=fontSize:12;" +
                    "forceLabels:on;forceTitles:on" +
                    "SCALE=6933504.262556662&" +
                    "LAYER=";
                    iconString += layer.getSource().getParams().LAYERS;
                    classes.push({
                        icons: [iconString],
                        name: layer.get('name')
                    });
                }
            }
        });

        var legendName = this.getView().query('checkbox[name=legend]')[0].
            getFieldLabel();
        var legendObj = {
            classes: classes,
            name: legendName
        };

        return legendObj;
    },

    /**
     *
     */
    addHiddenTextAttributes: function(field, attributes){
        attributes[field.getName()] = field.getFieldLabel();
        if (field.getName() !== field.childFieldKey) {
            attributes[field.childFieldKey] = field.getValue();
        }
    }
});
