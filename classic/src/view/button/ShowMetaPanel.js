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
 * ShowMetaPanel Button
 *
 * Button used to show and hide a panel with meta informations for the map
 * (i.e. current map scale, used EPSG or mouse position)
 *
 * @class momo.view.button.AddWms
 */
Ext.define("momo.view.button.ShowMetaPanel", {
    extend: "Ext.Button",
    xtype: 'momo-button-showmetapanel',

    requires: [
        'Ext.app.ViewModel',
        'BasiGX.util.Animate'
    ],

    /**
     *
     */
    bind: {
        tooltip: '{tooltip}',
        text: '{text}'
    },

    /**
     *
     */
    viewModel: {
        data: {
            tooltip: 'Metainformationen anzeigen',
            text: null
        }
    },

    glyph: 'xf278@FontAwesome',

    cls: 'momo-showmetapanel-button',

    iconCls: 'momo-showmetapanel-button-icon',

    /**
     *
     */
    config: {
        handler: function(button){
            var metaPanel = Ext.ComponentQuery.query('momo-panel-metainfos')[0];

            if (metaPanel) {
                if (!Ext.isDefined(metaPanel.fadedIn)) {
                    metaPanel.fadedIn = false;
                }
                if(!metaPanel.fadedIn) {
                    metaPanel.show();
                    metaPanel.getEl().fadeIn({
                        easing: 'easeIn',
                        duration: 500
                    });
                    metaPanel.fadedIn = true;
                } else {
                    metaPanel.getEl().fadeOut({
                        easing: 'easeOut',
                        duration: 500,
                        callback: function () {
                            metaPanel.hide();
                        }
                    });
                    metaPanel.fadedIn = false;
                }
                button.blur();
            }
        }
    },

    /**
     *
     */
    constructor: function(config) {
        this.callParent([config]);
        if (this.setTooltip) {
            var bind = this.config.bind;
            bind.tooltip = this.getViewModel().get('tooltip');
            this.setBind(bind);
        }
    }
});
