/******************************************************************
 * RequestUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class RequestUtils {
    static getURL(options: {
        url: string;
        resultListener: (e: any) => void;
        usePost?: boolean;
        sendData?: any;
        requestHeaders?: {
            key: string;
            value: string;
        }[];
        progressListener?: (e: ProgressEvent) => void;
        errorListener?: (message: string) => void;
    }): XMLHttpRequest;
}
