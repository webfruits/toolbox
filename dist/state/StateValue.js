"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Signal_1 = require("@webfruits/core/dist/signal/Signal");
/******************************************************************
 * StateValue
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var StateValue = /** @class */ (function () {
    /******************************************************************
     * Constructor
     *****************************************************************/
    function StateValue(_defaultValue) {
        if (_defaultValue === void 0) { _defaultValue = undefined; }
        this._defaultValue = _defaultValue;
        this._prevValue = undefined;
        this.onChangeSignal = new Signal_1.Signal();
        this._value = this._defaultValue;
    }
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    StateValue.prototype.getValue = function () {
        return this._value;
    };
    StateValue.prototype.getPreviousValue = function () {
        return this._prevValue;
    };
    StateValue.prototype.getDefaultValue = function () {
        return this._defaultValue;
    };
    StateValue.prototype.setValue = function (value, skipChangeSignal) {
        if (skipChangeSignal === void 0) { skipChangeSignal = false; }
        if (value === this._value)
            return;
        this._prevValue = this._value;
        this._value = value;
        if (skipChangeSignal)
            return;
        this.onChangeSignal.dispatch();
    };
    StateValue.prototype.hasValue = function () {
        return !(this._value === null || this._value === undefined);
    };
    StateValue.prototype.isValue = function (value) {
        return this._value === value;
    };
    StateValue.prototype.reset = function (resetPreviousValue) {
        if (resetPreviousValue === void 0) { resetPreviousValue = true; }
        if (resetPreviousValue) {
            this._value = undefined;
            this._prevValue = undefined;
        }
        this.setValue(this._defaultValue);
    };
    return StateValue;
}());
exports.StateValue = StateValue;
