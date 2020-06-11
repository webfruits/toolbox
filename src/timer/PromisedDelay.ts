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

}
