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

    bodyPadding: 0,


    bbar: [{
        xtype: 'button',
        name: 'saveLoadSettings',
        bind: {
            text: '{saveLoadSettings}'
        },
        handler: function(btn) {
            btn.up('form').getController().saveLoadSettings();
        }
    }, {
        xtype: 'button',
        name: 'createMomoPrint',
        bind: {
            text: '{printFormat:uppercase} {printButtonSuffix}'
        },
        formBind: true,
        handler: function(btn){
            btn.up('form').getController().createPrint();
        }
    }, {
        xtype: 'button',
        name: 'downloadMomoPrint',
        bind: {
            text: '{printDownload}'
        },
        hidden: true,
        handler: function(btn){
            window.open(btn.link);
        }
    }],

    /**
     * Initializes this component
     */
    initComponent: function(){
        this.callParent();
        var appCombo = this.down('combo[name=appCombo]');
        appCombo.setValue("momo");
        appCombo.setHidden(true);
        // hide the containing fieldset, which is empty now
        appCombo.up().setHidden(true);
        // hide the basigx component buttons as we have our own
        var basigxBtns = this.query('button');
        Ext.each(basigxBtns, function(btn) {
            if (btn.name !== "createMomoPrint" &&
                btn.name !== "downloadMomoPrint" &&
                btn.name !== "saveLoadSettings") {
                btn.setHidden(true);
            }
        });
        this.provider = Ext.create('GeoExt.data.MapfishPrintProvider', {
            url: this.getUrl() + appCombo.getValue() + '/capabilities.json',
            listeners: {
                ready: function(){
                    this.getController().onPrintProviderReady(this.provider);
                },
                scope: this
            }
        });
    },

    /**
     * Override for BasiGX class to make use of our own controller
     */
    getNorthArrowAttributeFields: function (attributeRec) {
        return this.getController().getCheckBoxAttributeFields(attributeRec);
    },

    /**
     * Override for BasiGX class to make use of our own controller
     */
    getLegendAttributeFields: function (attributeRec) {
        return this.getController().getCheckBoxAttributeFields(attributeRec);
    },

    /**
     * Override for BasiGX class to make use of our own controller
     */
    getScalebarAttributeFields: function (attributeRec) {
        return this.getController().getCheckBoxAttributeFields(attributeRec);
    }
});
