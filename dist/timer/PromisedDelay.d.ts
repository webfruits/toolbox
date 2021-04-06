/******************************************************************
 * PromisedDelay
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class PromisedDelay {
    static wait(timeInSec: number): Promise<void>;
    static waitUntilValid(validationMethode: () => boolean): Promise<void>;
}
