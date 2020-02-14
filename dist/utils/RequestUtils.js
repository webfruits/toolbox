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
        var _a, _b, _c, _d;
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onprogress = function (e) {
            var _a;
            if ((_a = options) === null || _a === void 0 ? void 0 : _a.progressListener) {
                options.progressListener(e);
            }
        };
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                options.resultListener(xmlHttpRequest.responseText);
            }
        };
        xmlHttpRequest.open(((_a = options) === null || _a === void 0 ? void 0 : _a.usePost) ? "POST" : "GET", url, true);
        if ((_b = options) === null || _b === void 0 ? void 0 : _b.requestHeaders) {
            options.requestHeaders.forEach(function (header) {
                xmlHttpRequest.setRequestHeader(header.key, header.value);
            });
        }
        xmlHttpRequest.onloadend = function () {
            if (xmlHttpRequest.status !== 200) {
                options.errorListener({ status: xmlHttpRequest.status, url: url });
            }
        };
        xmlHttpRequest.send((_d = (_c = options) === null || _c === void 0 ? void 0 : _c.sendData, (_d !== null && _d !== void 0 ? _d : null)));
        return xmlHttpRequest;
    };
    RequestUtils.getPromisedData = function (url, options) {
        return new Promise(function (resolve, reject) {
            var _a, _b, _c, _d, _e, _f;
            RequestUtils.getData(url, {
                sendData: (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.sendData, (_b !== null && _b !== void 0 ? _b : undefined)),
                usePost: (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.usePost, (_d !== null && _d !== void 0 ? _d : undefined)),
                requestHeaders: (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.requestHeaders, (_f !== null && _f !== void 0 ? _f : undefined)),
                resultListener: function (result) { return resolve(result); },
                errorListener: function (errorInfo) { return reject(errorInfo); }
            });
        });
    };
    return RequestUtils;
}());
exports.RequestUtils = RequestUtils;
