"use strict";
/******************************************************************
 * ProgressTimer
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var ProgressTimer = /** @class */ (function () {
    /******************************************************************
     * Constructor
     *****************************************************************/
    function ProgressTimer(_duration, _callbacks) {
        this._duration = _duration;
        this._callbacks = _callbacks;
        this.start();
    }
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    ProgressTimer.prototype.stop = function () {
        this._stopped = true;
    };
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    ProgressTimer.prototype.start = function () {
        this._startTime = Date.now();
        this.update();
    };
    ProgressTimer.prototype.update = function () {
        var _this = this;
        if (this._stopped)
            return;
        var timePassed = Date.now() - this._startTime;
        if (timePassed < this._duration * 1000) {
            requestAnimationFrame(function () { return _this.update(); });
            if (this._callbacks.onUpdate) {
                var progress = timePassed / (this._duration * 1000);
                this._callbacks.onUpdate(progress);
            }
        }
        else {
            if (this._callbacks.onUpdate) {
                this._callbacks.onUpdate(1);
            }
            if (this._callbacks.onComplete) {
                this._callbacks.onComplete();
            }
        }
    };
    return ProgressTimer;
}());
exports.ProgressTimer = ProgressTimer;
