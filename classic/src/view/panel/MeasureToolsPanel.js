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
 * Panel containing the measure tools for the temporary drawing in the
 * client.
 *
 * @class MoMo.client.view.panel.MeasureToolsPanel
 */
Ext.define("MoMo.client.view.panel.MeasureToolsPanel", {
    extend: "Ext.panel.Panel",
    xtype: 'momo-panel-measurement',

    requires: [
        'Ext.button.Button'
    ],

    viewModel: 'panel.measurementoolspanel',

//    controller: 'panel.measurementoolspanel',

    layout: {
        type: 'hbox',
        pack: 'end'
    },

    width: 100,

    bodyStyle: {
        background: 'transparent'
    },

    defaults: {
        style: {
            margin: '0 5px 0 5px'
        },
        xtype: 'basigx-button-measure',
        toggleGroup: 'measure',
        ui: 'momo-tools',
        scale: 'small',
        showMeasureInfoOnClickedPoints: true
    },

    items: [{
        measureType: 'line',
        glyph: 'xf201@FontAwesome',
        listeners: {
            afterrender: function(btn){
                btn.setBind({
                    text: '{text}',
                    tooltip: '{lineTooltip}'
                });
            }
        }
    }, {
        measureType: 'polygon',
        glyph: 'xf1fe@FontAwesome',
        listeners: {
            afterrender: function(btn){
                btn.setBind({
                    text: '{text}',
                    tooltip: '{areaTooltip}'
                });
            }
        }
    }]
});
