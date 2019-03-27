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
/******************************************************************
 * GridLayout
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var core_1 = require("@webfruits/core");
var GridLayout = /** @class */ (function (_super) {
    __extends(GridLayout, _super);
    /******************************************************************
     * Properties
     *****************************************************************/
    /******************************************************************
     * Constructor
     *****************************************************************/
    function GridLayout(_numColumns, _gapWidth) {
        if (_numColumns === void 0) { _numColumns = 3; }
        if (_gapWidth === void 0) { _gapWidth = 20; }
        var _this = _super.call(this, "grid-layout") || this;
        _this._numColumns = _numColumns;
        _this._gapWidth = _gapWidth;
        return _this;
    }
    Object.defineProperty(GridLayout.prototype, "numColumns", {
        /******************************************************************
         * Public Methodes
         *****************************************************************/
        get: function () {
            return this._numColumns;
        },
        set: function (value) {
            if (value < 1)
                value = 1;
            this._numColumns = value;
            this.updateStyles();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridLayout.prototype, "gapWidth", {
        get: function () {
            return this._gapWidth;
        },
        set: function (value) {
            this._gapWidth = value;
            this.updateStyles();
        },
        enumerable: true,
        configurable: true
    });
    GridLayout.prototype.addChild = function (item) {
        _super.prototype.addChild.call(this, item);
        this.updateStyles();
    };
    GridLayout.prototype.updateStyles = function () {
        var _this = this;
        this.applyStyle({
            fontSize: 0
        });
        var numRows = Math.ceil(this.children.length / this._numColumns);
        var currentRows = 0;
        this.children.forEach(function (item, i) {
            var columnID = i % _this._numColumns;
            if (columnID == 0)
                currentRows++;
            item.applyStyle({
                display: "inline-block",
                position: "relative",
                width: "calc((100% / " + _this._numColumns + ") - " + (((_this._numColumns - 1) * _this._gapWidth) / _this._numColumns) + "px)",
                marginLeft: columnID > 0 ? _this._gapWidth : 0,
                marginBottom: currentRows < numRows ? _this._gapWidth : 0
            });
        });
    };
    return GridLayout;
}(core_1.UIComponent));
exports.GridLayout = GridLayout;
