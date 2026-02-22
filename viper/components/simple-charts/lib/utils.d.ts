import { RGBA } from '../SimpleChart';

export declare function randomRGBAColor(): RGBA;
/**
 * Get all timestamps aligned to timeframe within start and end range
 * @param {number} start Start unix time
 * @param {number} end End unix time
 * @param {number} timeframe Timeframe in ms
 * @returns {number[]} Array of timestamps
 */
export declare function getAllTimestampsIn(start: number, end: number, timeframe: number): number[];
/** Quickly find where in an array an item should be. Takes ~.03ms */
export declare function getInsertIndex<T>(sortedArray: T[], target: T): {
    insertIndex: number;
    exact: boolean;
};
/** Find the index of the first value that's >= target. Takes ~.03ms */
export declare function getMinimumIndex<T>(sortedArray: T[], target: T): number;
/** Find the index of the last value that's <= target. Takes ~.03ms */
export declare function getMaximumIndex<T>(sortedArray: T[], target: T): number;
export declare function anyToTimestamp(value: any): number;
