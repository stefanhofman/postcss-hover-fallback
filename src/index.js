/**
 * PostCSS plugin to convert @media (hover: hover) to standard hover selectors
 * for ES5 compatibility
 */

const pluginName = 'postcss-hover-fallback';

function hoverFallback(opts = {}) {
    return {
        postcssPlugin: pluginName,
        Once(root, { result }) {
            // Process all @media rules in the CSS
            root.walkAtRules('media', (atRule) => {
                // Check if this is a hover media query (more robust check)
                if (atRule.params.includes('hover:hover') || atRule.params.includes('hover: hover')) {
                    // Extract the rules inside the media query
                    const hoverRules = [];

                    atRule.walkRules((innerRule) => {
                        // Clone the rule and modify selectors to add :hover
                        const newRule = innerRule.clone();

                        // Convert selectors to hover selectors
                        newRule.selector = newRule.selector
                            .split(',')
                            .map(selector => {
                                const trimmed = selector.trim();
                                // If selector already has :hover, keep it as is
                                if (trimmed.includes(':hover')) {
                                    return trimmed;
                                }
                                // Add :hover to the selector
                                return `${trimmed}:hover`;
                            })
                            .join(', ');

                        hoverRules.push(newRule);
                    });

                    // Insert the hover rules after the media query
                    hoverRules.forEach(hoverRule => {
                        atRule.parent.insertAfter(atRule, hoverRule);
                    });

                    // Optionally remove the original media query
                    // (set preserveOriginal to true in options to keep both)
                    if (!opts.preserveOriginal) {
                        atRule.remove();
                    }
                }
            });
        }
    };
}

hoverFallback.postcss = true;

module.exports = hoverFallback;
module.exports.default = hoverFallback;
module.exports.postcss = true;
