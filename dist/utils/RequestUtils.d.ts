/******************************************************************
 * RequestUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare type RequestErrorInfo = {
    status: number;
    url: string;
};
export declare class RequestUtils {
    static getData(url: string, options?: {
        resultListener?: (e: any) => void;
        usePost?: boolean;
        sendData?: any;
        requestHeaders?: {
            key: string;
            value: string;
        }[];
        progressListener?: (e: ProgressEvent) => void;
        errorListener?: (errorInfo: RequestErrorInfo) => void;
    }): XMLHttpRequest;
    static getPromisedData(url: string, options?: {
        usePost?: boolean;
        sendData?: any;
        requestHeaders?: {
            key: string;
            value: string;
        }[];
    }): Promise<void>;
}
