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
    DOMUtils.disablePageScrolling = function () {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
    };
    DOMUtils.enablePageScrolling = function () {
        document.body.style.overflow = null;
        document.documentElement.style.overflow = null;
    };
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
    DOMUtils.isTextInputElementActive = function () {
        var isContentEditable = document.activeElement.getAttribute("contentEditable") == "true";
        var isTextInput = !!document.activeElement.getAttribute("type");
        var isTextArea = document.activeElement instanceof HTMLTextAreaElement;
        return isContentEditable || isTextInput || isTextArea;
    };
    // inspired by https://stackoverflow.com/questions/10787782/full-height-of-a-html-element-div-including-border-padding-and-margin
    DOMUtils.calcElementWidth = function (element) {
        if (!element) {
            return 0;
        }
        var widthRelatedProperties = [
            'margin-left',
            'margin-right',
            'border-left',
            'border-right',
            'padding-left',
            'padding-right',
            'width'
        ];
        var style = window.getComputedStyle(element);
        return widthRelatedProperties
            .map(function (property) {
            var value = parseInt(style.getPropertyValue(property), 10);
            if (!value || isNaN(value)) {
                value = 0;
            }
            return value;
        })
            .reduce(function (prev, cur) { return prev + cur; });
    };
    DOMUtils.calcElementHeight = function (element) {
        if (!element) {
            return 0;
        }
        var heightRelatedProperties = [
            'margin-top',
            'margin-bottom',
            'border-top',
            'border-bottom',
            'padding-top',
            'padding-bottom',
            'height'
        ];
        var style = window.getComputedStyle(element);
        return heightRelatedProperties
            .map(function (property) {
            var value = parseInt(style.getPropertyValue(property), 10);
            if (!value || isNaN(value)) {
                value = 0;
            }
            return value;
        })
            .reduce(function (prev, cur) { return prev + cur; });
    };
    return DOMUtils;
}());
exports.DOMUtils = DOMUtils;
