/******************************************************************
 * URLUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class URLUtils {

    static getUrlParam(paraName: string, defaultValue: string = undefined): string {
        let value = URLUtils.getUrlParams()[paraName];
        return value ? value : defaultValue;
    }

    static getUrlParams(): { [paraName: number]: string } {
        let vars = {};
        location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (substring: string, ...args: any[]) => {
            let paraName = args[0];
            vars[paraName] = args[1];
            return substring;
        });
        return vars;
    }

    static openLink(href: string, openInNewWindow: boolean = true, openAsPopup: boolean = false) {
        if (href.indexOf("mailto") != -1) {
            location.href = href;
        } else if (href.indexOf("whatsapp") != -1) {
            location.href = href;
        } else if (openAsPopup) {
            window.open(href, '', 'width=600, height=300, menubar=no, toolbar=no, resizable=yes, scrollbars=yes').focus();
        } else {
            window.open(href, openInNewWindow ? '_blank' : '_self').focus();
        }
    }

    static downloadURL(url: string, filename: string) {
        let anchorElement = document.createElement('a');
        document.body.appendChild(anchorElement);
        anchorElement.download = filename;
        anchorElement.href = url;
        anchorElement.click();
        anchorElement.remove();
    }
}
