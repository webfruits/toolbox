import {Signal} from "@webfruits/core/dist/signal/Signal";

/******************************************************************
 * StateValue
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class StateValue<T> {

    /******************************************************************
     * Properties
     *****************************************************************/

    private _value: T;
    private _prevValue: T = undefined;
    public onChangeSignal = new Signal();

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _defaultValue: T = undefined) {
        this._value = this._defaultValue;
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    public getValue(): T {
        return this._value;
    }

    public getPreviousValue(): T {
        return this._prevValue;
    }

    public getDefaultValue(): T {
        return this._defaultValue;
    }

    public setValue(value: T, skipChangeSignal: boolean = false) {
        if (value === this._value) return;
        this._prevValue = this._value;
        this._value = value;
        if (skipChangeSignal) return;
        this.onChangeSignal.dispatch();

    }

    public hasValue(): boolean {
        return !(this._value === null || this._value === undefined);
    }

    public isValue(value: T): boolean {
        return this._value === value;
    }

    public isPreviousValue(value: T): boolean {
        return this._prevValue === value;
    }

    public reset(resetPreviousValue: boolean = true) {
        if (resetPreviousValue) {
            this._value = undefined;
            this._prevValue = undefined;
        }
        this.setValue(this._defaultValue);
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    // no private methodes yet

    /******************************************************************
     * Events
     *****************************************************************/

    // no events yet

}
