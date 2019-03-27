"use strict";
/******************************************************************
 * MathUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var MathUtils = /** @class */ (function () {
    function MathUtils() {
    }
    MathUtils.isMouseInRect = function (rect, mouseX, mouseY) {
        return rect.left <= mouseX && mouseX <= rect.left + rect.width &&
            rect.top <= mouseY && mouseY <= rect.top + rect.height;
    };
    MathUtils.degToRad = function (degrees) {
        return degrees * Math.PI / 180;
    };
    MathUtils.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };
    MathUtils.calcProgressWithinValues = function (minValue, maxValue, currentValue) {
        var delta = maxValue - minValue;
        var progress = (currentValue - minValue) / delta;
        if (progress < 0)
            progress = 0;
        if (progress > 1)
            progress = 1;
        return progress;
    };
    return MathUtils;
}());
exports.MathUtils = MathUtils;
