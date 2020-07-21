import { NativeStylesController } from "@webfruits/core/dist/controller/NativeStylesController";
import { INativeStyleDeclaration } from "@webfruits/core/dist/interface/INativeStyleDeclaration";

/******************************************************************
 * QueryStylesController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class QueryStylesController {

    /******************************************************************
     * Properties
     *****************************************************************/

    private _styleControllers: NativeStylesController[] = [];

    /******************************************************************
     * Constructor
     *****************************************************************/

    constructor(private _scopeElement: HTMLElement) {
    }

    /******************************************************************
     * Public Methodes
     *****************************************************************/

    public to(querySelector: string, cssStyle: INativeStyleDeclaration, priorityLevel?: number) {
        let elements = this._scopeElement.querySelectorAll(querySelector);
        if (elements) {
            elements.forEach((element: HTMLElement) => {
                this.getNativeStylesController(element).applyStyle(cssStyle, priorityLevel);
            });
        }
    }

    public destroy() {
        this._styleControllers = null;
    }

    /******************************************************************
     * Private Methodes
     *****************************************************************/

    private getNativeStylesController(element: HTMLElement): NativeStylesController {
        let styleControllers = this._styleControllers.filter((styleController) => styleController.element === element);
        if (styleControllers && styleControllers.length > 0) {
            return styleControllers[0];
        }
        let styleController = new NativeStylesController(element);
        this._styleControllers.push(styleController);
        return styleController;
    }

    /******************************************************************
     * Events
     *****************************************************************/

    // no events yet

}
