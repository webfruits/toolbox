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
var DeviceUtils_1 = require("@webfruits/core/dist/utils/DeviceUtils");
var Signal_1 = require("@webfruits/core/dist/signal/Signal");
var ScrollBox = /** @class */ (function (_super) {
    __extends(ScrollBox, _super);
    /******************************************************************
     * Constructor
     *****************************************************************/
    function ScrollBox(_config) {
        var _a, _b;
        var _this = _super.call(this, "scroll-box") || this;
        _this._config = _config;
        _this._isScrolledToMax = false;
        _this._enableScrolling = true;
        _this._prevScrollTop = 0;
        _this._prevScrollLeft = 0;
        _this.onScrollSignal = new Signal_1.Signal();
        _this.onEnterScrollMaxSignal = new Signal_1.Signal();
        _this.onLeaveScrollMaxSignal = new Signal_1.Signal();
        _this.onScrollDownSignal = new Signal_1.Signal();
        _this.onScrollUpSignal = new Signal_1.Signal();
        _this.onScrollRightSignal = new Signal_1.Signal();
        _this.onScrollLeftSignal = new Signal_1.Signal();
        _this._config = (_a = _this._config, (_a !== null && _a !== void 0 ? _a : {}));
        _this._config.direction = (_b = _this._config.direction, (_b !== null && _b !== void 0 ? _b : "y"));
        _this.initContentBox();
        _this.initListeners();
        _this.initIOSScrollUpFix();
        return _this;
    }
    Object.defineProperty(ScrollBox.prototype, "scrollTop", {
        /******************************************************************
         * Public Methodes
         *****************************************************************/
        get: function () {
            return this._contentBox.view.scrollTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBox.prototype, "scrollLeft", {
        get: function () {
            return this._contentBox.view.scrollLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBox.prototype, "children", {
        get: function () {
            return this._contentBox.children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBox.prototype, "contentBox", {
        get: function () {
            return this._contentBox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBox.prototype, "isScrolledToMax", {
        get: function () {
            if (this._config.direction == "y") {
                return this._isScrolledToMax || this._contentBox.view.scrollHeight == this._contentBox.view.offsetHeight;
            }
            else {
                return this._isScrolledToMax || this._contentBox.view.scrollWidth == this._contentBox.view.offsetWidth;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBox.prototype, "isScrolledToMin", {
        get: function () {
            if (this._config.direction == "y") {
                return this.scrollTop <= 1;
            }
            else {
                return this.scrollLeft <= 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBox.prototype, "maxScrollTop", {
        get: function () {
            return this._contentBox.view.scrollHeight - this._contentBox.view.offsetHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBox.prototype, "maxScrollLeft", {
        get: function () {
            return this._contentBox.view.scrollWidth - this._contentBox.view.offsetWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBox.prototype, "enableScrolling", {
        set: function (value) {
            this._enableScrolling = value;
            this.updateStyles();
        },
        enumerable: true,
        configurable: true
    });
    ScrollBox.prototype.addChild = function (child) {
        if (!this._contentBox) {
            _super.prototype.addChild.call(this, child);
        }
        else {
            this._contentBox.addChild(child);
        }
    };
    ScrollBox.prototype.removeChild = function (child, destroy, destroyRecursivly) {
        if (this._contentBox) {
            this._contentBox.removeChild(child, destroy, destroyRecursivly);
        }
        else {
            _super.prototype.removeChild.call(this, child, destroy, destroyRecursivly);
        }
    };
    Object.defineProperty(ScrollBox.prototype, "maxScrollTo", {
        get: function () {
            return this._config.direction == "y" ? this.maxScrollTop : this.maxScrollLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollBox.prototype, "scrollTo", {
        get: function () {
            return this._config.direction == "y" ? this.scrollTop : this.scrollLeft;
        },
        set: function (value) {
            var scrollToObject = {};
            if (value < 0) {
                value = 0;
            }
            if (this._config.direction == "y") {
                if (value > this.maxScrollTop) {
                    value = this.maxScrollTop;
                }
                scrollToObject['y'] = value;
            }
            else {
                if (value > this.maxScrollLeft) {
                    value = this.maxScrollLeft;
                }
                scrollToObject['x'] = value;
            }
            var scrollX = this._config.direction == "x" ? value : 0;
            var scrollY = this._config.direction == "y" ? value : 0;
            this._contentBox.view.scrollTo(scrollX, scrollY);
            this.onScrollSignal.dispatch();
        },
        enumerable: true,
        configurable: true
    });
    ScrollBox.prototype.updateStyles = function () {
        this.applyStyle({
            overflow: "hidden",
            webkitMaskImage: "-webkit-radial-gradient(white, black)"
        });
        this._contentBox.applyStyle({
            overflowX: this._config.direction == "x" && this._enableScrolling ? "scroll" : "hidden",
            overflowY: this._config.direction == "y" && this._enableScrolling ? "scroll" : "hidden",
            webkitOverflowScrolling: "touch",
            paddingBottom: this._config.hideScrollBar && this._config.direction == "x" ? 50 : null,
            paddingRight: this._config.hideScrollBar && this._config.direction == "y" ? 50 : null,
            height: "100%",
            width: "100%"
        });
    };
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    ScrollBox.prototype.initIOSScrollUpFix = function () {
        var _this = this;
        if (!DeviceUtils_1.DeviceUtils.IS_IOS)
            return;
        this.onAddedToStageSignal.addOnce(function () {
            if (_this._config.direction == "y") {
                _this._contentBox.view.scrollTop = 1;
            }
            else {
                _this._contentBox.view.scrollLeft = 1;
            }
        });
        this.addNativeListener("scroll", function () { return _this.onScrolledOnIOS(); }, {
            capture: true,
            passive: true
        });
    };
    ScrollBox.prototype.initContentBox = function () {
        var contentBox = new core_1.UIComponent("scrollable-content-box");
        this.addChild(contentBox);
        this._contentBox = contentBox;
    };
    ScrollBox.prototype.initListeners = function () {
        var _this = this;
        this.addNativeListener("scroll", function () { return _this.onPageScrolled(); }, {
            capture: true,
            passive: true
        });
    };
    ScrollBox.prototype.checkMaxSignals = function () {
        var maxScrollValue = this._config.direction == "y" ? this.maxScrollTop : this.maxScrollLeft;
        var currentScrollValue = this._config.direction == "y" ? this._contentBox.view.scrollTop : this._contentBox.view.scrollLeft;
        if (maxScrollValue <= 0)
            return;
        if (currentScrollValue >= maxScrollValue - 1) {
            if (!this._isScrolledToMax) {
                this._isScrolledToMax = true;
                this.onEnterScrollMaxSignal.dispatch();
            }
        }
        else {
            if (this._isScrolledToMax) {
                this._isScrolledToMax = false;
                this.onLeaveScrollMaxSignal.dispatch();
            }
        }
    };
    /******************************************************************
     * Events
     *****************************************************************/
    ScrollBox.prototype.onPageScrolled = function () {
        if (!this._enableScrolling)
            return;
        this.checkMaxSignals();
        if (this._config.direction == "y") {
            if (this.scrollTop > this._prevScrollTop) {
                this.onScrollDownSignal.dispatch();
            }
            else if (this.scrollTop < this._prevScrollTop) {
                this.onScrollUpSignal.dispatch();
            }
            this._prevScrollTop = this.scrollTop;
        }
        else {
            if (this.scrollLeft > this._prevScrollLeft) {
                this.onScrollRightSignal.dispatch();
            }
            else if (this.scrollLeft < this._prevScrollLeft) {
                this.onScrollLeftSignal.dispatch();
            }
            this._prevScrollLeft = this.scrollLeft;
        }
        this.onScrollSignal.dispatch();
    };
    ScrollBox.prototype.onScrolledOnIOS = function () {
        if (!this._enableScrolling)
            return;
        if (this._config.direction == "y") {
            if (this._contentBox.view.scrollTop == 0) {
                this._contentBox.view.scrollTop = 1;
            }
            else if (this._contentBox.view.scrollTop == this.maxScrollTop) {
                this._contentBox.view.scrollTop = this.maxScrollTop - 1;
            }
        }
        else {
            if (this._contentBox.view.scrollLeft == 0) {
                this._contentBox.view.scrollLeft = 1;
            }
            else if (this._contentBox.view.scrollLeft == this.maxScrollLeft) {
                this._contentBox.view.scrollLeft = this.maxScrollLeft - 1;
            }
        }
    };
    return ScrollBox;
}(core_1.UIComponent));
exports.ScrollBox = ScrollBox;
