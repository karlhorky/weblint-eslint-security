/** This package contributes new ESLint security rules for standard (.html, regular .js) file types */

module.exports = {
    rules: {
        "no-href-and-src-inline-xss": require('./lib/rules/standard/no_href_and_src_inline_xss.js'),
        "no-href-and-src-inline-xss-react": require('./lib/rules/react/no_href_and_src_inline_xss_react.js'),
    },
    configs: {
        recommended: {
            plugins: [
                'weblint-security'
            ],
            rules: {
                'weblint-security/no-href-and-src-inline-xss': 1,
            }
        },
        react: {
            plugins: [
                'weblint-security'
            ],
            rules: {
                'weblint-security/no-href-and-src-inline-xss-react': 1,
            }
        }
    }
}