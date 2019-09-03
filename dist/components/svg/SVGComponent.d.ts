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
    readonly defaultWidth: number;
    readonly defaultHeight: number;
    width: number;
    height: number;
    clearSizeDefinition(): void;
    getElementByID(id: string): SVGElement;
    getElementsByID(id: string): SVGElement[];
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    protected readonly idPrefix: string;
    private addIDPrefix;
    private generateHashFromSource;
}
