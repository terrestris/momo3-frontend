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
 * ShowMetaPanelController
 *
 * This controller will be used to manage the visibility of meta information
 * panel
 *
 * @class ShowMetaPanelController
 */
Ext.define('MoMo.client.view.button.ShowMetaPanelController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.button.showmetapanel',

    /**
     * Shows or hides metainformation panel using fading animation
     * on button click.
     */
    onClick: function(button){
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
});
