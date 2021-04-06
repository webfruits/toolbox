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
        const isTextArea = document.activeElement instanceof HTMLTextAreaElement;
        return isContentEditable || isTextInput || isTextArea;
    }

    // inspired by https://stackoverflow.com/questions/10787782/full-height-of-a-html-element-div-including-border-padding-and-margin
    static calcElementHeight(element: HTMLElement) {
        if (!element) {
            return 0;
        }
        const heightRelatedProperties = [
            'margin-top',
            'margin-bottom',
            'border-top',
            'border-bottom',
            'padding-top',
            'padding-bottom',
            'height'
        ]
        const style = window.getComputedStyle(element)
        return heightRelatedProperties
            .map(k => parseInt(style.getPropertyValue(k), 10))
            .reduce((prev, cur) => prev + cur)
    }

}
