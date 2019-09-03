import {SVGUtils} from "../../utils/SVGUtils";
import {UIComponent} from "@webfruits/core";
import {DeviceUtils} from "@webfruits/core/dist/utils/DeviceUtils";

/******************************************************************
 * SVGComponent
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class SVGComponent extends UIComponent {

    /******************************************************************
     * Properties
     *****************************************************************/

    protected _svgRoot: SVGElement;

    private readonly _viewBoxAttr: string;

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(svgString: string, elementName: string = "svg-component") {
        super(elementName);
        this.view.innerHTML = this.addIDPrefix(svgString);
        this._svgRoot = this.view.getElementsByTagName("svg")[0];
        this._viewBoxAttr = this._svgRoot.getAttribute("viewBox");
        this._svgRoot.removeAttribute("viewBox");
        if (this._svgRoot.getElementsByTagName("title")[0]) {
            this._svgRoot.removeChild(this._svgRoot.getElementsByTagName("title")[0]);
        }
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    get defaultWidth(): number {
        return parseFloat(this._viewBoxAttr.split(" ")[2]);
    }

    get defaultHeight(): number {
        return parseFloat(this._viewBoxAttr.split(" ")[3]);
    }

    set width(value: number) {
        this._svgRoot.setAttribute("width", value.toString() + "px");
    }

    set height(value: number) {
        this._svgRoot.setAttribute("height", value.toString() + "px");
    }

    public clearSizeDefinition() {
        this._svgRoot.removeAttribute("width");
        this._svgRoot.removeAttribute("height");
        this._svgRoot.setAttribute("viewBox", this._viewBoxAttr);
        if (DeviceUtils.IS_IE) {
            this._svgRoot.style.height = this._viewBoxAttr.split(" ")[3] + "px";
        }
    }

    public getElementByID(id: string): SVGElement {
        return SVGUtils.getElementByID(this._svgRoot, this.idPrefix, id);
    }

    public getElementsByID(id: string): SVGElement[] {
        return SVGUtils.getElementsByID(this._svgRoot, this.idPrefix, id);
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    protected get idPrefix(): string {
        let groupID = this._svgRoot.getElementsByTagName("g")[0].getAttribute("id") as string;
        if (groupID.indexOf("___") > 0) {
            return "__" + groupID.split("__")[1] + "___";
        }
        return "__" + groupID.split("__")[1] + "__";
    };

    private addIDPrefix(source: string) {
        if (source.indexOf("__") != -1) {
            return source; // has already idPrefix
        }
        let idPrefix = "__" + this.generateHashFromSource(source) + "__";
        source = source.split('id="').join('id="' + idPrefix);
        return source;
    }

    private generateHashFromSource(source: string): number {
        let hash = 0, i, chr;
        if (source.length === 0) return hash;
        for (i = 0; i < source.length; i++) {
            chr = source.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(Math.round(Math.random() * hash));
    }

    /******************************************************************
     * Events
     *****************************************************************/

}
