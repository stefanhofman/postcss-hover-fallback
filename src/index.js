/**
 * PostCSS plugin to convert @media (hover: hover) to standard hover selectors
 * for ES5 compatibility
 */

const pluginName = 'postcss-hover-fallback';

function hoverFallback(opts = {}) {
    const postcss = require('postcss');
    // Helper to resolve full selector context for nested rules
    function getFullSelector(rule) {
        let selectors = [];
        let current = rule;
        while (current && current.type !== 'root') {
            if (current.selector) {
                selectors.unshift(current.selector);
            }
            current = current.parent;
        }
        return selectors.join(' ').replace(/\s*&\s*/g, '').trim();
    }

    return {
        postcssPlugin: pluginName,
        Once(root, { result }) {
            // Walk all @media rules, including nested ones
            root.walkAtRules('media', (atRule) => {
                if (atRule.params.includes('hover:hover') || atRule.params.includes('hover: hover')) {
                    const hoverRules = [];

                    // Find the parent rule (could be a nested selector)
                    let parentRule = atRule.parent;
                    let parentSelector = '';
                    if (parentRule && parentRule.selector) {
                        parentSelector = getFullSelector(parentRule);
                    }

                    atRule.walkRules((innerRule) => {
                        // Compose the full selector context
                        let baseSelector = innerRule.selector;
                        // If the parent is a rule, combine selectors
                        let fullSelector = baseSelector;
                        if (parentSelector) {
                            // Handle & in selector (from nesting)
                            fullSelector = baseSelector
                                .split(',')
                                .map(sel => {
                                    sel = sel.trim();
                                    if (sel.includes('&')) {
                                        return sel.replace(/&/g, parentSelector);
                                    } else {
                                        return parentSelector + ' ' + sel;
                                    }
                                })
                                .join(', ');
                        }

                        // Convert selectors to hover selectors
                        const hoverSelector = fullSelector
                            .split(',')
                            .map(selector => {
                                const trimmed = selector.trim();
                                if (trimmed.includes(':hover')) {
                                    return trimmed;
                                }
                                return `${trimmed}:hover`;
                            })
                            .join(', ');

                        // Clone the rule and set the new selector
                        const newRule = innerRule.clone();
                        newRule.selector = hoverSelector;

                        hoverRules.push(newRule);
                    });

                    // Insert the hover rules after the parent rule or atRule
                    if (parentRule && parentRule.type === 'rule') {
                        hoverRules.forEach(hoverRule => {
                            parentRule.parent.insertAfter(parentRule, hoverRule);
                        });
                    } else {
                        hoverRules.forEach(hoverRule => {
                            atRule.parent.insertAfter(atRule, hoverRule);
                        });
                    }

                    // Optionally remove the original media query
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
