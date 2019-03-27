"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProgressTimer_1 = require("../../timer/ProgressTimer");
var NativeEventsController_1 = require("@webfruits/core/dist/controller/NativeEventsController");
var Signal_1 = require("@webfruits/core/dist/signal/Signal");
/******************************************************************
 * WheelController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var WheelController = /** @class */ (function () {
    /******************************************************************
     * Constructor
     *****************************************************************/
    function WheelController(_element) {
        this._element = _element;
        this._enabled = true;
        this._blockScrolling = false;
        this._deltaScrollYThreshold = WheelController.DEFAULT_SCROLL_DELTA_Y_THRESHOLD;
        this.onUpSignal = new Signal_1.Signal();
        this.onDownSignal = new Signal_1.Signal();
        this.onInteractionStartSignal = new Signal_1.Signal();
        this.initListener();
    }
    Object.defineProperty(WheelController.prototype, "enabled", {
        /******************************************************************
         * Public Methodes
         *****************************************************************/
        set: function (value) {
            this._enabled = value;
            this.updateThreshold();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WheelController.prototype, "preventDefault", {
        set: function (value) {
            this._preventDefault = value;
        },
        enumerable: true,
        configurable: true
    });
    WheelController.prototype.destroy = function () {
        this.onUpSignal.removeAll();
        this.onDownSignal.removeAll();
        this.onInteractionStartSignal.removeAll();
        this._elementEvents.destroy();
        this._element = null;
    };
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    WheelController.prototype.initListener = function () {
        var _this = this;
        this._elementEvents = new NativeEventsController_1.NativeEventsController(this._element);
        this._elementEvents.addListener("wheel", function (e) { return _this.onMouseWheel(e); }, true);
        this._elementEvents.addListener("touchstart", function (e) { return _this.onTouchStart(e); }, true);
        this._elementEvents.addListener("touchmove", function (e) { return _this.onTouchMove(e); }, true);
    };
    WheelController.prototype.updateThreshold = function () {
        var _this = this;
        this._deltaScrollYThreshold = Math.abs(this._lastDeltaY) + 100;
        var difference = this._deltaScrollYThreshold - WheelController.DEFAULT_SCROLL_DELTA_Y_THRESHOLD;
        if (this._updateThresholdTimer) {
            this._updateThresholdTimer.stop();
        }
        this._updateThresholdTimer = new ProgressTimer_1.ProgressTimer(1, {
            onUpdate: function (progress) {
                _this._deltaScrollYThreshold = (difference * (1 - progress)) + WheelController.DEFAULT_SCROLL_DELTA_Y_THRESHOLD;
            }
        });
    };
    WheelController.prototype.unblockScrolling = function (initialDeltaY) {
        var _this = this;
        var maxDeltaY = Math.abs(initialDeltaY);
        var lastMaxDeltaUpdate = Date.now();
        if (this._unblockScrollingTimer) {
            this._unblockScrollingTimer.stop();
        }
        this._unblockScrollingTimer = new ProgressTimer_1.ProgressTimer(5, {
            onUpdate: function () {
                if (maxDeltaY < Math.abs(_this._lastDeltaY)) {
                    maxDeltaY = Math.abs(_this._lastDeltaY);
                    lastMaxDeltaUpdate = Date.now();
                }
                if ((Date.now() - lastMaxDeltaUpdate) > 300) {
                    _this._unblockScrollingTimer.stop();
                    _this._blockScrolling = false;
                    _this.updateThreshold();
                }
            },
            onComplete: function () {
                _this.updateThreshold();
                _this._blockScrolling = false;
            }
        });
    };
    /******************************************************************
     * Events
     *****************************************************************/
    WheelController.prototype.onMouseWheel = function (e) {
        this.onInteractionStartSignal.dispatch(e);
        this._lastDeltaY = e.deltaY;
        if (this._preventDefault) {
            e.preventDefault();
        }
        if (!this._enabled)
            return;
        if (this._blockScrolling || Math.abs(e.deltaY) < this._deltaScrollYThreshold)
            return;
        this._blockScrolling = true;
        this.unblockScrolling(e.deltaY);
        if (e.deltaY < 0) {
            this.onUpSignal.dispatch();
        }
        else {
            this.onDownSignal.dispatch();
        }
    };
    WheelController.prototype.onTouchStart = function (e) {
        this.onInteractionStartSignal.dispatch(e);
        if (!this._enabled)
            return;
        this._isDragging = true;
        this._touchStartY = e.touches[0].clientY;
    };
    WheelController.prototype.onTouchMove = function (e) {
        if (this._preventDefault) {
            e.preventDefault();
        }
        if (!this._enabled || !this._isDragging)
            return;
        var dy = (e.touches[0].clientY - this._touchStartY);
        if (Math.abs(dy) < WheelController.TOUCH_DELTA_Y_THRESHOLD)
            return;
        if (dy > 0) {
            this.onUpSignal.dispatch();
        }
        else {
            this.onDownSignal.dispatch();
        }
        this._isDragging = false;
    };
    /******************************************************************
     * Properties
     *****************************************************************/
    WheelController.DEFAULT_SCROLL_DELTA_Y_THRESHOLD = 2;
    WheelController.TOUCH_DELTA_Y_THRESHOLD = 100;
    return WheelController;
}());
exports.WheelController = WheelController;
