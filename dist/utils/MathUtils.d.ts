/******************************************************************
 * MathUtils
 *
 * @author matthias.schulz@jash.de
 *****************************************************************/
export declare class MathUtils {
    static isMouseInRect(rect: ClientRect, mouseX: number, mouseY: number): boolean;
    static degToRad(degrees: number): number;
    static roundToEven(value: number): number;
    static polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): {
        x: number;
        y: number;
    };
    static calcProgressWithinValues(minValue: number, maxValue: number, currentValue: number): number;
}
