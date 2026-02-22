/**
 * Common timeframe constants in milliseconds
 * Use these for chart.timeframe.value
 */
/**
 * Timeframes object for convenient access
 */
export declare const TIMEFRAMES: {
    readonly MILLISECONDS_1: 1;
    readonly MILLISECONDS_5: 5;
    readonly MILLISECONDS_10: 10;
    readonly MILLISECONDS_15: 15;
    readonly MILLISECONDS_25: 25;
    readonly MILLISECONDS_50: 50;
    readonly MILLISECONDS_100: 100;
    readonly MILLISECONDS_250: 250;
    readonly MILLISECONDS_500: 500;
    readonly SECONDS_1: 1000;
    readonly SECONDS_5: number;
    readonly SECONDS_10: number;
    readonly SECONDS_15: number;
    readonly SECONDS_30: number;
    readonly SECONDS_45: number;
    readonly MINUTES_1: number;
    readonly MINUTES_2: number;
    readonly MINUTES_3: number;
    readonly MINUTES_5: number;
    readonly MINUTES_10: number;
    readonly MINUTES_15: number;
    readonly MINUTES_30: number;
    readonly MINUTES_45: number;
    readonly HOURS_1: number;
    readonly HOURS_2: number;
    readonly HOURS_3: number;
    readonly HOURS_4: number;
    readonly HOURS_6: number;
    readonly HOURS_8: number;
    readonly HOURS_12: number;
    readonly DAYS_1: number;
    readonly DAYS_2: number;
    readonly DAYS_3: number;
    readonly WEEKS_1: number;
    readonly WEEKS_2: number;
};
export type Timeframe = (typeof TIMEFRAMES)[keyof typeof TIMEFRAMES];
