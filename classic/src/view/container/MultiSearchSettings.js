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
 *
 *  A container showing settings for the multisearch including switching
 *  gazetter or wfs search on and off, limit search results to visible extent
 *  and configure layers for wfs search. Extends the
 * `BasiGX.view.container.MultiSearchSettings` class.
 *
 * @class MoMo.client.view.container.MultiSearchSettings
 */
Ext.define('MoMo.client.view.container.MultiSearchSettings',{
    extend: 'BasiGX.view.container.MultiSearchSettings',
    xtype: 'momo-container-multisearchsettings',

    viewModel: {
        data: {
            /*i18n*/
            generalSettingsLabel: "",
            limitCboxLabel: "",
            gazetteerLabel: "",
            objectSearchLabel: "",
            objectSearchLayersLabel: "",
            saveBtnText: ""
            /*i18n*/
        }
    }

});
