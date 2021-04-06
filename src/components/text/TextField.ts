import {INativeStyleDeclaration} from "@webfruits/core/dist/interface/INativeStyleDeclaration";
import {UIComponent} from "@webfruits/core";

/******************************************************************
 * TextField
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class TextField extends UIComponent {

    /******************************************************************
     * Properties
     *****************************************************************/

    // no properties yet

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _config: {
        fontStyle: () => INativeStyleDeclaration,
        html?: string,
        name?: string
    }) {
        super(_config.name ?? "text-field");
        if (this._config.html) {
            this.html = this._config.html
        }
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    get html(): string {
        return this.view.innerText;
    }

    set html(value: string) {
        this.view.innerHTML = value;
        this.updateStyles();
    }

    public updateStyles() {
        this.applyStyle(this._config.fontStyle());
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    // no private methodes yet

    /******************************************************************
     * Events
     *****************************************************************/

    // no events yet

}
