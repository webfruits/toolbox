/******************************************************************
 * RequestUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class RequestUtils {
    static getURL(url: string, resultListener: (e: any) => void, options?: {
        usePost: boolean;
        sendData: any;
        requestHeaders: {
            key: string;
            value: string;
        }[];
        progressListener: (e: ProgressEvent) => void;
    }): XMLHttpRequest;
}
