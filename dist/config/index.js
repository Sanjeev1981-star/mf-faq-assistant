"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    port: process.env.PORT || 3000,
    sources: {
        amc: process.env.AMC_SOURCE_URL || 'https://www.amfiindia.com',
        sebi: process.env.SEBI_SOURCE_URL || 'https://www.sebi.gov.in',
        amfi: process.env.AMFI_SOURCE_URL || 'https://www.amfiindia.com',
    },
    disclaimer: "Facts-only. No investment advice."
};
