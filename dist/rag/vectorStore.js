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
exports.VectorStore = void 0;
class VectorStore {
    constructor(documents) {
        this.documents = [];
        if (documents) {
            this.documents = documents;
        }
    }
    addDocuments(docs) {
        this.documents.push(...docs);
    }
    addDocument(doc) {
        this.documents.push(doc);
    }
    /**
     * Simple semantic search using string similarity
     * For production, use proper embedding models (OpenAI, Hugging Face, etc.)
     */
    query(queryString, topK = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            const scores = this.documents.map(doc => ({
                doc,
                score: this.calculateSimilarity(queryString, doc)
            }));
            return scores
                .sort((a, b) => b.score - a.score)
                .slice(0, topK)
                .map(item => item.doc);
        });
    }
    /**
     * Calculate similarity between query and document
     * Uses simple keyword matching + category matching
     */
    calculateSimilarity(query, doc) {
        const queryLower = query.toLowerCase();
        const contentLower = doc.content.toLowerCase();
        const titleLower = doc.title.toLowerCase();
        let score = 0;
        // Exact phrase matches get highest weight
        if (titleLower.includes(queryLower)) {
            score += 10;
        }
        // Title keyword matches
        const queryWords = queryLower.split(/\s+/);
        queryWords.forEach(word => {
            if (word.length > 2) {
                if (titleLower.includes(word))
                    score += 3;
                if (contentLower.includes(word))
                    score += 1;
            }
        });
        return score;
    }
    getDocuments() {
        return this.documents;
    }
    clear() {
        this.documents = [];
    }
}
exports.VectorStore = VectorStore;
