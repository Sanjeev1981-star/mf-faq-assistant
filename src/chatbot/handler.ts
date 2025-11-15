import { Retriever } from '../rag/retriever';
import { VectorStore } from '../rag/vectorStore';
import { ResponseFormatter } from './responseFormatter';
import { DisclaimerManager } from './disclaimerManager';
import { faqKnowledgeBase, opinionatedQuestionPatterns } from '../data/faqData';

let retrieverInstance: Retriever | null = null;

function getRetriever(): Retriever {
    if (!retrieverInstance) {
        const vectorStore = new VectorStore(faqKnowledgeBase);
        retrieverInstance = new Retriever(vectorStore);
    }
    return retrieverInstance;
}

function isOpinionatedQuestion(query: string): boolean {
    return opinionatedQuestionPatterns.some(pattern => pattern.test(query));
}

export async function handleQuery(query: string): Promise<any> {
    const responseFormatter = new ResponseFormatter();
    const disclaimerManager = new DisclaimerManager();
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
        const result = await retriever.retrieve(query);

        // Format and return response
        return {
            question: query,
            answer: result.answer,
            source: result.source,
            sourceUrl: result.sourceUrl,
            disclaimer: disclaimerManager.getDisclaimer(),
            lastUpdated: `Last updated from sources: ${new Date().toLocaleDateString()}`
        };
    } catch (error) {
        console.error("Error processing query:", error);
        return {
            error: "An error occurred while processing your question. Please try again.",
            disclaimer: disclaimerManager.getDisclaimer()
        };
    }
}

function containsPII(text: string): boolean {
    // Basic PII patterns
    const piiPatterns = [
        /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/, // PAN pattern
        /\b\d{12}\b/, // Aadhaar pattern (12 digits)
        /OTP/i,
        /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, // Email
        /\b\d{10}\b/, // Phone number (basic)
        /account\s*number/i,
        /bank\s*account/i
    ];

    return piiPatterns.some(pattern => pattern.test(text));
}