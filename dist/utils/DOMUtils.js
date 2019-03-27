"use strict";
/******************************************************************
 * DOMUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var DOMUtils = /** @class */ (function () {
    function DOMUtils() {
    }
    DOMUtils.getArrayFrom = function (htmlCollection) {
        if (Array.from) {
            return Array.from(htmlCollection);
        }
        return [].slice.call(htmlCollection);
    };
    DOMUtils.getElementIndex = function (element) {
        var nodes = DOMUtils.getArrayFrom(element.parentElement.children);
        return nodes.indexOf(element);
    };
    DOMUtils.getDatasetValue = function (element, datasetName, defaultValue) {
        if (element && element.dataset[datasetName]) {
            return element.dataset[datasetName];
        }
        else {
            return defaultValue;
        }
    };
    return DOMUtils;
}());
exports.DOMUtils = DOMUtils;
