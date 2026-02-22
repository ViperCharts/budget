import { Regl } from 'regl';

/**
 * Grid Line Program - renders horizontal or vertical grid lines in screen space
 * Uses instanced rendering for efficiency
 */
export declare function GridLineProgram(regl: Regl): import('regl').DrawCommand<import('regl').DefaultContext, {}>;
export declare function LineProgram(regl: Regl): import('regl').DrawCommand<import('regl').DefaultContext, {}>;
export declare function CandleStickProgram(regl: Regl): import('regl').DrawCommand<import('regl').DefaultContext, {}>;
export declare function CandleBodyProgram(regl: Regl): import('regl').DrawCommand<import('regl').DefaultContext, {}>;
export declare function FootprintProgram(regl: Regl): import('regl').DrawCommand<import('regl').DefaultContext, {}>;
/**
 * AbsoluteVolumeProgram - renders volume bars at a fixed pixel height (volumeHeight)
 */
export declare function AbsoluteVolumeProgram(regl: Regl): import('regl').DrawCommand<import('regl').DefaultContext, {}>;
/**
 * TraditionalVolumeProgram - renders volume bars using worldToScreenSpace,
 * filling the full viewport height proportionally
 */
export declare function TraditionalVolumeProgram(regl: Regl): import('regl').DrawCommand<import('regl').DefaultContext, {}>;
export declare function activeVolumeProfileProgram(regl: Regl): import('regl').DrawCommand<import('regl').DefaultContext, {}>;
