export interface Document {
    id: string;
    content: string;
    sourceUrl: string;
    title: string;
    category: string;
}

export interface FAQResponse {
    answer: string;
    source: string;
    sourceUrl: string;
}

export interface UserQuery {
    question: string;
    timestamp: Date;
}

export interface Citation {
    text: string;
    link: string;
}

export interface Disclaimer {
    message: string;
}