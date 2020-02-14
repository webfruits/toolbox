/******************************************************************
 * RequestUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export type RequestErrorInfo = {status: number, url: string};

export class RequestUtils {

    static getData(url: string, options?: {
        resultListener?: (e: any) => void,
        usePost?: boolean,
        sendData?: any,
        requestHeaders?: { key: string, value: string }[],
        progressListener?: (e: ProgressEvent) => void,
        errorListener?: (errorInfo: RequestErrorInfo) => void
    }): XMLHttpRequest {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onprogress = function (e: ProgressEvent) {
            if (options?.progressListener) {
                options.progressListener(e);
            }
        };
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                options.resultListener(xmlHttpRequest.responseText);
            }
        };
        xmlHttpRequest.open(options?.usePost ? "POST" : "GET", url, true);
        if (options?.requestHeaders) {
            options.requestHeaders.forEach((header) => {
                xmlHttpRequest.setRequestHeader(header.key, header.value);
            });
        }
        xmlHttpRequest.onloadend = function () {
            if (xmlHttpRequest.status !== 200) {
                options.errorListener({status: xmlHttpRequest.status, url: url});
            }
        };
        xmlHttpRequest.send(options?.sendData ?? null);
        return xmlHttpRequest;
    }

    static getPromisedData(url: string, options?: {
        usePost?: boolean,
        sendData?: any,
        requestHeaders?: { key: string, value: string }[]
    }): Promise<void> {
        return new Promise((resolve: (result: any) => void, reject: (errorInfo: RequestErrorInfo) => void) => {
            RequestUtils.getData(url, {
                sendData: options?.sendData ?? undefined,
                usePost: options?.usePost ?? undefined,
                requestHeaders: options?.requestHeaders ?? undefined,
                resultListener: (result: any) => resolve(result),
                errorListener: (errorInfo: RequestErrorInfo) => reject(errorInfo)
            })
        });
    }
}
