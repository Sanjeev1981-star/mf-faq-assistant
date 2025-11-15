import { Document } from '../types/index';

export class VectorStore {
    private documents: Document[] = [];

    constructor(documents?: Document[]) {
        if (documents) {
            this.documents = documents;
        }
    }

    public addDocuments(docs: Document[]): void {
        this.documents.push(...docs);
    }

    public addDocument(doc: Document): void {
        this.documents.push(doc);
    }

    /**
     * Simple semantic search using string similarity
     * For production, use proper embedding models (OpenAI, Hugging Face, etc.)
     */
    public async query(queryString: string, topK: number = 3): Promise<Document[]> {
        const scores = this.documents.map(doc => ({
            doc,
            score: this.calculateSimilarity(queryString, doc)
        }));

        return scores
            .sort((a, b) => b.score - a.score)
            .slice(0, topK)
            .map(item => item.doc);
    }

    /**
     * Calculate similarity between query and document
     * Uses simple keyword matching + category matching
     */
    private calculateSimilarity(query: string, doc: Document): number {
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
                if (titleLower.includes(word)) score += 3;
                if (contentLower.includes(word)) score += 1;
            }
        });

        return score;
    }

    public getDocuments(): Document[] {
        return this.documents;
    }

    public clear(): void {
        this.documents = [];
    }
}
