/******************************************************************
 * ProgressTimer
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class ProgressTimer {

    /******************************************************************
     * Properties
     *****************************************************************/

    private _startTime: number;
    private _stopped: boolean;

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(
        private _duration: number,
        private _callbacks: {
            onUpdate?: (progress: number) => any,
            onComplete?: () => any})
    {
        this.start();
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    public stop() {
        this._stopped = true;
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    private start() {
        this._startTime = Date.now();
        this.update();
    }

    private update() {
        if (this._stopped) return;
        let timePassed = Date.now() - this._startTime;
        if (timePassed < this._duration * 1000) {
            requestAnimationFrame(() => this.update());
            if (this._callbacks.onUpdate) {
                let progress = timePassed / (this._duration * 1000);
                this._callbacks.onUpdate(progress);
            }
        } else {
            if (this._callbacks.onUpdate) {
                this._callbacks.onUpdate(1);
            }
            if (this._callbacks.onComplete) {
                this._callbacks.onComplete();
            }
        }
    }

    /******************************************************************
     * Events
     *****************************************************************/


}
