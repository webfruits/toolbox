import {ColorUtils} from "@webfruits/core/dist/utils/ColorUtils";

/******************************************************************
 * GradientUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class GradientUtils {

    static createAlphaToColorSmoothGradient(config?: {
        color?: number,
        resolution?: number,
        degree?: number,
        start?: number,
        end?: number
    }): string {
        const degree = config?.degree ?? 180;
        const resolution = config?.resolution ?? 12;
        const color = config?.color ?? 0xFFFFFF;
        const startProgress = config?.start ?? 0;
        const endProgress = config?.end ?? 1;
        const progressLength = endProgress - startProgress;
        const cssColor = ColorUtils.convertColorFromHexToCSS(color);
        let gradient = "";
        for (let i = 0; i <= resolution; i++) {
            const progress = i / resolution;
            const position = ((progress * 100) * progressLength + startProgress * 100) + "%";
            console.log(position);
            const easedAlpha = -(Math.cos(Math.PI * progress) - 1) / 2;
            gradient += ColorUtils.addAlphaToCSS(cssColor, easedAlpha) + " " + position + ",";
        }
        gradient = gradient.slice(0, -1);
        return `linear-gradient(${degree}deg, ${gradient})`;
    }

}
