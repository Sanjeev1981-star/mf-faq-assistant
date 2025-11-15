export class DisclaimerManager {
    private disclaimer: string;

    constructor() {
        this.disclaimer = "Facts-only. No investment advice.";
    }

    public getDisclaimer(): string {
        return this.disclaimer;
    }

    public appendDisclaimerToResponse(response: string): string {
        return `${response}\n\n${this.disclaimer}`;
    }
}