/******************************************************************
 * DOMUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class DOMUtils {

    static getArrayFrom(htmlCollection: HTMLCollection): Element[] {
        if (Array.from) {
            return Array.from(htmlCollection);
        }
        return [].slice.call(htmlCollection);
    }

    static getElementIndex(element: HTMLElement): number {
        let nodes = DOMUtils.getArrayFrom(element.parentElement.children);
        return nodes.indexOf(element);
    }

    static getDatasetValue<T>(element: HTMLElement, datasetName: string, defaultValue: T): T {
        if (element && element.dataset[datasetName]) {
            return element.dataset[datasetName] as any;
        } else {
            return defaultValue;
        }
    }

    static isTextInputElementActive(): boolean {
        const isContentEditable = document.activeElement.getAttribute("contentEditable") == "true";
        const isTextInput = !!document.activeElement.getAttribute("type");
        return isContentEditable || isTextInput;
    }

}
