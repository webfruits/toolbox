/******************************************************************
 * SVGUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class SVGUtils {
    static getElementByID(svgElement: SVGElement, idPrefix: string, id: string): SVGElement;
    static getElementsByID(svgElement: SVGElement, idPrefix: string, id: string): SVGElement[];
    static getElementsByPartOfID(svgElement: SVGElement, idPrefix: string, partofID: string): SVGElement[];
    static getLocalTransform(svgElement: SVGElement): {
        x: number;
        y: number;
    };
    static getArcPath(radius: number, startDegree: number, endDegree: number): string;
}
