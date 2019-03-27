import { Signal } from "@webfruits/core/dist/signal/Signal";
/******************************************************************
 * WheelController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class WheelController {
    private _element;
    /******************************************************************
     * Properties
     *****************************************************************/
    private static DEFAULT_SCROLL_DELTA_Y_THRESHOLD;
    private static TOUCH_DELTA_Y_THRESHOLD;
    private _enabled;
    private _blockScrolling;
    private _lastDeltaY;
    private _deltaScrollYThreshold;
    private _touchStartY;
    private _isDragging;
    private _preventDefault;
    private _elementEvents;
    private _unblockScrollingTimer;
    private _updateThresholdTimer;
    onUpSignal: Signal<void>;
    onDownSignal: Signal<void>;
    onInteractionStartSignal: Signal<MouseEvent | TouchEvent>;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_element: HTMLElement);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    enabled: boolean;
    preventDefault: boolean;
    destroy(): void;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    private initListener;
    private updateThreshold;
    private unblockScrolling;
    /******************************************************************
     * Events
     *****************************************************************/
    private onMouseWheel;
    private onTouchStart;
    private onTouchMove;
}
