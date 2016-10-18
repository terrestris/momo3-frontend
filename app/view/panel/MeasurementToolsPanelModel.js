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
 * MeasurementToolsPanelModel
 *
 * The view model for the measurement tools
 *
 * @class MoMo.client.view.panel.MeasurementToolsPanelModel
 */
Ext.define('MoMo.client.view.panel.MeasurementToolsPanelModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.panel.measurementoolspanel',

    data: {
        text: null,
        /* i18n */
        lineTooltip: '',
        areaTooltip: '',
        continuePolygonMsg: '',
        continueLineMsg: '',
        clickToDrawText: ''
        /* i18n */
    }
});
