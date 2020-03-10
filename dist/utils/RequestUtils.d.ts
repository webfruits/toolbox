/******************************************************************
 * RequestUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class RequestUtils {
    static getURL(options: {
        url: string;
        resultListener: (result: any) => void;
        usePost?: boolean;
        sendData?: any;
        requestHeaders?: {
            key: string;
            value: string;
        }[];
        progressListener?: (e: ProgressEvent) => void;
        errorListener?: (error: any) => void;
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
