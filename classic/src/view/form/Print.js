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
 * Print FormPanel
 *
 * Used to show an Mapfish Print v3 compatible print panel. Extends the
 * `BasiGX.view.form.Print` class.
 *
 * @class MoMo.client.view.form.Print
 */
Ext.define("MoMo.client.view.form.Print", {
    extend: "BasiGX.view.form.Print",
    xtype: "momo-form-print",

    layout: 'vbox',

    maxHeight: 500,

    viewModel: 'form.print',

    controller: 'form.print',

    initComponent: function(){
        this.callParent();
        var appCombo = this.down('combo[name=appCombo]');
        appCombo.setValue("momo");
        appCombo.setHidden(true);
        this.provider = Ext.create('GeoExt.data.MapfishPrintProvider', {
            url: this.getUrl() + appCombo.getValue() + '/capabilities.json',
            listeners: {
                ready: 'onPrintProviderReady',
                scope: this
            }
        });
    },

    /**
     * Override for BasiGX method to get translatable labels for print
     * attributes scalebar and northArrow
     * @param {Object} attributeRec record with attribute properties
     */
    getCheckBoxAttributeFields: function (attributeRec) {
        var fl;
        if (attributeRec.get('name') === "scalebar") {
            fl = '{scalebarLabel}';
        } else {
            fl = '{northArrowLabel}';
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
     * Override for BasiGX method to get translatable labels for print
     * attribute map title
     * @param {Object} attributeRec record with attribute properties
     */
    getStringField: function (attributeRec) {
        var fl = '';
        if (attributeRec.get('name') === 'title') {
            fl = '{mapTitleLabel}';
        }
        return {
            xtype: 'textfield',
            name: attributeRec.get('name'),
            bind: {
                fieldLabel: fl
            },
            labelWidth: 40,
            value: attributeRec.get('default'),
            allowBlank: true
        };
    },

    /**
     * Override for BasiGX method to control the visibility of scalebar and
     * north arrow dynamically through (un)check the corresponding properties
     * in print window
     */
    createPrint: function(){
        var view = this;
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
            mapComponent, this.layerFilter, this
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
                attributes.legend = view.getLegendObject();
            } else if (field.getName() === 'scalebar') {
                attributes.scalebar = view.getScaleBarObject();
                // override basigx method here
                attributes.printScalebar = field.getValue();
            } else if (field.getName() === 'northArrowDef') {
                attributes.northArrowDef = view.getNorthArrowObject();
                // override basigx method here
                attributes.printNorthArrow = field.getValue();
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
    }
});
