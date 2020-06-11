/******************************************************************
 * FontDetector
 *
 * based on https://www.lalit.org/wordpress/wp-content/uploads/2008/05/fontdetect.js?ver=0.3
 *****************************************************************/

export class FontDetector {

    static isAvailable(fontName: string, fontWeight?: string): boolean {
        const baseFonts = ['monospace', 'sans-serif', 'serif'];
        const testString = "mmmmmmmmmmlli";
        const testSize = '72px';
        const spanElement = document.createElement("span");
        spanElement.style.fontSize = testSize;
        spanElement.innerHTML = testString;
        let defaultWidth = {};
        let defaultHeight = {};
        for (let index in baseFonts) {
            spanElement.style.fontFamily = baseFonts[index];
            document.body.appendChild(spanElement);
            defaultWidth[baseFonts[index]] = spanElement.offsetWidth;
            defaultHeight[baseFonts[index]] = spanElement.offsetHeight;
            document.body.removeChild(spanElement);
        }
        let detected = false;
        for (let index in baseFonts) {
            spanElement.style.fontFamily = fontName + ',' + baseFonts[index];
            if (fontWeight) {
                spanElement.style.fontWeight = fontWeight;
            }
            document.body.appendChild(spanElement);
            const matched = (spanElement.offsetWidth != defaultWidth[baseFonts[index]] || spanElement.offsetHeight != defaultHeight[baseFonts[index]]);
            document.body.removeChild(spanElement);
            detected = detected || matched;
        }
        return detected;
    }

    static initializeFonts(fontList: {fontName: string, fontWeight?: string}[]): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            checkForFont();
            function checkForFont() {
                requestAnimationFrame(() => {
                    let allFontsAvailable = true;
                    fontList.forEach((fontData) => {
                        if (!FontDetector.isAvailable(fontData.fontName, fontData.fontWeight)) {
                            allFontsAvailable = false;
                        }
                    });
                    if (allFontsAvailable) {
                        resolve();
                    } else {
                        checkForFont();
                    }
                })
            }
        });
    }
}
