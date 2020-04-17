/******************************************************************
 * RequestUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export type RequestResult = { status: number, url: string, response: any, responseText: any };
export type RequestType = "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "HEAD";

export class RequestUtils {

    static getURL(options: {
        url: string,
        resultListener: (result: RequestResult) => void,
        requestType?: RequestType,
        sendData?: any,
        requestHeaders?: { key: string, value: string }[],
        progressListener?: (e: ProgressEvent) => void,
        errorListener?: (error: RequestResult) => void
    }): XMLHttpRequest {
        options.requestType = options.requestType ?? "GET";
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onprogress = function (e: ProgressEvent) {
            if (options && options.progressListener) {
                options.progressListener(e);
            }
        };
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState == 4 && RequestUtils.isSuccessStatus(xmlHttpRequest.status))
                options.resultListener({
                    status: xmlHttpRequest.status,
                    url: options.url,
                    response: xmlHttpRequest.response,
                    responseText: xmlHttpRequest.responseText
                });
        };
        xmlHttpRequest.open(options.requestType, options.url, true);
        if (options && options.requestHeaders) {
            options.requestHeaders.forEach((header) => {
                xmlHttpRequest.setRequestHeader(header.key, header.value);
            });
        }
        xmlHttpRequest.onloadend = function () {
            if (RequestUtils.isErrorStatus(xmlHttpRequest.status)) {
                options.errorListener({
                    status: xmlHttpRequest.status,
                    url: options.url,
                    response: xmlHttpRequest.response,
                    responseText: xmlHttpRequest.responseText
                });
            }
        };
        xmlHttpRequest.send(options && options.sendData ? options.sendData : null);
        return xmlHttpRequest;
    }

    static getPromisedData(url: string, options?: {
        sendData?: any,
        requestType?: RequestType,
        requestHeaders?: { key: string, value: string }[]
    }): Promise<RequestResult> {
        return new Promise((resolve: (result: RequestResult) => void, reject: (error: RequestResult) => void) => {
            RequestUtils.getURL({
                url: url,
                sendData: options?.sendData ?? undefined,
                requestType: options.requestType ?? "GET",
                requestHeaders: options?.requestHeaders ?? undefined,
                resultListener: (result: RequestResult) => resolve(result),
                errorListener: (error: RequestResult) => reject(error)
            })
        });
    }

    static isSuccessStatus(statusCode: number): boolean {
        return statusCode >= 200 && statusCode < 300;
    }

    static isErrorStatus(statusCode: number): boolean {
        return statusCode >= 400 && statusCode < 500;
    }
}
