import { RGBA } from './viper';

export declare const getYCoordByValue: (min: number, max: number, height: number, value: number) => number;
/**
 * Get an x coord for a given width and visible range
 * @param {number} start
 * @param {number} end
 * @param {number} width
 * @param {number} timestamp
 * @returns
 */
export declare const getXCoordByTimestamp: (start: number, end: number, width: number, timestamp: number) => number;
/**
 * Get a value for a given height and visible range
 * @param {number} min
 * @param {number} max
 * @param {number} height
 * @param {number} yCoord
 * @returns
 */
export declare const getValueByYCoord: (min: number, max: number, height: number, yCoord: number) => number;
/**
 * Get a timestamp at x coord for given width and visible range
 * @param {number} start
 * @param {number} end
 * @param {number} width
 * @param {number} xCoord
 */
export declare const getTimestampByXCoord: (start: number, end: number, width: number, xCoord: number) => number;
export declare const getAbsoluteMax: (value: number, max: number) => number;
export declare const aZ: (v: number, length?: number) => string;
export declare class DateWrapper {
    value: Date;
    constructor(value: string | number | Date);
    time(): number;
    ms(): number;
    s(): number;
    m(): number;
    h(): number;
    d(): number;
}
export declare function getContrastingRGBAColor(rgba: RGBA): RGBA;
export declare function glRGBAToCSSRGB(rgba: RGBA): string;
export declare function glRGBAToCSSRGBA(rgba: RGBA): string;
export declare function toSigZeroNotation(price: number | string): string;
