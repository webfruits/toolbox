"use strict";
/******************************************************************
 * ValidationUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationUtils = /** @class */ (function () {
    function ValidationUtils() {
    }
    ValidationUtils.isValidMail = function (mail) {
        var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(mail.toLowerCase());
    };
    ValidationUtils.isValidDate = function (dayValue, date) {
        return date.getDate() === dayValue;
    };
    ValidationUtils.isValidPassword = function (password, config) {
        var _a, _b, _c, _d, _e;
        var minLength = (_b = (_a = config) === null || _a === void 0 ? void 0 : _a.minLength, (_b !== null && _b !== void 0 ? _b : 8));
        var needSpecial = ((_c = config) === null || _c === void 0 ? void 0 : _c.needSpecial) != undefined ? config.needSpecial : true;
        var needUppercase = ((_d = config) === null || _d === void 0 ? void 0 : _d.needUppercase) != undefined ? config.needUppercase : true;
        var needNumber = ((_e = config) === null || _e === void 0 ? void 0 : _e.needNumber) != undefined ? config.needNumber : true;
        var specialRegExpPart = needSpecial ? "((?=.*[!@#$%^&*()\\-_=+{};:,<.>]){1})" : "";
        var uppercaseRegExpPart = needUppercase ? "((?=.*[A-Z]){1})" : "";
        var numberRegExpPart = needNumber ? "(?=.*\\d)" : "";
        var regExp = new RegExp("^.*(?=.{" + minLength + ",})" + numberRegExpPart + specialRegExpPart + "((?=.*[a-z]){1})" + uppercaseRegExpPart + ".*$");
        return regExp.test(password);
    };
    ValidationUtils.isValidPhoneNumber = function (value) {
        var regExp = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;
        return regExp.test(value);
    };
    return ValidationUtils;
}());
exports.ValidationUtils = ValidationUtils;
