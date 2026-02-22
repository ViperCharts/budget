import { RGBA, SimpleChart } from '../SimpleChart';

export default class Canvas {
    chart: SimpleChart;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(chart: SimpleChart, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D);
    /**
     * Draw a box with raw x & y coordinate values
     * @param color RGBA [0-1] color value
     * @param coords [x, y, w, h] coords
     */
    drawBox(color: RGBA, coords: number[]): void;
    /**
     * Draw text at raw x & y coordinate pair
     * @param color RGBA [0-1] color value
     * @param coords [x left, y bottom] coords (x & y = center of text box)
     */
    drawText(color: RGBA, coords: number[], text: string, options?: Partial<{
        textAlign: CanvasTextDrawingStyles["textAlign"];
        font: CanvasTextDrawingStyles["font"];
        stroke: boolean;
    }>): void;
    /**
     *
     * @param screen Screen Id (0 if only one screen)
     * @param color RGBA [0-1] color value
     * @param coords [time, value1, value2]
     * @param width (0.0 - 1.0) - % of element (time) to cover (0.5 = 50%)
     */
    drawBoxByPriceAndPercWidthOfTime(screen: number, color: RGBA, coords: number[], width: number): void;
    /**
     * Draw a line with 2 pairs of raw [x, y] coords
     * @param color RGBA [0-1] color value
     * @param coords [x1, y1, x2, y2] coords
     * @param linewidth Line width in px (default 1)
     */
    drawLine(color: RGBA, coords: number[], linewidth?: number): void;
    /**
     * Draw a complex infinite point polygon
     * @param color RGBA [0-1] color value
     * @param coords [x1, y1, x2, y2, ...] coords
     */
    drawPolygon(color: RGBA, coords: number[]): void;
    /**
     * Draw a line with a time & price coordinate pair
     * @param screen Screen Id (0 if only one screen)
     * @param color RGBA [0-1] color value
     * @param coords [x1, y1, x2, y2] coords
     */
    drawLineByPriceAndTime(screen: number, color: RGBA, coords: number[]): void;
    /**
     * Draw text at a time & price coordinate pair
     * @param color RGBA [0-1] color value
     * @param coords [x left, y bottom] coords (x & y = center of text box)
     */
    drawTextAtPriceAndTime(color: RGBA, coords: number[], text: string): void;
}
