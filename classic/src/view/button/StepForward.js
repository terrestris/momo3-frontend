/* Copyright (c) 2015 terrestris GmbH & Co. KG
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
 *      _                             _        _
 *    _| |_ ___  _ _  _ _  ___  ___ _| |_ _ _ <_> ___
 *     | | / ._>| '_>| '_>/ ._><_-<  | | | '_>| |<_-<
 *     |_| \___.|_|  |_|  \___./__/  |_| |_|  |_|/__/
 *
 *   _                                 _
 *  | |_  ___  ___ ___  ___  ___  ___ | |__ ___  ___  ___
 *  | . \<_> |<_-</ ._>| . \<_> |/ | '| / /<_> |/ . |/ ._>
 *  |___/<___|/__/\___.|  _/<___|\_|_.|_\_\<___|\_. |\___.
 *                     |_|                      <___'
 *
 * ZoomIn Button
 *
 * Button used to zoom in
 *
 */
Ext.define("momo.view.button.StepForward", {
    extend: "Ext.button.Button",
    xtype: 'momo-button-stepforward',

    /**
     *
     */
    viewModel: {
        data: {
            tooltip: 'Nächste Ansicht',
            text: null
        }
    },

    bind: {
        text: '{text}',
        tooltip: '{tooltip}'
    },

    glyph: 'xf061@FontAwesome',

    /**
    *
    */
    handler: function(){
        var mapContainer = this.up('momo-panel-mapcontainer');
        var mainModel = mapContainer.down('momo-component-map').getViewModel();
        var mainController = mapContainer.getController();
        var mapStateHistory = mainModel.get('mapStateHistory');
        var currentMapStateIndex = mainModel.get('currentMapStateIndex');
        var newMapStateIndex;
        var length = mapStateHistory.length;

        if(length < 2 ||
            currentMapStateIndex === null ||
            currentMapStateIndex === length - 1){
            return;
        }

        if(Ext.isDefined(currentMapStateIndex) &&
            currentMapStateIndex < length - 1){
            newMapStateIndex = currentMapStateIndex + 1;
        } else {
            return;
        }

        mainModel.set('currentMapStateIndex', newMapStateIndex);
        mainModel.set('clickedNav', 'stepForward');
        mainController.restoreMapState(mapStateHistory[newMapStateIndex]);
    }

});
