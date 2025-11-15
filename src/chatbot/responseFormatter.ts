import { DisclaimerManager } from './disclaimerManager';

export class ResponseFormatter {
    private disclaimerManager: DisclaimerManager;

    constructor() {
        this.disclaimerManager = new DisclaimerManager();
    }

    public formatResponse(answer: string, source: string, sourceUrl: string): string {
        const disclaimer = this.disclaimerManager.getDisclaimer();

        return `${answer}\n\n📎 Source: ${source}\n🔗 Link: ${sourceUrl}\n\n⚠️  ${disclaimer}`;
    }

    public formatRefusalResponse(query: string): string {
        const disclaimer = this.disclaimerManager.getDisclaimer();
        return `I can only provide factual information about mutual fund schemes, not investment advice or comparisons.\n\nYour question: "${query}"\n\nPlease check:\n- Official AMC factsheets\n- SEBI guidelines\n- AMFI resources\n\n⚠️  ${disclaimer}`;
    }

    public formatAnswer(answer: string, sourceUrl: string): object {
        const disclaimer = this.disclaimerManager.getDisclaimer();

        return {
            answer: answer.substring(0, 500), // Keep answers concise (≤3 sentences)
            source: sourceUrl,
            disclaimer: disclaimer,
            lastUpdated: new Date().toISOString()
        };
    }
}