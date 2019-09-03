"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MathUtils_1 = require("./MathUtils");
/******************************************************************
 * SVGUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var SVGUtils = /** @class */ (function () {
    function SVGUtils() {
    }
    SVGUtils.getElementByID = function (svgElement, idPrefix, id) {
        return svgElement.querySelectorAll("#" + idPrefix + id)[0];
    };
    SVGUtils.getElementsByID = function (svgElement, idPrefix, id) {
        return Array.from(svgElement.querySelectorAll("#" + idPrefix + id));
    };
    SVGUtils.getElementsByPartOfID = function (svgElement, idPrefix, partofID) {
        return Array.from(svgElement.querySelectorAll("[id^=" + idPrefix + partofID + "]"));
    };
    SVGUtils.getLocalTransform = function (svgElement) {
        var transform = svgElement.getAttribute("transform");
        if (transform) {
            var translate = transform.replace("translate(", "").replace(")", "").replace(" ", "");
            var x = parseFloat(translate.split(",")[0]);
            var y = parseFloat(translate.split(",")[1]);
            if (translate.indexOf("matrix") != -1) {
                translate = translate.replace("matrix(", "");
                x = parseFloat(translate.split(",")[4]);
                y = parseFloat(translate.split(",")[5]);
            }
            // FIX FOR IE11
            if (translate.indexOf(",") == -1) {
                translate = transform.replace("translate(", "").replace(")", "").replace(", ", "");
                x = parseFloat(translate.split(" ")[0]);
                y = parseFloat(translate.split(" ")[1]);
            }
            return { x: x, y: y };
        }
        return null;
    };
    SVGUtils.getArcPath = function (radius, startDegree, endDegree) {
        var start = MathUtils_1.MathUtils.polarToCartesian(0, 0, radius, endDegree);
        var end = MathUtils_1.MathUtils.polarToCartesian(0, 0, radius, startDegree);
        var largeArcFlag = endDegree - startDegree <= 180 ? "0" : "1";
        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    };
    return SVGUtils;
}());
exports.SVGUtils = SVGUtils;
