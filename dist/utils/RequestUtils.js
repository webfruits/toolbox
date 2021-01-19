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
    RequestUtils.getURL = function (options) {
        var _a;
        options.requestType = (_a = options.requestType, (_a !== null && _a !== void 0 ? _a : "GET"));
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onprogress = function (e) {
            if (options && options.progressListener) {
                options.progressListener(e);
            }
        };
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState == 4 && RequestUtils.isSuccessStatus(xmlHttpRequest.status))
                options.resultListener({
                    status: xmlHttpRequest.status,
                    url: options.url,
                    response: xmlHttpRequest.response,
                    responseText: xmlHttpRequest.responseText
                });
        };
        xmlHttpRequest.open(options.requestType, options.url, true);
        if (options && options.requestHeaders) {
            options.requestHeaders.forEach(function (header) {
                xmlHttpRequest.setRequestHeader(header.key, header.value);
            });
        }
        xmlHttpRequest.onloadend = function () {
            if (RequestUtils.isErrorStatus(xmlHttpRequest.status)) {
                options.errorListener({
                    status: xmlHttpRequest.status,
                    url: options.url,
                    response: xmlHttpRequest.response,
                    responseText: xmlHttpRequest.responseText
                });
            }
        };
        xmlHttpRequest.send(options && options.sendData ? options.sendData : null);
        return xmlHttpRequest;
    };
    RequestUtils.getPromisedData = function (url, options) {
        return new Promise(function (resolve, reject) {
            var _a, _b, _c, _d, _e, _f;
            RequestUtils.getURL({
                url: url,
                sendData: (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.sendData, (_b !== null && _b !== void 0 ? _b : undefined)),
                requestType: (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.requestType, (_d !== null && _d !== void 0 ? _d : "GET")),
                requestHeaders: (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.requestHeaders, (_f !== null && _f !== void 0 ? _f : undefined)),
                resultListener: function (result) { return resolve(result); },
                errorListener: function (error) { return reject(error); }
            });
        });
    };
    RequestUtils.isSuccessStatus = function (statusCode) {
        return statusCode >= 200 && statusCode < 300;
    };
    RequestUtils.isErrorStatus = function (statusCode) {
        return statusCode >= 400 && statusCode < 600;
    };
    return RequestUtils;
}());
exports.RequestUtils = RequestUtils;
