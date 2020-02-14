"use strict";
/******************************************************************
 * URLUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var URLUtils = /** @class */ (function () {
    function URLUtils() {
    }
    URLUtils.getUrlParam = function (paraName, defaultValue) {
        if (defaultValue === void 0) { defaultValue = undefined; }
        var value = URLUtils.getUrlParams()[paraName];
        return value ? value : defaultValue;
    };
    URLUtils.getUrlParams = function () {
        var vars = {};
        location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (substring) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var paraName = args[0];
            vars[paraName] = args[1];
            return substring;
        });
        return vars;
    };
    URLUtils.openLink = function (href, openInNewWindow, openAsPopup) {
        if (openInNewWindow === void 0) { openInNewWindow = true; }
        if (openAsPopup === void 0) { openAsPopup = false; }
        if (href.indexOf("mailto") != -1) {
            location.href = href;
        }
        else if (href.indexOf("whatsapp") != -1) {
            location.href = href;
        }
        else if (openAsPopup) {
            window.open(href, '', 'width=600, height=300, menubar=no, toolbar=no, resizable=yes, scrollbars=yes').focus();
        }
        else {
            window.open(href, openInNewWindow ? '_blank' : '_self').focus();
        }
    };
    URLUtils.downloadURL = function (url, filename, useTargetBlank) {
        if (useTargetBlank === void 0) { useTargetBlank = false; }
        var anchorElement = document.createElement('a');
        document.body.appendChild(anchorElement);
        if (useTargetBlank) {
            anchorElement.target = "_blank";
        }
        anchorElement.download = filename ? filename : url.match(/[^/\\&?]+\.\w{3,4}(?=([?&].*$|$))/)[0];
        anchorElement.href = url;
        anchorElement.click();
        anchorElement.remove();
    };
    return URLUtils;
}());
exports.URLUtils = URLUtils;
