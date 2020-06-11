"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColorUtils_1 = require("@webfruits/core/dist/utils/ColorUtils");
/******************************************************************
 * GradientUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var GradientUtils = /** @class */ (function () {
    function GradientUtils() {
    }
    GradientUtils.createAlphaToColorSmoothGradient = function (config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var degree = (_b = (_a = config) === null || _a === void 0 ? void 0 : _a.degree, (_b !== null && _b !== void 0 ? _b : 180));
        var resolution = (_d = (_c = config) === null || _c === void 0 ? void 0 : _c.resolution, (_d !== null && _d !== void 0 ? _d : 12));
        var color = (_f = (_e = config) === null || _e === void 0 ? void 0 : _e.color, (_f !== null && _f !== void 0 ? _f : 0xFFFFFF));
        var startProgress = (_h = (_g = config) === null || _g === void 0 ? void 0 : _g.start, (_h !== null && _h !== void 0 ? _h : 0));
        var endProgress = (_k = (_j = config) === null || _j === void 0 ? void 0 : _j.end, (_k !== null && _k !== void 0 ? _k : 1));
        var progressLength = endProgress - startProgress;
        var cssColor = ColorUtils_1.ColorUtils.convertColorFromHexToCSS(color);
        var gradient = "";
        for (var i = 0; i <= resolution; i++) {
            var progress = i / resolution;
            var position = ((progress * 100) * progressLength + startProgress * 100) + "%";
            console.log(position);
            var easedAlpha = -(Math.cos(Math.PI * progress) - 1) / 2;
            gradient += ColorUtils_1.ColorUtils.addAlphaToCSS(cssColor, easedAlpha) + " " + position + ",";
        }
        gradient = gradient.slice(0, -1);
        return "linear-gradient(" + degree + "deg, " + gradient + ")";
    };
    return GradientUtils;
}());
exports.GradientUtils = GradientUtils;
