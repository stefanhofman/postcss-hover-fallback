/**
 * Type definitions for postcss-hover-fallback
 */

import type { Plugin } from 'postcss';

export interface HoverFallbackOptions {
  /**
   * If true, preserves the original @media (hover: hover) rule.
   * If false (default), removes the original media query after generating the fallback.
   */
  preserveOriginal?: boolean;
}

/**
 * PostCSS plugin to convert @media (hover: hover) to standard :hover selectors
 * for ES5 compatibility.
 *
 * @param opts Plugin options
 * @returns PostCSS plugin instance
 */
declare function hoverFallback(opts?: HoverFallbackOptions): Plugin;

declare namespace hoverFallback {
  var postcss: true;
}

export = hoverFallback;
