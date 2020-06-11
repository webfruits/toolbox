import { UIComponent } from "@webfruits/core";
import { Signal } from "@webfruits/core/dist/signal/Signal";
/******************************************************************
 * ScrollBox
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare type ScrollDirectionType = "x" | "y";
export declare class ScrollBox extends UIComponent {
    private _config?;
    /******************************************************************
     * Properties
     *****************************************************************/
    private _contentBox;
    private _isScrolledToMax;
    private _enableScrolling;
    private _prevScrollTop;
    private _prevScrollLeft;
    onScrollSignal: Signal<void>;
    onEnterScrollMaxSignal: Signal<void>;
    onLeaveScrollMaxSignal: Signal<void>;
    onScrollDownSignal: Signal<void>;
    onScrollUpSignal: Signal<void>;
    onScrollRightSignal: Signal<void>;
    onScrollLeftSignal: Signal<void>;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_config?: {
        direction?: ScrollDirectionType;
        hideScrollBar?: boolean;
    });
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    get scrollTop(): number;
    get scrollLeft(): number;
    get children(): UIComponent[];
    get contentBox(): UIComponent;
    get isScrolledToMax(): boolean;
    get isScrolledToMin(): boolean;
    get maxScrollTop(): number;
    get maxScrollLeft(): number;
    set enableScrolling(value: boolean);
    addChild(child: UIComponent): void;
    removeChild(child: UIComponent, destroy?: boolean, destroyRecursivly?: boolean): void;
    get maxScrollTo(): number;
    get scrollTo(): number;
    set scrollTo(value: number);
    updateStyles(): void;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    private initIOSScrollUpFix;
    private initContentBox;
    private initListeners;
    private checkMaxSignals;
    /******************************************************************
     * Events
     *****************************************************************/
    protected onPageScrolled(): void;
    private onScrolledOnIOS;
}
