import {ProgressTimer} from "../../timer/ProgressTimer";
import {NativeEventsController} from "@webfruits/core/dist/controller/NativeEventsController";
import {Signal} from "@webfruits/core/dist/signal/Signal";

/******************************************************************
 * WheelController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class WheelController {

    /******************************************************************
     * Properties
     *****************************************************************/

    private static DEFAULT_SCROLL_DELTA_Y_THRESHOLD = 2;
    private static TOUCH_DELTA_Y_THRESHOLD = 100;

    private _enabled: boolean = true;
    private _blockScrolling = false;
    private _lastDeltaY: number;
    private _deltaScrollYThreshold: number = WheelController.DEFAULT_SCROLL_DELTA_Y_THRESHOLD;
    private _touchStartY: number;
    private _isDragging: boolean;
    private _preventDefault: boolean;
    private _elementEvents: NativeEventsController;
    private _unblockScrollingTimer: ProgressTimer;
    private _updateThresholdTimer: ProgressTimer;

    public onUpSignal = new Signal();
    public onDownSignal = new Signal();
    public onInteractionStartSignal = new Signal<TouchEvent | MouseEvent>();

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _element: HTMLElement) {
        this.initListener();
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    set enabled(value: boolean) {
        this._enabled = value;
        this.updateThreshold();
    }

    set preventDefault(value: boolean) {
        this._preventDefault = value;
    }

    public destroy() {
        this.onUpSignal.removeAll();
        this.onDownSignal.removeAll();
        this.onInteractionStartSignal.removeAll();
        this._elementEvents.destroy();
        this._element = null;
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    private initListener() {
        this._elementEvents = new NativeEventsController(this._element);
        this._elementEvents.addListener("wheel", (e: WheelEvent) => this.onMouseWheel(e), true);
        this._elementEvents.addListener("touchstart", (e: TouchEvent) => this.onTouchStart(e), true);
        this._elementEvents.addListener("touchmove", (e: TouchEvent) => this.onTouchMove(e), true);
    }

    private updateThreshold() {
        this._deltaScrollYThreshold = Math.abs(this._lastDeltaY) + 100;
        let difference = this._deltaScrollYThreshold - WheelController.DEFAULT_SCROLL_DELTA_Y_THRESHOLD;
        if (this._updateThresholdTimer) {
            this._updateThresholdTimer.stop();
        }
        this._updateThresholdTimer = new ProgressTimer(1, {
            onUpdate: (progress: number) => {
                this._deltaScrollYThreshold = (difference * (1 - progress)) + WheelController.DEFAULT_SCROLL_DELTA_Y_THRESHOLD;
            }
        });
    }

    private unblockScrolling(initialDeltaY: number) {
        let maxDeltaY = Math.abs(initialDeltaY);
        let lastMaxDeltaUpdate = Date.now();
        if (this._unblockScrollingTimer) {
            this._unblockScrollingTimer.stop();
        }
        this._unblockScrollingTimer = new ProgressTimer(5, {
            onUpdate: () => {
                if (maxDeltaY < Math.abs(this._lastDeltaY)) {
                    maxDeltaY = Math.abs(this._lastDeltaY);
                    lastMaxDeltaUpdate = Date.now();
                }
                if ((Date.now() - lastMaxDeltaUpdate) > 300) {
                    this._unblockScrollingTimer.stop();
                    this._blockScrolling = false;
                    this.updateThreshold();
                }
            },
            onComplete: () => {
                this.updateThreshold();
                this._blockScrolling = false;
            }
        });
    }

    /******************************************************************
     * Events
     *****************************************************************/

    private onMouseWheel(e: WheelEvent) {
        this.onInteractionStartSignal.dispatch(e);
        this._lastDeltaY = e.deltaY;
        if (this._preventDefault) {
            e.preventDefault();
        }
        if (!this._enabled) return;
        if (this._blockScrolling || Math.abs(e.deltaY) < this._deltaScrollYThreshold) return;
        this._blockScrolling = true;
        this.unblockScrolling(e.deltaY);
        if (e.deltaY < 0) {
            this.onUpSignal.dispatch();
        } else {
            this.onDownSignal.dispatch();
        }
    }

    private onTouchStart(e: TouchEvent) {
        this.onInteractionStartSignal.dispatch(e);
        if (!this._enabled) return;
        this._isDragging = true;
        this._touchStartY = e.touches[0].clientY;
    }

    private onTouchMove(e: TouchEvent) {
        if (this._preventDefault) {
            e.preventDefault();
        }
        if (!this._enabled || !this._isDragging) return;
        let dy = (e.touches[0].clientY - this._touchStartY);
        if (Math.abs(dy) < WheelController.TOUCH_DELTA_Y_THRESHOLD) return;
        if (dy > 0) {
            this.onUpSignal.dispatch();
        } else {
            this.onDownSignal.dispatch();
        }
        this._isDragging = false;
    }
}
