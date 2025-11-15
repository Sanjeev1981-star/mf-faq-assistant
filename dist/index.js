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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handler_1 = require("./chatbot/handler");
const faqData_1 = require("./data/faqData");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Welcome endpoint
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Facts-Only MF Assistant",
        description: "A RAG-based chatbot that answers factual questions about mutual fund schemes",
        disclaimer: "⚠️ Facts-only. No investment advice.",
        exampleQuestions: faqData_1.exampleQuestions,
        usage: "POST /query with body: { query: 'your question' }"
    });
});
// Query endpoint
app.post('/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = req.body.query;
    if (!userQuery) {
        return res.status(400).json({
            error: 'Query is required',
            usage: "Send POST request with body: { query: 'your question' }"
        });
    }
    try {
        const response = yield (0, handler_1.handleQuery)(userQuery);
        res.json(response);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'An error occurred while processing your request.'
        });
    }
}));
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'MF FAQ Assistant is running' });
});
app.listen(PORT, () => {
    console.log(`\n🚀 MF FAQ Assistant is running on http://localhost:${PORT}`);
    console.log(`📚 Knowledge base loaded with 20 factual MF topics`);
    console.log(`\n📝 Example queries:`);
    faqData_1.exampleQuestions.forEach(q => console.log(`  - "${q}"`));
    console.log(`\n⚠️  This assistant provides FACTS-ONLY information. No investment advice.\n`);
});
