import { UIComponent } from "@webfruits/core";
/******************************************************************
 * GridLayout
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
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
    get numColumns(): number;
    set numColumns(value: number);
    get gapWidth(): number;
    set gapWidth(value: number);
    addChild(item: UIComponent): void;
    updateStyles(): void;
}
