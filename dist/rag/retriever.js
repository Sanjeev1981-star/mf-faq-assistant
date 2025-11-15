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
exports.Retriever = void 0;
class Retriever {
    constructor(vectorStore) {
        this.vectorStore = vectorStore;
    }
    retrieve(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const relevantDocuments = yield this.vectorStore.query(query, 1);
            if (relevantDocuments.length === 0) {
                return {
                    answer: "I don't have factual information about that topic. Please check official sources like AMFI, SEBI, or your AMC's website.",
                    source: "No source available",
                    sourceUrl: "https://www.amfiindia.com"
                };
            }
            const bestDocument = relevantDocuments[0];
            return {
                answer: bestDocument.content,
                source: bestDocument.title,
                sourceUrl: bestDocument.sourceUrl
            };
        });
    }
    retrieveMultiple(query, topK = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.vectorStore.query(query, topK);
        });
    }
}
exports.Retriever = Retriever;
