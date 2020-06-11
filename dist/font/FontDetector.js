"use strict";
/******************************************************************
 * FontDetector
 *
 * based on https://www.lalit.org/wordpress/wp-content/uploads/2008/05/fontdetect.js?ver=0.3
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var FontDetector = /** @class */ (function () {
    function FontDetector() {
    }
    FontDetector.isAvailable = function (fontName, fontWeight) {
        var baseFonts = ['monospace', 'sans-serif', 'serif'];
        var testString = "mmmmmmmmmmlli";
        var testSize = '72px';
        var spanElement = document.createElement("span");
        spanElement.style.fontSize = testSize;
        spanElement.innerHTML = testString;
        var defaultWidth = {};
        var defaultHeight = {};
        for (var index in baseFonts) {
            spanElement.style.fontFamily = baseFonts[index];
            document.body.appendChild(spanElement);
            defaultWidth[baseFonts[index]] = spanElement.offsetWidth;
            defaultHeight[baseFonts[index]] = spanElement.offsetHeight;
            document.body.removeChild(spanElement);
        }
        var detected = false;
        for (var index in baseFonts) {
            spanElement.style.fontFamily = fontName + ',' + baseFonts[index];
            if (fontWeight) {
                spanElement.style.fontWeight = fontWeight;
            }
            document.body.appendChild(spanElement);
            var matched = (spanElement.offsetWidth != defaultWidth[baseFonts[index]] || spanElement.offsetHeight != defaultHeight[baseFonts[index]]);
            document.body.removeChild(spanElement);
            detected = detected || matched;
        }
        return detected;
    };
    FontDetector.initializeFonts = function (fontList) {
        return new Promise(function (resolve) {
            checkForFont();
            function checkForFont() {
                requestAnimationFrame(function () {
                    var allFontsAvailable = true;
                    fontList.forEach(function (fontData) {
                        if (!FontDetector.isAvailable(fontData.fontName, fontData.fontWeight)) {
                            allFontsAvailable = false;
                        }
                    });
                    if (allFontsAvailable) {
                        resolve();
                    }
                    else {
                        checkForFont();
                    }
                });
            }
        });
    };
    return FontDetector;
}());
exports.FontDetector = FontDetector;
