"use strict";
/******************************************************************
 * RequestUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var RequestUtils = /** @class */ (function () {
    function RequestUtils() {
    }
    RequestUtils.getURL = function (url, resultListener, options) {
        if (options === void 0) { options = null; }
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onprogress = function (e) {
            if (options && options.progressListener) {
                options.progressListener(e);
            }
        };
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200)
                resultListener(xmlHttpRequest.responseText);
        };
        xmlHttpRequest.open(options && options.usePost ? "POST" : "GET", url, true);
        if (options && options.requestHeaders) {
            options.requestHeaders.forEach(function (header) {
                xmlHttpRequest.setRequestHeader(header.key, header.value);
            });
        }
        xmlHttpRequest.send(options && options.sendData ? options.sendData : null);
        return xmlHttpRequest;
    };
    return RequestUtils;
}());
exports.RequestUtils = RequestUtils;
