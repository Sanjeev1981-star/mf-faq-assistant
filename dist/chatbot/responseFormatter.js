"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFormatter = void 0;
const disclaimerManager_1 = require("./disclaimerManager");
class ResponseFormatter {
    constructor() {
        this.disclaimerManager = new disclaimerManager_1.DisclaimerManager();
    }
    formatResponse(answer, source, sourceUrl) {
        const disclaimer = this.disclaimerManager.getDisclaimer();
        return `${answer}\n\n📎 Source: ${source}\n🔗 Link: ${sourceUrl}\n\n⚠️  ${disclaimer}`;
    }
    formatRefusalResponse(query) {
        const disclaimer = this.disclaimerManager.getDisclaimer();
        return `I can only provide factual information about mutual fund schemes, not investment advice or comparisons.\n\nYour question: "${query}"\n\nPlease check:\n- Official AMC factsheets\n- SEBI guidelines\n- AMFI resources\n\n⚠️  ${disclaimer}`;
    }
    formatAnswer(answer, sourceUrl) {
        const disclaimer = this.disclaimerManager.getDisclaimer();
        return {
            answer: answer.substring(0, 500),
            source: sourceUrl,
            disclaimer: disclaimer,
            lastUpdated: new Date().toISOString()
        };
    }
}
exports.ResponseFormatter = ResponseFormatter;
