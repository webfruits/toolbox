/******************************************************************
 * JsonUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class JsonUtils {
    static getStringifiedValueFromObject(keyPath: string, data: any): string;
    static getValueFromObject(keyPath: string, data: any): string | any;
    static isStringifiedArray(value: string): boolean;
    static isStringifiedObject(value: string): boolean;
    static isStringifiedBoolean(value: string): boolean;
    static isStringifiedNull(value: string): boolean;
    static isStringifiedNumber(value: string): boolean;
}
