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
    RequestUtils.getData = function (url, options) {
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onprogress = function (e) {
            if (options && options.progressListener) {
                options.progressListener(e);
            }
        };
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                options.resultListener(xmlHttpRequest.responseText);
            }
        };
        xmlHttpRequest.open(options && options.usePost ? "POST" : "GET", url, true);
        if (options && options.requestHeaders) {
            options.requestHeaders.forEach(function (header) {
                xmlHttpRequest.setRequestHeader(header.key, header.value);
            });
        }
        xmlHttpRequest.onloadend = function () {
            if (xmlHttpRequest.status !== 200) {
                options.errorListener({ status: xmlHttpRequest.status, url: url });
            }
        };
        xmlHttpRequest.send(options && options.sendData ? options.sendData : null);
        return xmlHttpRequest;
    };
    RequestUtils.getPromisedData = function (url, options) {
        return new Promise(function (resolve, reject) {
            RequestUtils.getData(url, {
                sendData: options && options.sendData ? options.sendData : undefined,
                usePost: options && options.usePost ? options.usePost : undefined,
                requestHeaders: options && options.requestHeaders ? options.requestHeaders : undefined,
                resultListener: function (result) { return resolve(result); },
                errorListener: function (errorInfo) { return reject(errorInfo); }
            });
        });
    };
    return RequestUtils;
}());
exports.RequestUtils = RequestUtils;
