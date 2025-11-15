"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleQuery = void 0;
const retriever_1 = require("../rag/retriever");
const vectorStore_1 = require("../rag/vectorStore");
const responseFormatter_1 = require("./responseFormatter");
const disclaimerManager_1 = require("./disclaimerManager");
const faqData_1 = require("../data/faqData");
let retrieverInstance = null;
function getRetriever() {
    if (!retrieverInstance) {
        const vectorStore = new vectorStore_1.VectorStore(faqData_1.faqKnowledgeBase);
        retrieverInstance = new retriever_1.Retriever(vectorStore);
    }
    return retrieverInstance;
}
function isOpinionatedQuestion(query) {
    return faqData_1.opinionatedQuestionPatterns.some(pattern => pattern.test(query));
}
function handleQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const responseFormatter = new responseFormatter_1.ResponseFormatter();
        const disclaimerManager = new disclaimerManager_1.DisclaimerManager();
        const retriever = getRetriever();
        // Validate query
        if (!query || query.trim().length === 0) {
            return {
                error: "Please provide a question about mutual funds.",
                disclaimer: disclaimerManager.getDisclaimer()
            };
        }
        // Check for PII (Personal Identifiable Information)
        if (containsPII(query)) {
            return {
                error: "Please do not share personal information like PAN, Aadhaar, account numbers, OTPs, emails, or phone numbers.",
                disclaimer: disclaimerManager.getDisclaimer()
            };
        }
        // Check if question is opinionated/advisory
        if (isOpinionatedQuestion(query)) {
            return {
                answer: responseFormatter.formatRefusalResponse(query),
                type: "refusal",
                disclaimer: disclaimerManager.getDisclaimer()
            };
        }
        try {
            // Retrieve relevant information
            const result = yield retriever.retrieve(query);
            // Format and return response
            return {
                question: query,
                answer: result.answer,
                source: result.source,
                sourceUrl: result.sourceUrl,
                disclaimer: disclaimerManager.getDisclaimer(),
                lastUpdated: `Last updated from sources: ${new Date().toLocaleDateString()}`
            };
        }
        catch (error) {
            console.error("Error processing query:", error);
            return {
                error: "An error occurred while processing your question. Please try again.",
                disclaimer: disclaimerManager.getDisclaimer()
            };
        }
    });
}
exports.handleQuery = handleQuery;
function containsPII(text) {
    // Basic PII patterns
    const piiPatterns = [
        /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/,
        /\b\d{12}\b/,
        /OTP/i,
        /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
        /\b\d{10}\b/,
        /account\s*number/i,
        /bank\s*account/i
    ];
    return piiPatterns.some(pattern => pattern.test(text));
}
