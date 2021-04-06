/******************************************************************
 * PromisedDelay
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class PromisedDelay {

    static wait(timeInSec: number): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            setTimeout(() => resolve(), timeInSec * 1000);
        });
    }

    static waitUntilValid(validationMethode: () => boolean): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            checkNow();
            function checkNow() {
                if (validationMethode()) {
                    resolve();
                    return;
                }
                requestAnimationFrame(() => {
                    checkNow();
                })
            }
        });
    }

}
