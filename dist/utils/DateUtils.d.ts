/******************************************************************
 * DateUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class DateUtils {
    static getFormattedDayTime(date: Date): string;
    static isToday(date: Date): boolean;
    static isTomorrow(date: Date): boolean;
    static isSameDay(dateA: Date, dateB: Date): boolean;
    static isYesterday(date: Date): boolean;
    static isWithinLastDays(date: Date, days: number): boolean;
}
