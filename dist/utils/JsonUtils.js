"use strict";
/******************************************************************
 * JsonUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var JsonUtils = /** @class */ (function () {
    function JsonUtils() {
    }
    JsonUtils.getStringifiedValueFromObject = function (keyPath, data) {
        var value = JSON.stringify(JsonUtils.getValueFromObject(keyPath, data));
        if (value && value.charAt(0) == '"' && value.charAt(value.length - 1) == '"') {
            value = value.slice(1, -1);
        }
        return value;
    };
    JsonUtils.getValueFromObject = function (keyPath, data) {
        return keyPath.split('.').reduce(function (o, k) {
            return o && o[k];
        }, data);
    };
    JsonUtils.isStringifiedArray = function (value) {
        return value.charAt(0) == "[" && value.charAt(value.length - 1) == "]";
    };
    JsonUtils.isStringifiedObject = function (value) {
        return value.charAt(0) == "{" && value.charAt(value.length - 1) == "}";
    };
    JsonUtils.isStringifiedBoolean = function (value) {
        return value == "true" || value == "false";
    };
    JsonUtils.isStringifiedNull = function (value) {
        return value == "null" || value == "undefined";
    };
    JsonUtils.isStringifiedNumber = function (value) {
        return parseFloat(value).toString() == value;
    };
    return JsonUtils;
}());
exports.JsonUtils = JsonUtils;
