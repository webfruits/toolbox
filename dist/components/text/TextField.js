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
var core_1 = require("@webfruits/core");
/******************************************************************
 * TextField
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var TextField = /** @class */ (function (_super) {
    __extends(TextField, _super);
    /******************************************************************
     * Properties
     *****************************************************************/
    // no properties yet
    /******************************************************************
     * Constructor
     *****************************************************************/
    function TextField(_config) {
        var _a;
        var _this = _super.call(this, (_a = _config.name, (_a !== null && _a !== void 0 ? _a : "text-field"))) || this;
        _this._config = _config;
        if (_this._config.html) {
            _this.html = _this._config.html;
        }
        return _this;
    }
    Object.defineProperty(TextField.prototype, "html", {
        /******************************************************************
         * Public Methodes
         *****************************************************************/
        get: function () {
            return this.view.innerText;
        },
        set: function (value) {
            this.view.innerHTML = value;
            this.updateStyles();
        },
        enumerable: true,
        configurable: true
    });
    TextField.prototype.updateStyles = function () {
        this.applyStyle(this._config.fontStyle());
    };
    return TextField;
}(core_1.UIComponent));
exports.TextField = TextField;
