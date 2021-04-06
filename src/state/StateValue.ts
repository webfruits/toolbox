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

    public setValue(value: T, skipChangeSignal: boolean = false) {
        if (value === this._value) return;
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

    public reset() {
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
