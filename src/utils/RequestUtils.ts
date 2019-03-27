/******************************************************************
 * RequestUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class RequestUtils {

    static getURL(
        url: string,
        resultListener: (e: any) => void,
        options: {
            usePost: boolean,
            sendData: any,
            requestHeaders: {key: string, value: string}[],
            progressListener: (e: ProgressEvent) => void,
        } = null
    ): XMLHttpRequest {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onprogress = function(e: ProgressEvent) {
            if (options && options.progressListener) {
                options.progressListener(e);
            }
        };
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200)
                resultListener(xmlHttpRequest.responseText);
        };
        xmlHttpRequest.open(options && options.usePost ? "POST" : "GET", url, true);
        if (options && options.requestHeaders) {
            options.requestHeaders.forEach((header) => {
                xmlHttpRequest.setRequestHeader(header.key, header.value);
            });
        }
        xmlHttpRequest.send(options && options.sendData ? options.sendData : null);
        return xmlHttpRequest;
    }

}