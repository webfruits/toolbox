/******************************************************************
 * URLUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class URLUtils {
    static getUrlParam(paraName: string, defaultValue?: string): string;
    static getUrlParams(): {
        [paraName: number]: string;
    };
    static openLink(href: string, openInNewWindow?: boolean, openAsPopup?: boolean): void;
    static downloadURL(url: string, filename?: string, useTargetBlank?: boolean): void;
}
