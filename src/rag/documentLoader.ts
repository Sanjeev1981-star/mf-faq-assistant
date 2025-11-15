import fs from 'fs';
import path from 'path';

class DocumentLoader {
    private sourceFilePath: string;

    constructor(sourceFilePath: string) {
        this.sourceFilePath = sourceFilePath;
    }

    public loadDocuments(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.sourceFilePath, 'utf-8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                const documents = this.parseDocuments(data);
                resolve(documents);
            });
        });
    }

    private parseDocuments(data: string): string[] {
        // Assuming the data is in JSON format
        const sources = JSON.parse(data);
        return sources.map((source: { url: string }) => source.url);
    }
}

// Usage example
const documentLoader = new DocumentLoader(path.join(__dirname, '../../data/sources.json'));
documentLoader.loadDocuments()
    .then(documents => {
        console.log('Loaded documents:', documents);
    })
    .catch(err => {
        console.error('Error loading documents:', err);
    });

export default DocumentLoader;