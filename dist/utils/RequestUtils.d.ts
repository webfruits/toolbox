/******************************************************************
 * RequestUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare type RequestResult = {
    status: number;
    url: string;
    response: any;
    responseText: any;
};
export declare type RequestType = "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "HEAD";
export declare class RequestUtils {
    static getURL(options: {
        url: string;
        resultListener: (result: RequestResult) => void;
        requestType?: RequestType;
        sendData?: any;
        requestHeaders?: {
            key: string;
            value: string;
        }[];
        progressListener?: (e: ProgressEvent) => void;
        errorListener?: (error: RequestResult) => void;
    }): XMLHttpRequest;
    static getPromisedData(url: string, options?: {
        sendData?: any;
        requestType?: RequestType;
        requestHeaders?: {
            key: string;
            value: string;
        }[];
    }): Promise<RequestResult>;
    static isSuccessStatus(statusCode: number): boolean;
    static isErrorStatus(statusCode: number): boolean;
}
