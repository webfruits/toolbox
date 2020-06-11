"use strict";
/******************************************************************
 * ArrayUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayUtils = /** @class */ (function () {
    function ArrayUtils() {
    }
    ArrayUtils.getRandomValue = function (array) {
        return array[Math.floor(Math.random() * array.length)];
    };
    return ArrayUtils;
}());
exports.ArrayUtils = ArrayUtils;
