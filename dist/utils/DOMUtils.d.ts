/******************************************************************
 * DOMUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class DOMUtils {
    static disablePageScrolling(): void;
    static enablePageScrolling(): void;
    static getArrayFrom(htmlCollection: HTMLCollection): Element[];
    static getElementIndex(element: HTMLElement): number;
    static getDatasetValue<T>(element: HTMLElement, datasetName: string, defaultValue: T): T;
    static isTextInputElementActive(): boolean;
    static calcElementWidth(element: HTMLElement): number;
    static calcElementHeight(element: HTMLElement): number;
}
