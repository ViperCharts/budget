/**
 * RGBA color as [r, g, b, a] with values normalized to 0-1 range for WebGL
 */
export type RGBA = [number, number, number, number] | number[];
/**
 * Chart theme configuration for customizing colors
 */
export interface ChartTheme {
    /** Positive/bullish color (e.g., green for up candles) */
    positive: RGBA;
    /** Negative/bearish color (e.g., red for down candles) */
    negative: RGBA;
    /** Chart background color */
    background: RGBA;
    /** Foreground color (grid lines, borders) */
    foreground: RGBA;
    /** Grid line color */
    gridLine: RGBA;
    /** Crosshair line color */
    crosshair: RGBA;
    /** Text color for labels and scales */
    textColor: RGBA;
}
/**
 * Helper to convert hex color to RGBA tuple
 * @param hex - Hex color string (e.g., "#8fdd05" or "8fdd05")
 * @param alpha - Alpha value 0-1, defaults to 1
 */
export declare function hexToRGBA(hex: string, alpha?: number): RGBA;
/**
 * Helper to convert RGBA tuple to CSS rgba() string
 */
export declare function rgbaToCSS(rgba: RGBA): string;
/**
 * Helper to convert RGBA tuple to hex string
 */
export declare function rgbaToHex(rgba: RGBA): string;
export declare const DarkTheme: ChartTheme;
export declare const LightTheme: ChartTheme;
/**
 * Default themes available
 */
export declare const Themes: {
    readonly dark: ChartTheme;
    readonly light: ChartTheme;
};
export type ThemeName = keyof typeof Themes;
/**
 * Deep-copies a ChartTheme into a target object, creating independent RGBA
 * array instances for every property. This prevents the source theme (e.g. a
 * shared constant like `Themes.dark`) from being mutated when the target's
 * color arrays are modified later, while keeping the target object reference
 * stable so Vue reactive proxies wrapping it are not broken.
 *
 * @param target - The object to write copied values into (mutated in place).
 * @param source - The theme whose values are copied from.
 */
export declare function applyTheme(target: ChartTheme, source: ChartTheme): void;
