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
 * ShowRedliningToolsPanelModel
 *
 * The view model for the redlining styler window
 *
 * @class MoMo.client.view.window.RedliningStylerWindowModel
 */
Ext.define('MoMo.client.view.window.RedliningStylerWindowModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.window.redliningstyler',

    data: {
        title: 'Zeichnungsstil',
        pointStyleFieldSetTitle: 'Punktstil',
        pointStyleRadiusNumberFieldLabel: 'Punkt Radius',
        styleStrokeWidthFieldLabel: 'Strichstärke',
        styleStrokeColorFieldLabel: 'Strichfarbe',
        styleFillColorFieldLabel: 'Füllfarbe',
        lineStyleFieldSetTitle: 'Linienstil',
        polygonStyleFieldSetTitle: 'Polygonstil',
        closeStylerBtnText: 'Ok'
    }
});
