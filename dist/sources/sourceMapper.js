"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceUrl = void 0;
const sourceMap = {
    "SEBI": "https://www.sebi.gov.in",
    "AMFI": "https://www.amfiindia.com",
    "AMC": "https://www.amc.com",
    // Add more mappings as needed
};
function getSourceUrl(sourceName) {
    return sourceMap[sourceName];
}
exports.getSourceUrl = getSourceUrl;
