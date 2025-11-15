# Facts-Only MF Assistant

## Overview
A RAG-based chatbot that answers **factual questions about mutual fund schemes** using verified sources from AMC, SEBI, and AMFI websites. Provides concise, citation-backed responses while strictly avoiding investment advice.

## Key Features
✅ **Facts-Only Responses** - Answers only factual queries about mutual funds (expense ratios, exit loads, ELSS lock-in, riskometer, benchmarks, tax documents)  
✅ **Citation-Backed** - Every answer includes a source link from official sources  
✅ **Privacy Protected** - Refuses to accept personal identifiable information (PAN, Aadhaar, account numbers, OTPs, emails, phone numbers)  
✅ **Advisory Refusal** - Politely declines portfolio/investment advice queries  
✅ **Semantic Retrieval** - Uses keyword and similarity matching to find relevant information  

## Scope

### AMC Selection
Primary sources include factual information from multiple AMCs:
- HDFC Fund
- ICICI Prudential
- SBI Mutual Fund
- Axis Mutual Fund
- Kotak Mutual Fund
- And 10+ other major AMCs

### Knowledge Base (20 Topics)
1. Expense Ratio
2. Exit Load
3. Minimum SIP Amount
4. ELSS Lock-in Period
5. Riskometer
6. Benchmark
7. Capital Gains Statement Download
8. Mutual Fund Statement Download
9. NAV (Net Asset Value)
10. Growth vs Dividend Options
11. Flexi-Cap Fund
12. Large-Cap Fund
13. Fund Factsheet
14. KIM (Key Information Memorandum)
15. Key Dates for Investing
16. Systematic Transfer Plan (STP)
17. Debt Fund
18. Holding Period for Tax Purposes
19. Mutual Fund Value Calculation
20. KYC Requirements

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation Steps
```bash
# Clone or navigate to the project
cd mf-faq-assistant

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start the server
npm start
```

The server will start on `http://localhost:3000` (or specify PORT environment variable)

## Usage

### API Endpoint
**POST** `/query`

**Request Body:**
```json
{
  "query": "What is the expense ratio?"
}
```

**Response Example:**
```json
{
  "question": "What is the expense ratio?",
  "answer": "Expense Ratio is the annual cost of operating a mutual fund as a percentage...",
  "source": "What is Expense Ratio?",
  "sourceUrl": "https://www.amfiindia.com/research-and-reports/fact-sheets",
  "disclaimer": "Facts-only. No investment advice.",
  "lastUpdated": "Last updated from sources: 13/11/2025"
}
```

### Example Queries
- "What is the expense ratio?"
- "What is ELSS lock-in period?"
- "What is the exit load?"
- "How to download capital gains statement?"
- "What is a large-cap fund?"

### Query Refusal (Opinionated Questions)
The assistant **refuses** portfolio/investment advice queries and returns:
```json
{
  "answer": "I can only provide factual information about mutual fund schemes, not investment advice...",
  "type": "refusal",
  "disclaimer": "Facts-only. No investment advice."
}
```

### PII Protection
The assistant refuses queries containing personal information:
- PAN numbers
- Aadhaar numbers
- Account numbers
- OTPs
- Email addresses
- Phone numbers

## Technical Architecture

### Components
1. **Vector Store** (`src/rag/vectorStore.ts`)
   - In-memory semantic search using keyword matching
   - Similarity scoring for relevance ranking

2. **Retriever** (`src/rag/retriever.ts`)
   - Fetches top matching documents
   - Supports multi-document retrieval

3. **Handler** (`src/chatbot/handler.ts`)
   - Query validation and routing
   - PII detection
   - Opinion detection
   - Response orchestration

4. **Response Formatter** (`src/chatbot/responseFormatter.ts`)
   - Formats responses with citations
   - Adds disclaimers
   - Maintains consistency

5. **Disclaimer Manager** (`src/chatbot/disclaimerManager.ts`)
   - Manages fact-only disclaimer messaging

