Ext.define('MoMo.client.view.window.RedliningStylerCommonController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panel.redliningstyler',

    requires: [
    ],

    /**
     * Update the style by rewriting and reapplying on the layer and
     * gx_renderer
     */
    updateStyle: function(pointStyle, lineStyle, polygonStyle) {

        var me = this,
            view = me.getView(),
            oldStyle,
            style,
            renderer,
            parentWindow = view.up('window'),
            redliningPanel =
                Ext.ComponentQuery.query('momo-panel-redlining')[0];

        if (pointStyle) {
            renderer = view.query('gx_renderer[name=pointRenderPreview]')[0];
            oldStyle = redliningPanel.getRedlinePointStyle();
            style = me.generatePointStyle(oldStyle, pointStyle);
            parentWindow.redlinePointStyle = style;
            redliningPanel.setRedlinePointStyle(style);
        } else if (lineStyle) {
            renderer = view.query('gx_renderer[name=lineRenderPreview]')[0];
            oldStyle = redliningPanel.getRedlineLineStringStyle();
            style = me.generateLineStringStyle(oldStyle, lineStyle);
            parentWindow.redlineLineStringStyle = style;
            redliningPanel.setRedlineLineStringStyle(style);
        } else {
            renderer = view.query('gx_renderer[name=polygonRenderPreview]')[0];
            oldStyle = redliningPanel.getRedlinePolygonStyle();
            style = me.generatePolygonStyle(oldStyle, polygonStyle);
            parentWindow.redlinePolygonStyle = style;
            redliningPanel.setRedlinePolygonStyle(style);
        }
        // refresh the gx_renderer
        if (renderer) {
            renderer.setSymbolizers(style);
        }

        // reapply the styleFn on the layer so that ol3 starts redrawing
        // with new styles
        redliningPanel.redliningVectorLayer.setStyle(
            redliningPanel.redliningVectorLayer.getStyle()
        );
    },

    /**
    *
    */
    generatePointStyle: function(oldStyle, pointStyle) {

        var fallBackRadius = 7;
        var fallBackFillColor = '#5fa2dd';
        var fallBackStrokeColor = '#ececec';
        var fallBackStrokeWidth = 2;
        var oldImage = oldStyle.getImage();
        if (oldImage && oldImage.getRadius) {
            fallBackRadius = oldImage.getRadius();
        }
        if (oldImage && oldImage.getFill && oldImage.getFill() &&
            oldImage.getFill().getColor) {
            fallBackFillColor = oldImage.getFill().getColor();
        }
        if (oldImage && oldImage.getStroke && oldImage.getStroke() &&
            oldImage.getStroke().getColor) {
            fallBackStrokeColor = oldImage.getStroke().getColor();
        }
        if (oldImage && oldImage.getStroke && oldImage.getStroke() &&
            oldImage.getStroke().getWidth) {
            fallBackStrokeWidth = oldImage.getStroke().getWidth();
        }
        var style = new ol.style.Style({
            image: pointStyle.radius || pointStyle.fillcolor ||
            pointStyle.fillopacity || pointStyle.strokewidth ||
            pointStyle.strokecolor ?
            new ol.style.Circle({
                radius: pointStyle.radius || fallBackRadius,
                fill: new ol.style.Fill({
                    color: pointStyle.fillcolor ? pointStyle.fillcolor :
                        fallBackFillColor
                }),
                stroke: new ol.style.Stroke({
                    color: pointStyle.strokecolor ? pointStyle.strokecolor :
                        fallBackStrokeColor,
                    width: pointStyle.strokewidth ? pointStyle.strokewidth :
                        fallBackStrokeWidth
                })
            }) : oldImage
        });
        return style;
    },

    /**
    *
    */
    generateLineStringStyle: function(oldStyle, lineStyle) {
        var style = new ol.style.Style({
            stroke: lineStyle.strokewidth || lineStyle.strokecolor ?
            new ol.style.Stroke({
                color: lineStyle.strokecolor ? lineStyle.strokecolor :
                    oldStyle.getStroke().getColor(),
                width: lineStyle.strokewidth ? lineStyle.strokewidth :
                    oldStyle.getStroke().getWidth()
            }) : oldStyle.getStroke()
        });
        return style;
    },

    /**
    *
    */
    generatePolygonStyle: function(oldStyle, polygonStyle) {
        var style = new ol.style.Style({
            fill: polygonStyle.fillcolor ?
            new ol.style.Fill({
                color: polygonStyle.fillcolor
            }) : oldStyle.getFill(),
            stroke: polygonStyle.strokewidth || polygonStyle.strokecolor ?
            new ol.style.Stroke({
                color: polygonStyle.strokecolor ? polygonStyle.strokecolor :
                    oldStyle.getStroke().getColor(),
                width: polygonStyle.strokewidth ? polygonStyle.strokewidth :
                    oldStyle.getStroke().getWidth()
            }) : oldStyle.getStroke()
        });
        return style;
    }
});
