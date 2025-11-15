import { handleQuery } from './src/chatbot/handler';

async function runTests() {
    console.log('\n🧪 Testing MF FAQ Assistant\n');
    console.log('='.repeat(80));

    const testQueries = [
        "What is the expense ratio?",
        "What is ELSS lock-in period?",
        "What is the exit load?",
        "How to download capital gains statement?",
        "Should I invest in this fund?",  // Should trigger refusal
        "Tell me PAN 12345ABCD",           // Should trigger PII warning
    ];

    for (const query of testQueries) {
        console.log(`\n❓ Query: "${query}"`);
        console.log('-'.repeat(80));
        
        try {
            const response = await handleQuery(query);
            console.log(`✅ Response:`, JSON.stringify(response, null, 2));
        } catch (error) {
            console.error(`❌ Error:`, error);
        }
        
        console.log('='.repeat(80));
    }
}

runTests().catch(console.error);
