import { INativeStyleDeclaration } from "@webfruits/core/dist/interface/INativeStyleDeclaration";
import { UIComponent } from "@webfruits/core";
/******************************************************************
 * TextField
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class TextField extends UIComponent {
    private _config;
    /******************************************************************
     * Properties
     *****************************************************************/
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_config: {
        fontStyle: () => INativeStyleDeclaration;
        html?: string;
        name?: string;
    });
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    get html(): string;
    set html(value: string);
    updateStyles(): void;
}
