import { Signal } from "@webfruits/core/dist/signal/Signal";
export declare class SwipeController {
    private _element;
    /******************************************************************
     * Properties
     *****************************************************************/
    private _touchStartX;
    private _touchStartY;
    private _mouseStartX;
    private _swipeTriggered;
    private _enabled;
    private _isMouseDown;
    private _isSwiping;
    private _preventSwiping;
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
    enabled: boolean;
    readonly isSwiping: boolean;
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