"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DocumentLoader {
    constructor(sourceFilePath) {
        this.sourceFilePath = sourceFilePath;
    }
    loadDocuments() {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(this.sourceFilePath, 'utf-8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                const documents = this.parseDocuments(data);
                resolve(documents);
            });
        });
    }
    parseDocuments(data) {
        // Assuming the data is in JSON format
        const sources = JSON.parse(data);
        return sources.map((source) => source.url);
    }
}
// Usage example
const documentLoader = new DocumentLoader(path_1.default.join(__dirname, '../../data/sources.json'));
documentLoader.loadDocuments()
    .then(documents => {
    console.log('Loaded documents:', documents);
})
    .catch(err => {
    console.error('Error loading documents:', err);
});
exports.default = DocumentLoader;
