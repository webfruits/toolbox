/******************************************************************
 * ValidationUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class ValidationUtils {

    static isValidMail(mail: string): boolean {
        let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(mail.toLowerCase());
    }

    static isValidDate(dayValue: number, date: Date): boolean {
        return date.getDate() === dayValue
    }

    static isValidPassword(password: string, config?: {
        minLength?: number,
        needSpecial?: boolean,
        needUppercase?: boolean,
        needNumber?: boolean,
    }): boolean {
        const minLength = config?.minLength ?? 8;
        const needSpecial = config?.needSpecial != undefined ? config.needSpecial : true;
        const needUppercase = config?.needUppercase != undefined ? config.needUppercase : true;
        const needNumber = config?.needNumber != undefined ? config.needNumber : true;
        const specialRegExpPart = needSpecial ? "((?=.*[!@#$%^&*()\\-_=+{};:,<.>]){1})" : "";
        const uppercaseRegExpPart = needUppercase ? "((?=.*[A-Z]){1})" : "";
        const numberRegExpPart = needNumber ? "(?=.*\\d)" : "";
        const regExp = new RegExp("^.*(?=.{" + minLength + ",})" + numberRegExpPart + specialRegExpPart + "((?=.*[a-z]){1})" + uppercaseRegExpPart + ".*$");
        return regExp.test(password);
    }

    static isValidPhoneNumber(value: string): boolean {
        let regExp = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;
        return regExp.test(value);
    }

}
