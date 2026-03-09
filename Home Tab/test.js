const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
    /\.section \{\s*padding: 0 16px 20px;\s*\}/,
    `.section {\n    padding: 0 24px 20px;\n}`
);

css = css.replace(
    /grid-template-columns: 192px minmax\(0, 1fr\);/,
    `grid-template-columns: 1fr 1fr;`
);

css = css.replace(
    /\.zapp-account-box \{\s*display: flex;([\s\S]*?)width: 192px;/,
    `.zapp-account-box {\n    display: flex;$1width: 100%;`
);

css = css.replace(
    /\.twin-cards-wrapper \{\s*display: flex;\s*gap: 8px;\s*\}/,
    `.twin-cards-wrapper {\n    display: flex;\n    gap: 8px;\n    width: 100%;\n}`
);

css = css.replace(
    /\.bills-card \{\s*position: relative;\s*display: flex;\s*width: 92px;/,
    `.bills-card {\n    position: relative;\n    display: flex;\n    flex: 1;\n    width: 100%;`
);

css = css.replace(
    /\.mycards-card \{\s*display: flex;\s*width: 92px;/,
    `.mycards-card {\n    display: flex;\n    flex: 1;\n    width: 100%;`
);

css = css.replace(
    /\.convert-emi-text \{([\s\S]*?)white-space: nowrap;\s*\}/,
    `.convert-emi-text {$1white-space: normal;\n}`
);

// We need to also reduce padding in service-card so that text is not too squished.
css = css.replace(
    /\.service-card \{([\s\S]*?)padding: 0 24px 0 12px;/,
    `.service-card {$1padding: 0 12px 0 12px;`
);

fs.writeFileSync('style.css', css);
console.log('Done replacement');
