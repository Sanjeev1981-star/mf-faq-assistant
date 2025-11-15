import { VectorStore } from './vectorStore';
import { Document } from '../types/index';

export class Retriever {
    private vectorStore: VectorStore;

    constructor(vectorStore: VectorStore) {
        this.vectorStore = vectorStore;
    }

    public async retrieve(query: string): Promise<{ answer: string; source: string; sourceUrl: string }> {
        const relevantDocuments: Document[] = await this.vectorStore.query(query, 1);

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
    }

    public async retrieveMultiple(query: string, topK: number = 3): Promise<Document[]> {
        return this.vectorStore.query(query, topK);
    }
}