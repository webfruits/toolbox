import {NativeEventsController} from "@webfruits/core/dist/controller/NativeEventsController";
import {Signal} from "@webfruits/core/dist/signal/Signal";

/******************************************************************
 * SwipeController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class SwipeController {

    /******************************************************************
     * Properties
     *****************************************************************/

    private _touchStartX: number;
    private _touchStartY: number;
    private _mouseStartX: number;
    private _enabled: boolean = true;
    private _isMouseDown: boolean;
    private _preventSwiping: boolean;
    private _isSwiping: boolean;
    private _swipeDetecting: boolean;
    private _swipeTriggered: boolean;

    private _swipeDetectThreshold = 30;

    private _elementEvents: NativeEventsController;

    public onLeftSwipeSignal = new Signal();
    public onRightSwipeSignal = new Signal();
    public onSwipeEndSignal = new Signal();
    public onSwipeStartSignal = new Signal();

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _element: HTMLElement) {
        this.initListeners();
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        this._enabled = value;
    }

    get isSwiping(): boolean {
        return this._isSwiping;
    }

    get swipeDetectThreshold(): number {
        return this._swipeDetectThreshold;
    }

    set swipeDetectThreshold(value: number) {
        if (value < 20) value = 20;
        this._swipeDetectThreshold = value;
    }

    public destroy() {
        this._elementEvents.destroy();
        this.onLeftSwipeSignal.removeAll();
        this.onRightSwipeSignal.removeAll();
        this.onSwipeEndSignal.removeAll();
        this.onSwipeStartSignal.removeAll();
        this._element = null;
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    private initListeners() {
        this._elementEvents = new NativeEventsController(this._element);
        this._elementEvents.addListener("touchstart", (e: TouchEvent) => this.onTouchStarted(e));
        this._elementEvents.addListener("touchmove", (e: TouchEvent) => this.onTouchMove(e));
        this._elementEvents.addListener("touchend", () => this.onTouchEnd());
        this._elementEvents.addListener("mousedown", (e: MouseEvent) => this.onMouseDown(e));
        this._elementEvents.addListener("mousemove", (e: MouseEvent) => this.onMouseMove(e));
        this._elementEvents.addListener("mouseup", () => this.onMouseUp());
    }

    private checkForSwipe(dx: number) {
        if (this._swipeTriggered) return;
        if (Math.abs(dx) > 20) {
            this._swipeDetecting = true;
            if (dx > this._swipeDetectThreshold) {
                this._swipeTriggered = true;
                this.onRightSwipeSignal.dispatch();
            } else if (dx < -this._swipeDetectThreshold) {
                this._swipeTriggered = true;
                this.onLeftSwipeSignal.dispatch();
            }
        }
    }

    private checkPreventScrolling(e: TouchEvent) {
        if (this._swipeTriggered || this._swipeDetecting) {
            e.preventDefault();
            return;
        }
        let dy = Math.abs(e.touches[0].clientY - this._touchStartY);
        if (dy > 10) {
            this._preventSwiping = true;
        }
    }

    /******************************************************************
     * Events
     *****************************************************************/

    private onTouchStarted(e: TouchEvent) {
        if (!this._enabled) return;
        this._preventSwiping = false;
        this._touchStartX = e.touches[0].clientX;
        this._touchStartY = e.touches[0].clientY;
    }

    private onTouchMove(e: TouchEvent) {
        if (!this._enabled || this._preventSwiping) return;
        this.checkForSwipe(e.touches[0].clientX - this._touchStartX);
        this.checkPreventScrolling(e);
        if (!this._isSwiping) {
            this._isSwiping = true;
            this.onSwipeStartSignal.dispatch();
        }
    }

    private onTouchEnd() {
        if (!this._enabled) return;
        this._swipeTriggered = false;
        this._swipeDetecting = false;
        this._isSwiping = false;
        this.onSwipeEndSignal.dispatch();
    }

    private onMouseDown(e: MouseEvent) {
        if (!this._enabled) return;
        this._isMouseDown = true;
        this._mouseStartX = e.clientX;
    }

    private onMouseMove(e: MouseEvent) {
        if (!this._enabled) return;
        if (!this._isMouseDown) return;
        this.checkForSwipe(e.clientX - this._mouseStartX);
        if (!this._isSwiping) {
            this._isSwiping = true;
            this.onSwipeStartSignal.dispatch();
        }
    }

    private onMouseUp() {
        if (!this._enabled) return;
        this._isMouseDown = false;
        this._swipeTriggered = false;
        this._isSwiping = false;
        this.onSwipeEndSignal.dispatch();
    }
}
