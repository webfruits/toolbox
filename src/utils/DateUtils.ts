/******************************************************************
 * DateUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class DateUtils {

    static getFormattedDayTime(date: Date): string {
        let hours = date.getHours().toString();
        if (date.getHours() < 10) hours = "0" + hours;
        let minutes = date.getMinutes().toString();
        if (date.getMinutes() < 10) minutes = "0" + minutes;
        return hours + ":" + minutes;
    }

    static isToday(date: Date): boolean {
        const todayDate = new Date();
        return date.getDate() == todayDate.getDate() && date.getMonth() == todayDate.getMonth() && date.getFullYear() == todayDate.getFullYear();
    }

    static isTomorrow(date: Date): boolean {
        const tomorrowDate = new Date();
        tomorrowDate.setDate(new Date().getDate() + 1);
        return date.getDate() == tomorrowDate.getDate() && date.getMonth() == tomorrowDate.getMonth() && date.getFullYear() == tomorrowDate.getFullYear();
    }

    static isSameDay(dateA: Date, dateB: Date): boolean {
        if (!dateA || !dateB) return false;
        return dateA.getDate() == dateB.getDate() && dateA.getMonth() == dateB.getMonth() && dateA.getFullYear() == dateB.getFullYear();
    }

    static isYesterday(date: Date): boolean {
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        return date.getDate() == yesterdayDate.getDate() && date.getMonth() == yesterdayDate.getMonth() && date.getFullYear() == yesterdayDate.getFullYear();
    }

    static isWithinLastDays(date: Date, days: number): boolean {
        const historyDate = new Date();
        historyDate.setDate(historyDate.getDate() - days);
        return date.getTime() > historyDate.getTime();
    }

}
