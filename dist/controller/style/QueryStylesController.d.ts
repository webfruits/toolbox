import { INativeStyleDeclaration } from "@webfruits/core/dist/interface/INativeStyleDeclaration";
/******************************************************************
 * QueryStylesController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class QueryStylesController {
    private _scopeElement;
    /******************************************************************
     * Properties
     *****************************************************************/
    private _styleControllers;
    /******************************************************************
     * Constructor
     *****************************************************************/
    constructor(_scopeElement: HTMLElement);
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    to(querySelector: string, cssStyle: INativeStyleDeclaration, priorityLevel?: number): void;
    destroy(): void;
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    private getNativeStylesController;
}
