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
 * MeasurementToolsPanelController
 *
 * The controller for the measurement tools. At the moment the BasiGX class
 * ´basigx-button-measure´ with its own logic will be used so we don't need
 * to implement here our own code (yet). Change it if the measurement tools
 * should be adjusted or don't work as expected.
 *
 *
 * @class MoMo.client.view.panel.MeasurementToolsPanelController
 */
Ext.define('MoMo.client.view.panel.MeasurementToolsPanelController', {

    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.panel.measurementoolspanel',

    /**
     * Handle pointer move.
     * @param {ol.MapBrowserEvent} evt
     */
    pointerMoveHandler: function(evt) {
        var me = this;
        var view = me.getView();

        if (evt.dragging) {
            return;
        }

        var helpMsg = view.getViewModel().get('clickToDrawText');
        var helpTooltipCoord = evt.coordinate;
        var measureTooltipCoord = evt.coordinate;

        if (view.sketch) {
            var output;
            var geom = (view.sketch.getGeometry());
            if (geom instanceof ol.geom.Polygon) {
                output = me.formatArea(geom);
                helpMsg = view.getViewModel().get('continuePolygonMsg');
                helpTooltipCoord = geom.getLastCoordinate();
                measureTooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof ol.geom.LineString) {
                output = me.formatLength(geom);
                helpMsg = view.getViewModel().get('continueLineMsg');
                helpTooltipCoord = geom.getLastCoordinate();
                measureTooltipCoord = geom.getLastCoordinate();
            }
            view.measureTooltipElement.innerHTML = output;
            view.measureTooltip.setPosition(measureTooltipCoord);
        }

        view.helpTooltipElement.innerHTML = helpMsg;
        view.helpTooltip.setPosition(helpTooltipCoord);
    }

});
