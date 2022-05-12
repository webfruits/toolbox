"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeEventsController_1 = require("@webfruits/core/dist/controller/NativeEventsController");
var Signal_1 = require("@webfruits/core/dist/signal/Signal");
/******************************************************************
 * SwipeController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var SwipeController = /** @class */ (function () {
    /******************************************************************
     * Constructor
     *****************************************************************/
    function SwipeController(_element) {
        this._element = _element;
        this._enabled = true;
        this._useTouchOnly = false;
        this._swipeDetectThresholdX = 30;
        this._swipeDetectThresholdY = 30;
        this.onLeftSwipeSignal = new Signal_1.Signal();
        this.onRightSwipeSignal = new Signal_1.Signal();
        this.onSwipeEndSignal = new Signal_1.Signal();
        this.onSwipeStartSignal = new Signal_1.Signal();
        this.onSwipingSignal = new Signal_1.Signal();
        this.onDownSwipeSignal = new Signal_1.Signal();
        this.onUpSwipeSignal = new Signal_1.Signal();
        this.initListeners();
    }
    Object.defineProperty(SwipeController.prototype, "enabled", {
        /******************************************************************
         * Public Methodes
         *****************************************************************/
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            this._enabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwipeController.prototype, "useTouchOnly", {
        set: function (value) {
            this._useTouchOnly = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwipeController.prototype, "isSwiping", {
        get: function () {
            return this._isSwiping;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwipeController.prototype, "swipeDetectThresholdX", {
        get: function () {
            return this._swipeDetectThresholdX;
        },
        set: function (value) {
            if (value < 11)
                value = 11;
            this._swipeDetectThresholdX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwipeController.prototype, "swipeDetectThresholdY", {
        get: function () {
            return this._swipeDetectThresholdY;
        },
        set: function (value) {
            if (value < 11)
                value = 11;
            this._swipeDetectThresholdY = value;
        },
        enumerable: true,
        configurable: true
    });
    SwipeController.prototype.destroy = function () {
        this._elementEvents.destroy();
        this.onLeftSwipeSignal.removeAll();
        this.onRightSwipeSignal.removeAll();
        this.onSwipeEndSignal.removeAll();
        this.onSwipeStartSignal.removeAll();
        this._element = null;
    };
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    SwipeController.prototype.initListeners = function () {
        var _this = this;
        this._elementEvents = new NativeEventsController_1.NativeEventsController(this._element);
        this._elementEvents.addListener("touchstart", function (e) { return _this.onTouchStarted(e); }, { passive: false });
        this._elementEvents.addListener("touchmove", function (e) { return _this.onTouchMove(e); }, { passive: false });
        this._elementEvents.addListener("touchend", function () { return _this.onTouchEnd(); });
        this._elementEvents.addListener("mousedown", function (e) { return _this.onMouseDown(e); });
        this._elementEvents.addListener("mousemove", function (e) { return _this.onMouseMove(e); });
        this._elementEvents.addListener("mouseup", function () { return _this.onMouseUp(); });
    };
    SwipeController.prototype.checkForSwipe = function (dx, dy) {
        if (this._swipeTriggered || this._preventSwipeDispatch)
            return;
        if (Math.abs(dx) >= 11 || Math.abs(dy) >= 11) {
            this._swipeDetecting = true;
            this.onSwipingSignal.dispatch({ dx: dx, dy: dy });
            if (dx > this._swipeDetectThresholdX) {
                this._swipeTriggered = true;
                this.onRightSwipeSignal.dispatch();
            }
            else if (dx < -this._swipeDetectThresholdX) {
                this._swipeTriggered = true;
                this.onLeftSwipeSignal.dispatch();
            }
            else if (dy > this._swipeDetectThresholdY) {
                this._swipeTriggered = true;
                this.onDownSwipeSignal.dispatch();
            }
            else if (dy < -this._swipeDetectThresholdY) {
                this._swipeTriggered = true;
                this.onUpSwipeSignal.dispatch();
            }
        }
    };
    SwipeController.prototype.checkPreventScrolling = function (e) {
        if (this._swipeTriggered || this._swipeDetecting) {
            e.preventDefault();
            return;
        }
        var dy = e.touches[0].clientY - this._touchStartY;
        if (Math.abs(dy) >= 10
            && this.onDownSwipeSignal.listeners.length == 0
            && this.onUpSwipeSignal.listeners.length == 0) {
            this._preventSwipeDispatch = true;
        }
    };
    /******************************************************************
     * Events
     *****************************************************************/
    SwipeController.prototype.onTouchStarted = function (e) {
        if (!this._enabled)
            return;
        this._preventSwipeDispatch = false;
        this._swipeTriggered = false;
        this._swipeDetecting = false;
        this._touchStartX = e.touches[0].clientX;
        this._touchStartY = e.touches[0].clientY;
    };
    SwipeController.prototype.onTouchMove = function (e) {
        if (!this._enabled)
            return;
        var dx = e.touches[0].clientX - this._touchStartX;
        var dy = e.touches[0].clientY - this._touchStartY;
        this.checkForSwipe(dx, dy);
        this.checkPreventScrolling(e);
        if (!this._isSwiping) {
            this._isSwiping = true;
            this.onSwipeStartSignal.dispatch();
        }
    };
    SwipeController.prototype.onTouchEnd = function () {
        if (!this._enabled)
            return;
        this._swipeTriggered = false;
        this._swipeDetecting = false;
        this._isSwiping = false;
        this.onSwipeEndSignal.dispatch();
    };
    SwipeController.prototype.onMouseDown = function (e) {
        if (!this._enabled || this._useTouchOnly)
            return;
        this._isMouseDown = true;
        this._mouseStartX = e.clientX;
        this._mouseStartY = e.clientY;
    };
    SwipeController.prototype.onMouseMove = function (e) {
        if (!this._enabled || this._useTouchOnly)
            return;
        if (!this._isMouseDown)
            return;
        var dx = e.clientX - this._mouseStartX;
        var dy = e.clientY - this._mouseStartY;
        this.checkForSwipe(dx, dy);
        if (!this._isSwiping) {
            this._isSwiping = true;
            this.onSwipeStartSignal.dispatch();
        }
    };
    SwipeController.prototype.onMouseUp = function () {
        if (!this._enabled || this._useTouchOnly)
            return;
        this._isMouseDown = false;
        this._swipeTriggered = false;
        this._isSwiping = false;
        this.onSwipeEndSignal.dispatch();
    };
    return SwipeController;
}());
exports.SwipeController = SwipeController;
