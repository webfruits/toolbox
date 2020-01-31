import { Signal } from "@webfruits/core/dist/signal/Signal";
/******************************************************************
 * SwipeController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class SwipeController {
    private _element;
    /******************************************************************
     * Properties
     *****************************************************************/
    private _touchStartX;
    private _touchStartY;
    private _mouseStartX;
    private _enabled;
    private _isMouseDown;
    private _preventSwiping;
    private _isSwiping;
    private _swipeDetecting;
    private _swipeTriggered;
    private _swipeDetectThreshold;
    private _elementEvents;
    onLeftSwipeSignal: Signal<void>;
    onRightSwipeSignal: Signal<void>;
    onSwipeEndSignal: Signal<void>;
    onSwipeStartSignal: Signal<void>;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_element: HTMLElement);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    get enabled(): boolean;
    set enabled(value: boolean);
    get isSwiping(): boolean;
    get swipeDetectThreshold(): number;
    set swipeDetectThreshold(value: number);
    destroy(): void;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    private initListeners;
    private checkForSwipe;
    private checkPreventScrolling;
    /******************************************************************
     * Events
     *****************************************************************/
    private onTouchStarted;
    private onTouchMove;
    private onTouchEnd;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
}
