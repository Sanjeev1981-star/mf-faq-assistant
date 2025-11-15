"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisclaimerManager = void 0;
class DisclaimerManager {
    constructor() {
        this.disclaimer = "Facts-only. No investment advice.";
    }
    getDisclaimer() {
        return this.disclaimer;
    }
    appendDisclaimerToResponse(response) {
        return `${response}\n\n${this.disclaimer}`;
    }
}
exports.DisclaimerManager = DisclaimerManager;
