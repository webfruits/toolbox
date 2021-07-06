import { UIComponent } from "@webfruits/core";
/******************************************************************
 * SVGComponent
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class SVGComponent extends UIComponent {
    /******************************************************************
     * Properties
     *****************************************************************/
    protected _svgRoot: SVGElement;
    private readonly _viewBoxAttr;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(svgString: string, elementName?: string);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    get svgRoot(): SVGElement;
    get defaultWidth(): number;
    get defaultHeight(): number;
    set width(value: number);
    set height(value: number);
    clearSizeDefinition(): void;
    getElementByID(id: string): SVGElement;
    getElementsByID(id: string): SVGElement[];
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    protected get idPrefix(): string;
    private addIDPrefix;
    private generateHashFromSource;
}
