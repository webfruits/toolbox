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
        this._swipeDetectThreshold = 30;
        this.onLeftSwipeSignal = new Signal_1.Signal();
        this.onRightSwipeSignal = new Signal_1.Signal();
        this.onSwipeEndSignal = new Signal_1.Signal();
        this.onSwipeStartSignal = new Signal_1.Signal();
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
    Object.defineProperty(SwipeController.prototype, "isSwiping", {
        get: function () {
            return this._isSwiping;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwipeController.prototype, "swipeDetectThreshold", {
        get: function () {
            return this._swipeDetectThreshold;
        },
        set: function (value) {
            if (value < 1)
                value = 1;
            this._swipeDetectThreshold = value;
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
        this._elementEvents.addListener("touchstart", function (e) { return _this.onTouchStarted(e); });
        this._elementEvents.addListener("touchmove", function (e) { return _this.onTouchMove(e); });
        this._elementEvents.addListener("touchend", function () { return _this.onTouchEnd(); });
        this._elementEvents.addListener("mousedown", function (e) { return _this.onMouseDown(e); });
        this._elementEvents.addListener("mousemove", function (e) { return _this.onMouseMove(e); });
        this._elementEvents.addListener("mouseup", function () { return _this.onMouseUp(); });
    };
    SwipeController.prototype.checkForSwipe = function (dx) {
        if (this._swipeTriggered)
            return;
        if (Math.abs(dx) > this._swipeDetectThreshold) {
            this._swipeTriggered = true;
            if (dx > 0) {
                this.onRightSwipeSignal.dispatch();
            }
            else {
                this.onLeftSwipeSignal.dispatch();
            }
        }
    };
    SwipeController.prototype.checkPreventScrolling = function (e) {
        if (this._swipeTriggered) {
            e.preventDefault();
            return;
        }
        var dy = Math.abs(e.touches[0].clientY - this._touchStartY);
        if (dy > 10) {
            this._preventSwiping = true;
        }
    };
    /******************************************************************
     * Events
     *****************************************************************/
    SwipeController.prototype.onTouchStarted = function (e) {
        if (!this._enabled)
            return;
        this._preventSwiping = false;
        this._touchStartX = e.touches[0].clientX;
        this._touchStartY = e.touches[0].clientY;
    };
    SwipeController.prototype.onTouchMove = function (e) {
        if (!this._enabled || this._preventSwiping)
            return;
        this.checkForSwipe(e.touches[0].clientX - this._touchStartX);
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
        this._isSwiping = false;
        this.onSwipeEndSignal.dispatch();
    };
    SwipeController.prototype.onMouseDown = function (e) {
        if (!this._enabled)
            return;
        this._isMouseDown = true;
        this._mouseStartX = e.clientX;
    };
    SwipeController.prototype.onMouseMove = function (e) {
        if (!this._enabled)
            return;
        if (!this._isMouseDown)
            return;
        this.checkForSwipe(e.clientX - this._mouseStartX);
        if (!this._isSwiping) {
            this._isSwiping = true;
            this.onSwipeStartSignal.dispatch();
        }
    };
    SwipeController.prototype.onMouseUp = function () {
        if (!this._enabled)
            return;
        this._isMouseDown = false;
        this._swipeTriggered = false;
        this._isSwiping = false;
        this.onSwipeEndSignal.dispatch();
    };
    return SwipeController;
}());
exports.SwipeController = SwipeController;
