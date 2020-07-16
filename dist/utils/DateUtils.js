"use strict";
/******************************************************************
 * DateUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    DateUtils.getFormattedDayTime = function (date) {
        var hours = date.getHours().toString();
        if (date.getHours() < 10)
            hours = "0" + hours;
        var minutes = date.getMinutes().toString();
        if (date.getMinutes() < 10)
            minutes = "0" + minutes;
        return hours + ":" + minutes;
    };
    DateUtils.isToday = function (date) {
        var todayDate = new Date();
        return date.getDate() == todayDate.getDate() && date.getMonth() == todayDate.getMonth() && date.getFullYear() == todayDate.getFullYear();
    };
    DateUtils.isTomorrow = function (date) {
        var tomorrowDate = new Date();
        tomorrowDate.setDate(new Date().getDate() + 1);
        return date.getDate() == tomorrowDate.getDate() && date.getMonth() == tomorrowDate.getMonth() && date.getFullYear() == tomorrowDate.getFullYear();
    };
    DateUtils.isSameDay = function (dateA, dateB) {
        if (!dateA || !dateB)
            return false;
        return dateA.getDate() == dateB.getDate() && dateA.getMonth() == dateB.getMonth() && dateA.getFullYear() == dateB.getFullYear();
    };
    DateUtils.isYesterday = function (date) {
        var yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        return date.getDate() == yesterdayDate.getDate() && date.getMonth() == yesterdayDate.getMonth() && date.getFullYear() == yesterdayDate.getFullYear();
    };
    DateUtils.isWithinLastDays = function (date, days) {
        var historyDate = new Date();
        historyDate.setDate(historyDate.getDate() - days);
        return date.getTime() > historyDate.getTime();
    };
    return DateUtils;
}());
exports.DateUtils = DateUtils;
