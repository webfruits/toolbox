/******************************************************************
 * ValidationUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class ValidationUtils {
    static isValidMail(mail: string): boolean;
    static isValidDate(dayValue: number, date: Date): boolean;
    static isValidPassword(password: string, config?: {
        minLength?: number;
        needSpecial?: boolean;
        needUppercase?: boolean;
        needNumber?: boolean;
    }): boolean;
    static isValidPhoneNumber(value: string): boolean;
}
