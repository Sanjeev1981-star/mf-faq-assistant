export interface SourceMapping {
    [key: string]: string;
}

const sourceMap: SourceMapping = {
    "SEBI": "https://www.sebi.gov.in",
    "AMFI": "https://www.amfiindia.com",
    "AMC": "https://www.amc.com",
    // Add more mappings as needed
};

export function getSourceUrl(sourceName: string): string | undefined {
    return sourceMap[sourceName];
}