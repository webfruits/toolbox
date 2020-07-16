/******************************************************************
 * MathUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/

export class MathUtils {

    static isMouseInRect(rect: ClientRect, mouseX: number, mouseY: number): boolean {
        return rect.left <= mouseX && mouseX <= rect.left + rect.width &&
            rect.top <= mouseY && mouseY <= rect.top + rect.height;
    }

    static degToRad(degrees: number) {
        return degrees * Math.PI / 180;
    }

    static roundToEven(value: number): number {
        if (value === null) return null;
        if (value === undefined) return undefined;
        return 2 * Math.round(value / 2);
    }

    static polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    static calcProgressWithinValues(minValue: number, maxValue: number, currentValue: number): number {
        let delta = maxValue - minValue;
        let progress = (currentValue - minValue) / delta;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        return progress;
    }
}
