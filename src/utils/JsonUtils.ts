/******************************************************************
 * JsonUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class JsonUtils {

    static getStringifiedValueFromObject(keyPath: string, data: any): string {
        let value = JSON.stringify(JsonUtils.getValueFromObject(keyPath, data));
        if (value && value.charAt(0) == '"' && value.charAt(value.length - 1) == '"') {
            value = value.slice(1, -1);
        }
        return value;
    }

    static getValueFromObject(keyPath: string, data: any): string | any {
        return keyPath.split('.').reduce(function (o, k) {
            return o && o[k];
        }, data);
    }

    static isStringifiedArray(value: string): boolean {
        return value.charAt(0) == "[" && value.charAt(value.length - 1) == "]";
    }

    static isStringifiedObject(value: string): boolean {
        return value.charAt(0) == "{" && value.charAt(value.length - 1) == "}";
    }

    static isStringifiedBoolean(value: string): boolean {
        return value == "true" || value == "false";
    }

    static isStringifiedNull(value: string): boolean {
        return value == "null" || value == "undefined";
    }

    static isStringifiedNumber(value: string): boolean {
        return parseFloat(value).toString() == value;
    }
}
