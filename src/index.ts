import express from 'express';
import { handleQuery } from './chatbot/handler';
import { exampleQuestions } from './data/faqData';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Welcome endpoint
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Facts-Only MF Assistant",
        description: "A RAG-based chatbot that answers factual questions about mutual fund schemes",
        disclaimer: "⚠️ Facts-only. No investment advice.",
        exampleQuestions: exampleQuestions,
        usage: "POST /query with body: { query: 'your question' }"
    });
});

// Query endpoint
app.post('/query', async (req, res) => {
    const userQuery = req.body.query;
    
    if (!userQuery) {
        return res.status(400).json({
            error: 'Query is required',
            usage: "Send POST request with body: { query: 'your question' }"
        });
    }

    try {
        const response = await handleQuery(userQuery);
        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'An error occurred while processing your request.'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'MF FAQ Assistant is running' });
});

app.listen(PORT, () => {
    console.log(`\n🚀 MF FAQ Assistant is running on http://localhost:${PORT}`);
    console.log(`📚 Knowledge base loaded with 20 factual MF topics`);
    console.log(`\n📝 Example queries:`);
    exampleQuestions.forEach(q => console.log(`  - "${q}"`));
    console.log(`\n⚠️  This assistant provides FACTS-ONLY information. No investment advice.\n`);
});