/******************************************************************
 * FontDetector
 *
 * based on https://www.lalit.org/wordpress/wp-content/uploads/2008/05/fontdetect.js?ver=0.3
 *****************************************************************/
export declare class FontDetector {
    static isAvailable(fontName: string, fontWeight?: string): boolean;
    static initializeFonts(fontList: {
        fontName: string;
        fontWeight?: string;
    }[]): Promise<void>;
}
