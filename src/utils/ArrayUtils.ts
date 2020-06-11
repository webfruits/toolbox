/******************************************************************
 * ArrayUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class ArrayUtils {

    static getRandomValue(array: any[]): any {
        return array[Math.floor(Math.random() * array.length)];
    }

}
