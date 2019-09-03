import {MathUtils} from "./MathUtils";

/******************************************************************
 * SVGUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class SVGUtils {

    static getElementByID(svgElement: SVGElement, idPrefix: string, id: string): SVGElement {
        return svgElement.querySelectorAll("#" + idPrefix + id)[0] as SVGElement;
    }

    static getElementsByID(svgElement: SVGElement, idPrefix: string, id: string): SVGElement[] {
        return Array.from(svgElement.querySelectorAll("#" + idPrefix + id));
    }

    static getElementsByPartOfID(svgElement: SVGElement, idPrefix: string, partofID: string): SVGElement[] {
        return Array.from(svgElement.querySelectorAll("[id^=" + idPrefix + partofID + "]")) as SVGElement[];
    }

    static getLocalTransform(svgElement: SVGElement): { x: number, y: number } {
        let transform = svgElement.getAttribute("transform");
        if (transform) {
            let translate = transform.replace("translate(", "").replace(")", "").replace(" ", "");
            let x = parseFloat(translate.split(",")[0]);
            let y = parseFloat(translate.split(",")[1]);
            if (translate.indexOf("matrix") != -1) {
                translate = translate.replace("matrix(", "");
                x = parseFloat(translate.split(",")[4]);
                y = parseFloat(translate.split(",")[5]);
            }
            // FIX FOR IE11
            if (translate.indexOf(",") == -1) {
                translate = transform.replace("translate(", "").replace(")", "").replace(", ", "");
                x = parseFloat(translate.split(" ")[0]);
                y = parseFloat(translate.split(" ")[1]);
            }
            return {x: x, y: y};
        }
        return null;
    }

	static getArcPath(radius: number, startDegree: number, endDegree: number): string {
		let start = MathUtils.polarToCartesian(0, 0, radius, endDegree);
		let end = MathUtils.polarToCartesian(0, 0, radius, startDegree);
		let largeArcFlag = endDegree - startDegree <= 180 ? "0" : "1";
		return [
			"M", start.x, start.y,
			"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
		].join(" ");
	}
}
