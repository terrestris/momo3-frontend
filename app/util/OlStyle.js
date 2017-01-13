Ext.define('MoMo.client.util.OlStyle', {

    statics: {

        privates: {
            IMAGETYPECIRCLE: 'circle',
            IMAGETYPEICON: 'icon',
            IMAGETYPESHAPE: 'regularShape'
        },

        /**
         *
         */
        readStyle: function(styleObj) {
            if (!styleObj) {
                return undefined;
            }

            return new ol.style.Style({
                fill: this.readFillStyle(styleObj.fill),
                image: this.readImageStyle(styleObj.image),
                stroke: this.readStrokeStyle(styleObj.stroke),
                text: this.readTextStyle(styleObj.text),
                zIndex: styleObj.zIndex || undefined
            });
        },

        /**
         *
         */
        readImageStyle: function(imageStyleObj) {
            if (!imageStyleObj) {
                return undefined;
            }

            if (imageStyleObj.type === this.IMAGETYPECIRCLE) {
                return this.readCircleStyle(imageStyleObj);
            }

            if (imageStyleObj.type === this.IMAGETYPEICON) {
                return this.readIconStyle(imageStyleObj);
            }

            if (imageStyleObj.type === this.IMAGETYPESHAPE) {
                return this.readRegularShapeStyle(imageStyleObj);
            }

        },

        /**
         *
         */
        readCircleStyle: function(circleStyleObj) {
            return new ol.style.Circle({
                fill: this.readFillStyle(circleStyleObj.fill),
                image: this.readImageStyle(circleStyleObj.image),
                opacity: circleStyleObj.opacity || undefined,
                radius: circleStyleObj.radius,
                rotateWithView: circleStyleObj.rotateWithView || undefined,
                rotation: circleStyleObj.rotation || undefined,
                scale: circleStyleObj.scale || undefined,
                snapToPixel: circleStyleObj.snapToPixel || undefined,
                stroke: this.readStrokeStyle(circleStyleObj.stroke)
            });
        },

        /**
         *
         */
        readIconStyle: function(iconStyleObj) {
            return new ol.style.Icon({
                anchor: iconStyleObj.anchor || undefined,
                anchorXUnits: iconStyleObj.anchorXUnits || undefined,
                anchorYUnits: iconStyleObj.anchorYUnits || undefined,
                anchorOrigin: iconStyleObj.anchorOrigin || undefined,
                opacity: iconStyleObj.opacity || undefined,
                rotateWithView: iconStyleObj.rotateWithView || undefined,
                rotation: iconStyleObj.rotation || undefined,
                scale: iconStyleObj.scale || undefined,
                size: iconStyleObj.size || undefined,
                snapToPixel: iconStyleObj.snapToPixel || undefined,
                src: iconStyleObj.src
            });
        },

        /**
         *
         */
        readRegularShapeStyle: function(regularShapeStyleObj) {
            return new ol.style.RegularShape({
                angle: regularShapeStyleObj.angle || undefined,
                fill: this.readFillStyle(regularShapeStyleObj.fill),
                opacity: regularShapeStyleObj.opacity || undefined,
                points: regularShapeStyleObj.points,
                radius: regularShapeStyleObj.radius || undefined,
                radius2: regularShapeStyleObj.radius2 || undefined,
                rotateWithView: regularShapeStyleObj.rotateWithView ||
                        undefined,
                rotation: regularShapeStyleObj.rotation || undefined,
                scale: regularShapeStyleObj.scale || undefined,
                snapToPixel: regularShapeStyleObj.snapToPixel || undefined,
                stroke: this.readStrokeStyle(regularShapeStyleObj.stroke)
            });
        },

        /**
         *
         */
        readFillStyle: function(fillStyleObj) {
            if (!fillStyleObj) {
                return undefined;
            }

            return new ol.style.Fill(fillStyleObj);
        },

        /**
         *
         */
        readStrokeStyle: function(strokeStyleObj) {
            if (!strokeStyleObj) {
                return undefined;
            }

            return new ol.style.Stroke(strokeStyleObj);
        },

        /**
         *
         */
        readTextStyle: function(textStyleObj) {
            if (!textStyleObj) {
                return undefined;
            }

            return new ol.style.Text({
                fill: this.readFillStyle(textStyleObj.fill),
                font: textStyleObj.font || undefined,
                offsetX: textStyleObj.offsetX || undefined,
                offsetY: textStyleObj.offsetY || undefined,
                rotation: textStyleObj.rotation || undefined,
                scale: textStyleObj.scale || undefined,
                stroke: this.readStrokeStyle(textStyleObj.stroke),
                text: textStyleObj.text || undefined,
                textAlign: textStyleObj.textAlign || undefined,
                textBaseline: textStyleObj.textBaseline || undefined
            });
        },

        /**
         *
         */
        writeStyle: function(olStyle) {
            if (!(olStyle instanceof ol.style.Style)) {
                return undefined;
            }

            return {
                fill: this.writeFillStyle(olStyle.getFill()),
                image: this.writeImageStyle(olStyle.getImage()),
                stroke: this.writeStrokeStyle(olStyle.getStroke()),
                text: this.writeTextStyle(olStyle.getText()),
                zIndex: olStyle.getZIndex()
            };
        },

        /**
         *
         */
        writeImageStyle: function(olImageStyle) {
            if (!(olImageStyle instanceof ol.style.Image)) {
                return undefined;
            }

            if (olImageStyle instanceof ol.style.Circle) {
                return this.writeCircleStyle(olImageStyle);
            }

            if (olImageStyle instanceof ol.style.Icon) {
                return this.writeIconStyle(olImageStyle);
            }

            if (olImageStyle instanceof ol.style.RegularShape) {
                return this.writeRegularShapeStyle(olImageStyle);
            }
        },

        /**
         *
         */
        writeCircleStyle: function(olCircleStyle) {
            if (!(olCircleStyle instanceof ol.style.Circle)) {
                return undefined;
            }

            return {
                // provide additional type info for the object mapper
                type: this.IMAGETYPECIRCLE,
                fill: this.writeFillStyle(olCircleStyle.getFill()),
                image: this.writeImageStyle(olCircleStyle.getImage()),
                opacity: olCircleStyle.getOpacity(),
                radius: olCircleStyle.getRadius(),
                rotateWithView: olCircleStyle.getRotateWithView(),
                rotation: olCircleStyle.getRotation(),
                scale: olCircleStyle.getScale(),
                snapToPixel: olCircleStyle.getSnapToPixel(),
                stroke: this.writeStrokeStyle(olCircleStyle.getStroke())
            };
        },

        /**
         *
         */
        writeIconStyle: function(olIconStyle) {
            if (!(olIconStyle instanceof ol.style.Icon)) {
                return undefined;
            }

            return {
                // provide additional type info for the object mapper
                type: this.IMAGETYPEICON,
                anchor: olIconStyle.getAnchor(),
                // getAnchor() returns the anchor in pixel values always, hence
                // we need to set the anchorUnits respectively
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                anchorOrigin: olIconStyle.getOrigin(),
                opacity: olIconStyle.getOpacity(),
                rotateWithView: olIconStyle.getRotateWithView(),
                rotation: olIconStyle.getRotation(),
                scale: olIconStyle.getScale(),
                size: olIconStyle.getSize(),
                snapToPixel: olIconStyle.getSnapToPixel(),
                src: olIconStyle.getSrc()
            };
        },

        /**
         *
         */
        writeRegularShapeStyle: function(olRegularShape) {
            if (!(olRegularShape instanceof ol.style.RegularShape)) {
                return undefined;
            }

            return {
                // provide additional type info for the object mapper
                type: this.IMAGETYPESHAPE,
                angle: olRegularShape.getAngle(),
                fill: this.writeFillStyle(olRegularShape.getFill()),
                opacity: olRegularShape.getOpacity(),
                points: olRegularShape.getPoints(),
                radius: olRegularShape.getRadius(),
                radius2: olRegularShape.getRadius2(),
                rotateWithView: olRegularShape.getRotateWithView(),
                rotation: olRegularShape.getRotation(),
                scale: olRegularShape.getScale(),
                snapToPixel: olRegularShape.getSnapToPixel(),
                stroke: this.writeStrokeStyle(olRegularShape.getStroke())
            };
        },

        /**
         *
         */
        writeFillStyle: function(olFillStyle) {
            if (!(olFillStyle instanceof ol.style.Fill)) {
                return undefined;
            }

            return {
                color: olFillStyle.getColor()
            };
        },

        /**
         *
         */
        writeStrokeStyle: function(olStrokeStyle) {
            if (!(olStrokeStyle instanceof ol.style.Stroke)) {
                return undefined;
            }

            return {
                color: olStrokeStyle.getColor(),
                lineCap: olStrokeStyle.getLineCap(),
                lineJoin: olStrokeStyle.getLineJoin(),
                lineDash: olStrokeStyle.getLineDash(),
                miterLimit: olStrokeStyle.getMiterLimit(),
                width: olStrokeStyle.getWidth()
            };
        },

        /**
         *
         */
        writeTextStyle: function(olTextStyle) {
            if (!(olTextStyle instanceof ol.style.Text)) {
                return undefined;
            }

            return {
                fill: this.writeFillStyle(olTextStyle.getFill()),
                font: olTextStyle.getFont(),
                offsetX: olTextStyle.getOffsetX(),
                offsetY: olTextStyle.getOffsetY(),
                rotation: olTextStyle.getRotation(),
                scale: olTextStyle.getScale(),
                stroke: this.writeStrokeStyle(olTextStyle.getStroke()),
                text: olTextStyle.getText(),
                textAlign: olTextStyle.getTextAlign(),
                textBaseline: olTextStyle.getTextBaseline()
            };
        }

    }

});
