/******************************************************************
 * GridLayout
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
import {UIComponent} from "@webfruits/core";


export class GridLayout extends UIComponent {

    /******************************************************************
     * Properties
     *****************************************************************/

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _numColumns: number = 3, private _gapWidth: number = 20) {
        super("grid-layout");
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    get numColumns(): number {
        return this._numColumns;
    }

    set numColumns(value: number) {
        if (value < 1) value = 1;
        this._numColumns = value;
        this.updateStyles();
    }

    get gapWidth(): number {
        return this._gapWidth;
    }

    set gapWidth(value: number) {
        this._gapWidth = value;
        this.updateStyles();
    }

    public addChild(item: UIComponent) {
        super.addChild(item);
        this.updateStyles();
    }

    public updateStyles() {
        this.applyStyle({
            fontSize: 0
        });
        let numRows = Math.ceil(this.children.length / this._numColumns);
        let currentRows = 0;
        this.children.forEach((item: UIComponent, i: number) => {
            let columnID = i % this._numColumns;
            if (columnID == 0) currentRows++;
            item.applyStyle({
                display: "inline-block",
                position: "relative",
                width: "calc((100% / " + this._numColumns + ") - " + (((this._numColumns - 1) * this._gapWidth) / this._numColumns) + "px)",
                marginLeft: columnID > 0 ? this._gapWidth : 0,
                marginBottom: currentRows < numRows ? this._gapWidth : 0
            });
        });
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/


    /******************************************************************
     * Events
     *****************************************************************/

}
