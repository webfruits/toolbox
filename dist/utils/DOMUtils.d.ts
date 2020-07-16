/******************************************************************
 * DOMUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class DOMUtils {
    static getArrayFrom(htmlCollection: HTMLCollection): Element[];
    static getElementIndex(element: HTMLElement): number;
    static getDatasetValue<T>(element: HTMLElement, datasetName: string, defaultValue: T): T;
    static isTextInputElementActive(): boolean;
}
