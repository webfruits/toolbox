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
    URLUtils.downloadURL = function (url, filename) {
        var anchorElement = document.createElement('a');
        document.body.appendChild(anchorElement);
        anchorElement.download = filename;
        anchorElement.href = url;
        anchorElement.click();
        anchorElement.remove();
    };
    return URLUtils;
}());
exports.URLUtils = URLUtils;
