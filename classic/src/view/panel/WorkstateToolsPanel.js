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
 * Panel containing the workstate tools for the temporary drawing in the
 * client.
 *
 * @class MoMo.client.view.panel.WorkstateToolsPanel
 */
Ext.define('MoMo.client.view.panel.WorkstateToolsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'momo-panel-workstate',

    requires: [
        'Ext.button.Button'
    ],

    viewModel: 'panel.workstatetoolspanel',

    controller: 'panel.workstatetoolspanel',

    layout: {
        type: 'hbox',
        pack: 'end'
    },

    width: 100,

    bodyStyle: {
        background: 'transparent'
    },

    defaults: {
        xtype: 'button',
        toggleGroup: 'workstate',
        ui: 'momo-tools',
        scale: 'small',
        style: {
            margin: '0 5px 5px 5px'
        }
    },

    items: [{
        bind: {
            tooltip: '{loadSaveWorkstateBtnText}',
            text: null
        },
        name: 'loadSaveWorkstateBtn',
        glyph: 'xf07c@FontAwesome', //fa fa-folder-open
        listeners: {
            toggle: 'onLoadSaveWorkstateBtnToggle'
        }
    }, {
        xtype: 'basigx-button-permalink',
        bind: {
            tooltip: '{permalinkBtnTooltip}',
            text: '{permalinkBtnText}'
        },
        name: 'permalinkBtn',
        glyph: 'xf0c1@FontAwesome' //fa fa-link
    }]
});
