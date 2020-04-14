/******************************************************************
 * RequestUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export type RequestErrorInfo = {status: number, url: string, response: any};

export class RequestUtils {

    static getURL(options: {
        url: string,
        resultListener: (result: any) => void,
        usePost?: boolean,
        sendData?: any,
        requestHeaders?: { key: string, value: string }[],
        progressListener?: (e: ProgressEvent) => void,
        errorListener?: (error: RequestErrorInfo) => void
    }): XMLHttpRequest {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onprogress = function (e: ProgressEvent) {
            if (options && options.progressListener) {
                options.progressListener(e);
            }
        };
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200)
                options.resultListener(xmlHttpRequest.responseText);
        };
        xmlHttpRequest.open(options && options.usePost ? "POST" : "GET", options.url, true);
        if (options && options.requestHeaders) {
            options.requestHeaders.forEach((header) => {
                xmlHttpRequest.setRequestHeader(header.key, header.value);
            });
        }
        xmlHttpRequest.onloadend = function () {
            if (xmlHttpRequest.status !== 200) {
                options.errorListener({status: xmlHttpRequest.status, url: options.url, response: xmlHttpRequest.response});
            }
        };
        xmlHttpRequest.send(options && options.sendData ? options.sendData : null);
        return xmlHttpRequest;
    }

    static getPromisedData(url: string, options?: {
        usePost?: boolean,
        sendData?: any,
        requestHeaders?: { key: string, value: string }[]
    }): Promise<void> {
        return new Promise((resolve: (result: any) => void, reject: (error: any) => void) => {
            RequestUtils.getURL({
                url: url,
                sendData: options?.sendData ?? undefined,
                usePost: options?.usePost ?? undefined,
                requestHeaders: options?.requestHeaders ?? undefined,
                resultListener: (result: any) => resolve(result),
                errorListener: (error: any) => reject(error)
            })
        });
    }
}
