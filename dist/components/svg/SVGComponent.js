"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SVGUtils_1 = require("../../utils/SVGUtils");
var core_1 = require("@webfruits/core");
var DeviceUtils_1 = require("@webfruits/core/dist/utils/DeviceUtils");
/******************************************************************
 * SVGComponent
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var SVGComponent = /** @class */ (function (_super) {
    __extends(SVGComponent, _super);
    /******************************************************************
     * Constructor
     *****************************************************************/
    function SVGComponent(svgString, elementName) {
        if (elementName === void 0) { elementName = "svg-component"; }
        var _this = _super.call(this, elementName) || this;
        _this.view.innerHTML = _this.addIDPrefix(svgString);
        _this._svgRoot = _this.view.getElementsByTagName("svg")[0];
        _this._viewBoxAttr = _this._svgRoot.getAttribute("viewBox");
        _this._svgRoot.removeAttribute("viewBox");
        if (_this._svgRoot.getElementsByTagName("title")[0]) {
            _this._svgRoot.removeChild(_this._svgRoot.getElementsByTagName("title")[0]);
        }
        return _this;
    }
    Object.defineProperty(SVGComponent.prototype, "defaultWidth", {
        /******************************************************************
         * Public Methodes
         *****************************************************************/
        get: function () {
            return parseFloat(this._viewBoxAttr.split(" ")[2]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGComponent.prototype, "defaultHeight", {
        get: function () {
            return parseFloat(this._viewBoxAttr.split(" ")[3]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGComponent.prototype, "width", {
        set: function (value) {
            this._svgRoot.setAttribute("width", value.toString() + "px");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGComponent.prototype, "height", {
        set: function (value) {
            this._svgRoot.setAttribute("height", value.toString() + "px");
        },
        enumerable: true,
        configurable: true
    });
    SVGComponent.prototype.clearSizeDefinition = function () {
        this._svgRoot.removeAttribute("width");
        this._svgRoot.removeAttribute("height");
        this._svgRoot.setAttribute("viewBox", this._viewBoxAttr);
        if (DeviceUtils_1.DeviceUtils.IS_IE) {
            this._svgRoot.style.height = this._viewBoxAttr.split(" ")[3] + "px";
        }
    };
    SVGComponent.prototype.getElementByID = function (id) {
        return SVGUtils_1.SVGUtils.getElementByID(this._svgRoot, this.idPrefix, id);
    };
    SVGComponent.prototype.getElementsByID = function (id) {
        return SVGUtils_1.SVGUtils.getElementsByID(this._svgRoot, this.idPrefix, id);
    };
    Object.defineProperty(SVGComponent.prototype, "idPrefix", {
        /******************************************************************
         * Private Methodes
         *****************************************************************/
        get: function () {
            var groupID = this._svgRoot.getElementsByTagName("g")[0].getAttribute("id");
            if (groupID.indexOf("___") > 0) {
                return "__" + groupID.split("__")[1] + "___";
            }
            return "__" + groupID.split("__")[1] + "__";
        },
        enumerable: true,
        configurable: true
    });
    ;
    SVGComponent.prototype.addIDPrefix = function (source) {
        if (source.indexOf("__") != -1) {
            return source; // has already idPrefix
        }
        var idPrefix = "__" + this.generateHashFromSource(source) + "__";
        source = source.split('id="').join('id="' + idPrefix);
        return source;
    };
    SVGComponent.prototype.generateHashFromSource = function (source) {
        var hash = 0, i, chr;
        if (source.length === 0)
            return hash;
        for (i = 0; i < source.length; i++) {
            chr = source.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(Math.round(Math.random() * hash));
    };
    return SVGComponent;
}(core_1.UIComponent));
exports.SVGComponent = SVGComponent;
