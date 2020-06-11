import {UIComponent} from "@webfruits/core";
import {DeviceUtils} from "@webfruits/core/dist/utils/DeviceUtils";
import {Signal} from "@webfruits/core/dist/signal/Signal";

/******************************************************************
 * ScrollBox
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export type ScrollDirectionType = "x" | "y";

export class ScrollBox extends UIComponent {

    /******************************************************************
     * Properties
     *****************************************************************/

    private _contentBox: UIComponent;
    private _isScrolledToMax: boolean = false;
    private _enableScrolling: boolean = true;
    private _prevScrollTop: number = 0;
    private _prevScrollLeft: number = 0;

    public onScrollSignal = new Signal();
    public onEnterScrollMaxSignal = new Signal();
    public onLeaveScrollMaxSignal = new Signal();
    public onScrollDownSignal = new Signal();
    public onScrollUpSignal = new Signal();
    public onScrollRightSignal = new Signal();
    public onScrollLeftSignal = new Signal();

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _config?: {
        direction?: ScrollDirectionType,
        hideScrollBar?: boolean
    }) {
        super("scroll-box");
        this._config = this._config ?? {};
        this._config.direction = this._config.direction ?? "y";
        this.initContentBox();
        this.initListeners();
        this.initIOSScrollUpFix();
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    get scrollTop(): number {
        return this._contentBox.view.scrollTop;
    }

    get scrollLeft(): number {
        return this._contentBox.view.scrollLeft;
    }

    get children(): UIComponent[] {
        return this._contentBox.children;
    }

    get contentBox(): UIComponent {
        return this._contentBox;
    }

    get isScrolledToMax(): boolean {
        if (this._config.direction == "y") {
            return this._isScrolledToMax || this._contentBox.view.scrollHeight == this._contentBox.view.offsetHeight;
        } else {
            return this._isScrolledToMax || this._contentBox.view.scrollWidth == this._contentBox.view.offsetWidth;
        }
    }

    get isScrolledToMin(): boolean {
        if (this._config.direction == "y") {
            return this.scrollTop <= 1;
        } else {
            return this.scrollLeft <= 1;
        }
    }

    get maxScrollTop(): number {
        return this._contentBox.view.scrollHeight - this._contentBox.view.offsetHeight;
    }

    get maxScrollLeft(): number {
        return this._contentBox.view.scrollWidth - this._contentBox.view.offsetWidth;
    }

    set enableScrolling(value: boolean) {
        this._enableScrolling = value;
        this.updateStyles();
    }

    public addChild(child: UIComponent): void {
        if (!this._contentBox) {
            super.addChild(child);
        } else {
            this._contentBox.addChild(child);
        }
    }

    public removeChild(child: UIComponent, destroy?: boolean, destroyRecursivly?: boolean): void {
        if (this._contentBox) {
            this._contentBox.removeChild(child, destroy, destroyRecursivly);
        } else {
            super.removeChild(child, destroy, destroyRecursivly);
        }
    }

    get maxScrollTo(): number {
        return this._config.direction == "y" ? this.maxScrollTop : this.maxScrollLeft;
    }

    get scrollTo(): number {
        return this._config.direction == "y" ? this.scrollTop : this.scrollLeft;
    }

    set scrollTo(value: number) {
        const scrollToObject = {};
        if (value < 0) {
            value = 0;
        }
        if (this._config.direction == "y") {
            if (value > this.maxScrollTop) {
                value = this.maxScrollTop;
            }
            scrollToObject['y'] = value;
        } else {
            if (value > this.maxScrollLeft) {
                value = this.maxScrollLeft;
            }
            scrollToObject['x'] = value;
        }
        const scrollX = this._config.direction == "x" ? value : 0;
        const scrollY = this._config.direction == "y" ? value : 0;
        this._contentBox.view.scrollTo(scrollX, scrollY);
        this.onScrollSignal.dispatch();
    }

    public updateStyles(): void {
        this.applyStyle({
            overflow: "hidden",
            webkitMaskImage: "-webkit-radial-gradient(white, black)"
        });
        this._contentBox.applyStyle({
            overflowX: this._config.direction == "x" && this._enableScrolling ? "scroll" : "hidden",
            overflowY: this._config.direction == "y" && this._enableScrolling ? "scroll" : "hidden",
            webkitOverflowScrolling: "touch",
            paddingBottom: this._config.hideScrollBar && this._config.direction == "x" ? 50 : null,
            paddingRight: this._config.hideScrollBar && this._config.direction == "y" ? 50 : null,
            height: "100%",
            width: "100%"
        });
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    private initIOSScrollUpFix() {
        if (!DeviceUtils.IS_IOS) return;
        this.onAddedToStageSignal.addOnce(() => {
            if (this._config.direction == "y") {
                this._contentBox.view.scrollTop = 1;
            } else {
                this._contentBox.view.scrollLeft = 1;
            }

        });
        this.addNativeListener("scroll", () => this.onScrolledOnIOS(), {
            capture: true,
            passive: true
        });
    }

    private initContentBox() {
        const contentBox = new UIComponent("scrollable-content-box");
        this.addChild(contentBox);
        this._contentBox = contentBox;
    }

    private initListeners() {
        this.addNativeListener("scroll", () => this.onPageScrolled(), {
            capture: true,
            passive: true
        });
    }

    private checkMaxSignals() {
        const maxScrollValue = this._config.direction == "y" ? this.maxScrollTop : this.maxScrollLeft;
        const currentScrollValue = this._config.direction == "y" ? this._contentBox.view.scrollTop : this._contentBox.view.scrollLeft;
        if (maxScrollValue <= 0) return;
        if (currentScrollValue >= maxScrollValue - 1) {
            if (!this._isScrolledToMax) {
                this._isScrolledToMax = true;
                this.onEnterScrollMaxSignal.dispatch();
            }
        } else {
            if (this._isScrolledToMax) {
                this._isScrolledToMax = false;
                this.onLeaveScrollMaxSignal.dispatch();
            }
        }

    }

    /******************************************************************
     * Events
     *****************************************************************/

    protected onPageScrolled() {
        if (!this._enableScrolling) return;
        this.checkMaxSignals();
        if (this._config.direction == "y") {
            if (this.scrollTop > this._prevScrollTop) {
                this.onScrollDownSignal.dispatch();
            } else if (this.scrollTop < this._prevScrollTop) {
                this.onScrollUpSignal.dispatch();
            }
            this._prevScrollTop = this.scrollTop;
        } else {
            if (this.scrollLeft > this._prevScrollLeft) {
                this.onScrollRightSignal.dispatch();
            } else if (this.scrollLeft < this._prevScrollLeft) {
                this.onScrollLeftSignal.dispatch();
            }
            this._prevScrollLeft = this.scrollLeft;
        }
        this.onScrollSignal.dispatch();
    }

    private onScrolledOnIOS() {
        if (!this._enableScrolling) return;
        if (this._config.direction == "y") {
            if (this._contentBox.view.scrollTop == 0) {
                this._contentBox.view.scrollTop = 1;
            } else if (this._contentBox.view.scrollTop == this.maxScrollTop) {
                this._contentBox.view.scrollTop = this.maxScrollTop - 1;
            }
        } else {
            if (this._contentBox.view.scrollLeft == 0) {
                this._contentBox.view.scrollLeft = 1;
            } else if (this._contentBox.view.scrollLeft == this.maxScrollLeft) {
                this._contentBox.view.scrollLeft = this.maxScrollLeft - 1;
            }
        }
    }
}