### Data Flow
```
User Query
    ↓
PII Check → Validation
    ↓
Opinion Check → Advisory Refusal
    ↓
Semantic Search (Vector Store)
    ↓
Top Match Retrieval
    ↓
Format with Citation + Disclaimer
    ↓
Response to User
```

## Source URLs

### Regulatory Bodies
| Source | URL |
|--------|-----|
| SEBI | https://www.sebi.gov.in/sebi_data/commondocs/ |
| AMFI | https://www.amfiindia.com/research-and-reports/ |

### AMC Sources
- HDFC Fund: https://www.hdfcfund.com/mutual-fund-schemes
- ICICI Prudential: https://www.icicipruamc.com/mutual-fund-schemes
- SBI Mutual Fund: https://www.sbimf.com/en-us/mutual-fund-schemes
- Axis Mutual Fund: https://www.axismf.com/mutual-fund-schemes
- Kotak Mutual Fund: https://www.kotakmutual.com/mutual-fund-schemes
- Franklin Templeton: https://www.franklintempletonindia.com/investor/mutual-fund-schemes
- Nippon India: https://www.nipponindiamf.com/mutual-fund-schemes
- UTI Mutual Fund: https://www.utimf.com/mutual-fund-schemes
- Mirae Asset: https://www.miraeassetmf.co.in/mutual-fund-schemes
- IDFC Mutual Fund: https://www.idfcmf.com/mutual-fund-schemes
- L&T Mutual Fund: https://www.ltfs.com/mutual-fund-schemes
- Sundaram Mutual: https://www.sundarammutual.com/mutual-fund-schemes
- Edelweiss Mutual Fund: https://www.edelweissmf.com/mutual-fund-schemes

## Known Limitations
⚠️ **No Performance Claims** - Does not compute or compare fund returns  
⚠️ **No Investment Advice** - Refuses portfolio/allocation queries  
⚠️ **Keyword-Based Search** - Uses simple similarity matching (not AI embeddings)  
⚠️ **Static Knowledge Base** - Requires manual updates for new information  
⚠️ **Basic PII Detection** - Pattern-based detection may miss edge cases  

## Testing
```bash
# Run the test suite
npx ts-node test-chatbot.ts
```

## Disclaimer
```
⚠️ Facts-only. No investment advice.

This assistant provides ONLY factual information about mutual fund schemes from official sources. 
It does NOT provide:
- Investment recommendations
- Portfolio advice
- Performance comparisons
- Financial planning guidance

For investment decisions, consult a qualified financial advisor.
```

## Files Structure
```
mf-faq-assistant/
├── src/
│   ├── index.ts                    # Express server setup
│   ├── chatbot/
│   │   ├── handler.ts              # Query handler & PII detection
│   │   ├── responseFormatter.ts    # Response formatting
│   │   └── disclaimerManager.ts    # Disclaimer management
│   ├── rag/
│   │   ├── vectorStore.ts          # In-memory semantic search
│   │   ├── retriever.ts            # Document retrieval
│   │   └── documentLoader.ts       # Document loading
│   ├── data/
│   │   └── faqData.ts              # FAQ knowledge base (20 topics)
│   ├── sources/
│   │   └── sourceMapper.ts         # Source URL mapping
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   └── config/
│       └── index.ts                # Configuration
├── data/
│   └── sources.json                # Source reference list
├── package.json
├── tsconfig.json
├── README.md
└── test-chatbot.ts                 # Testing script
```

## Future Enhancements
- Integration with vector databases (Pinecone, Weaviate)
- AI-powered embeddings (OpenAI, Hugging Face)
- Multi-language support
- Persistent caching for improved performance
- Integration with scheme comparison tools
- User query logging and analytics

## License
MIT

## Support
For issues or questions, refer to official sources:
- SEBI: https://www.sebi.gov.in
- AMFI: https://www.amfiindia.com
- Individual AMC websites