"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeStylesController_1 = require("@webfruits/core/dist/controller/NativeStylesController");
/******************************************************************
 * QueryStylesController
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
var QueryStylesController = /** @class */ (function () {
    /******************************************************************
     * Constructor
     *****************************************************************/
    function QueryStylesController(_scopeElement) {
        this._scopeElement = _scopeElement;
        /******************************************************************
         * Properties
         *****************************************************************/
        this._styleControllers = [];
    }
    /******************************************************************
     * Public Methodes
     *****************************************************************/
    QueryStylesController.prototype.to = function (querySelector, cssStyle, priorityLevel) {
        var _this = this;
        var elements = this._scopeElement.querySelectorAll(querySelector);
        if (elements) {
            elements.forEach(function (element) {
                _this.getNativeStylesController(element).applyStyle(cssStyle, priorityLevel);
            });
        }
    };
    QueryStylesController.prototype.destroy = function () {
        this._styleControllers = null;
    };
    /******************************************************************
     * Private Methodes
     *****************************************************************/
    QueryStylesController.prototype.getNativeStylesController = function (element) {
        var styleControllers = this._styleControllers.filter(function (styleController) { return styleController.element === element; });
        if (styleControllers && styleControllers.length > 0) {
            return styleControllers[0];
        }
        var styleController = new NativeStylesController_1.NativeStylesController(element);
        this._styleControllers.push(styleController);
        return styleController;
    };
    return QueryStylesController;
}());
exports.QueryStylesController = QueryStylesController;
