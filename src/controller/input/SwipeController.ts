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
    private _mouseStartY: number;
    private _enabled: boolean = true;
    private _isMouseDown: boolean;
    private _preventSwipeDispatch: boolean;
    private _isSwiping: boolean;
    private _swipeDetecting: boolean;
    private _swipeTriggered: boolean;
    private _useTouchOnly: boolean = false;

    private _swipeDetectThresholdX = 30;
    private _swipeDetectThresholdY = 30;

    private _elementEvents: NativeEventsController;

    public onLeftSwipeSignal = new Signal();
    public onRightSwipeSignal = new Signal();
    public onSwipeEndSignal = new Signal();
    public onSwipeStartSignal = new Signal();
    public onSwipingSignal = new Signal<{dx: number, dy: number}>()
    public onDownSwipeSignal = new Signal();
    public onUpSwipeSignal = new Signal();

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

    set useTouchOnly(value: boolean) {
        this._useTouchOnly = value;
    }

    get isSwiping(): boolean {
        return this._isSwiping;
    }

    get swipeDetectThresholdX(): number {
        return this._swipeDetectThresholdX;
    }

    set swipeDetectThresholdX(value: number) {
        if (value < 11) value = 11;
        this._swipeDetectThresholdX = value;
    }

    get swipeDetectThresholdY(): number {
        return this._swipeDetectThresholdY;
    }

    set swipeDetectThresholdY(value: number) {
        if (value < 11) value = 11;
        this._swipeDetectThresholdY = value;
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
        this._elementEvents.addListener("touchstart", (e: TouchEvent) => this.onTouchStarted(e), {passive:false});
        this._elementEvents.addListener("touchmove", (e: TouchEvent) => this.onTouchMove(e),  {passive:false});
        this._elementEvents.addListener("touchend", () => this.onTouchEnd());
        this._elementEvents.addListener("mousedown", (e: MouseEvent) => this.onMouseDown(e));
        this._elementEvents.addListener("mousemove", (e: MouseEvent) => this.onMouseMove(e));
        this._elementEvents.addListener("mouseup", () => this.onMouseUp());
    }

    private checkForSwipe(dx: number, dy: number) {
        if (this._swipeTriggered || this._preventSwipeDispatch) return;
        if (Math.abs(dx) >= 11 || Math.abs(dy) >= 11 ) {
            this._swipeDetecting = true;
            this.onSwipingSignal.dispatch({dx: dx, dy: dy});
            if (dx > this._swipeDetectThresholdX) {
                this._swipeTriggered = true;
                this.onRightSwipeSignal.dispatch();
            } else if (dx < -this._swipeDetectThresholdX) {
                this._swipeTriggered = true;
                this.onLeftSwipeSignal.dispatch();
            } else if (dy > this._swipeDetectThresholdY) {
                this._swipeTriggered = true;
                this.onDownSwipeSignal.dispatch();
            } else if (dy < -this._swipeDetectThresholdY) {
                this._swipeTriggered = true;
                this.onUpSwipeSignal.dispatch();
            }
        }
    }

    private checkPreventScrolling(e: TouchEvent) {
        if (this._swipeTriggered || this._swipeDetecting) {
            e.preventDefault();
            return;
        }
        const dy = e.touches[0].clientY - this._touchStartY;
        if (Math.abs(dy) >= 10
            && this.onDownSwipeSignal.listeners.length == 0
            && this.onUpSwipeSignal.listeners.length == 0) {
            this._preventSwipeDispatch = true;
        }
    }

    /******************************************************************
     * Events
     *****************************************************************/

    private onTouchStarted(e: TouchEvent) {
        if (!this._enabled) return;
        this._preventSwipeDispatch = false;
        this._swipeTriggered = false;
        this._swipeDetecting = false;
        this._touchStartX = e.touches[0].clientX;
        this._touchStartY = e.touches[0].clientY;
    }

    private onTouchMove(e: TouchEvent) {
        if (!this._enabled) return;
        const dx = e.touches[0].clientX - this._touchStartX;
        const dy = e.touches[0].clientY - this._touchStartY;
        this.checkForSwipe(dx, dy);
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
        if (!this._enabled || this._useTouchOnly) return;
        this._isMouseDown = true;
        this._mouseStartX = e.clientX;
        this._mouseStartY = e.clientY;
    }

    private onMouseMove(e: MouseEvent) {
        if (!this._enabled || this._useTouchOnly) return;
        if (!this._isMouseDown) return;
        const dx = e.clientX - this._mouseStartX;
        const dy = e.clientY - this._mouseStartY;
        this.checkForSwipe(dx, dy);
        if (!this._isSwiping) {
            this._isSwiping = true;
            this.onSwipeStartSignal.dispatch();
        }
    }

    private onMouseUp() {
        if (!this._enabled || this._useTouchOnly) return;
        this._isMouseDown = false;
        this._swipeTriggered = false;
        this._isSwiping = false;
        this.onSwipeEndSignal.dispatch();
    }
}
