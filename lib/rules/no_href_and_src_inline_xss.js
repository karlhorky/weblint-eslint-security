/** This rule flags the use of unsafe strings in href and src property values,
 *  due to the concern that it might have originated from user data. */

// Make use of some helper functions, shared between rules
const {isSafeValue} = require('../utils/xss_helper');

// The set of known safe variables, at a given point in traversal
let safeOriginVarsSet = new Set();

module.exports = {
    meta: {
        type: 'error',
        docs: {
            description: 'Disallows unescaped variables of uncertain origin from href and src values, \
                          due to the concern that they might originate from user input.',
            category: 'Possible security vulnerability',
            recommended: true,
        },
        fixable: 'code',
    },
    create: function (context) {
        return {
            VariableDeclarator(node) {
                // If a variable is initialized safely, add it to the safe set of variables
                if (isSafeValue(node.init, safeOriginVarsSet)) safeOriginVarsSet.add(node.id.name);
            },
            AssignmentExpression(node) {
                // In case of variable reassignments, update the safe variables set based on the new value
                if (isSafeValue(node.right, safeOriginVarsSet) && !!node.left.name) {
                    safeOriginVarsSet.add(node.left.name);
                } else {
                    safeOriginVarsSet.delete(node.left.name);
                }
            },
            Identifier(node) {

                const propertyName = node.name;
                if (propertyName !== 'href' && propertyName !== 'src') return; // Only consider assignments on href and src properties

                // Extract the node containing the property value
                const propertyValueNode = node.parent.parent.right;
                if (!propertyValueNode || isSafeValue(propertyValueNode, safeOriginVarsSet)) return; // Property value is safe - return

                // Suggest to end user, that the right-hand side of the property assignment be escaped
                const propertyAssignmentSourceCode = context.getSourceCode().getText(propertyValueNode);
                const suggestedFix = `.${propertyName} = (${propertyAssignmentSourceCode}).toLowerCase().replace('javascript:', '/javascript/:/');`;

                context.report({
                    node,
                    message: `${propertyName} property value might be XSS vulnerable`,
                    suggest: [
                        {
                            desc: `Avoid using unescaped variables of uncertain origin in href and src property values, \
                                   due to the concern that they might originate from user input. \
                                   Alternatively (this does not guarantee safety), escape the input, by applying the following call to the value: \                                   
                                   " .toLowerCase().replace('javascript:', '/javascript/:/'); "`,
                            fix: function (fixer) {
                                return fixer.insertTextAfter(node, suggestedFix);
                            },
                        },
                    ],
                });
            },
        };
    },
};