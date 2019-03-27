/******************************************************************
 * GridLayout
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
import { UIComponent } from "@webfruits/core";
export declare class GridLayout extends UIComponent {
    private _numColumns;
    private _gapWidth;
    /******************************************************************
     * Properties
     *****************************************************************/
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_numColumns?: number, _gapWidth?: number);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    numColumns: number;
    gapWidth: number;
    addChild(item: UIComponent): void;
    updateStyles(): void;
}
