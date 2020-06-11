"use strict";
/******************************************************************
 * PromisedDelay
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var PromisedDelay = /** @class */ (function () {
    function PromisedDelay() {
    }
    PromisedDelay.wait = function (timeInSec) {
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(); }, timeInSec * 1000);
        });
    };
    return PromisedDelay;
}());
exports.PromisedDelay = PromisedDelay;
