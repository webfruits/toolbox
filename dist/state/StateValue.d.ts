import { Signal } from "@webfruits/core/dist/signal/Signal";
/******************************************************************
 * StateValue
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class StateValue<T> {
    private _defaultValue;
    /******************************************************************
     * Properties
     *****************************************************************/
    private _value;
    private _prevValue;
    onChangeSignal: Signal<void>;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_defaultValue?: T);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    getValue(): T;
    getPreviousValue(): T;
    getDefaultValue(): T;
    setValue(value: T, skipChangeSignal?: boolean): void;
    hasValue(): boolean;
    isValue(value: T): boolean;
    reset(resetPreviousValue?: boolean): void;
}
