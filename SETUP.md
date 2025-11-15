# SETUP & DEPLOYMENT GUIDE
## Facts-Only MF Assistant

### Quick Start (5 minutes)

```bash
# 1. Navigate to project
cd mf-faq-assistant

# 2. Install dependencies
npm install

# 3. Build TypeScript
npm run build

# 4. Start server (port 3000)
npm start

# 5. Test the API
curl -X POST http://localhost:3000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the expense ratio?"}'
```

---

### Project Structure

```
mf-faq-assistant/
├── src/
│   ├── index.ts                    # Express server entry point
│   ├── chatbot/
│   │   ├── handler.ts              # Main query processing logic
│   │   ├── responseFormatter.ts    # Response formatting with citations
│   │   └── disclaimerManager.ts    # Disclaimer management
│   ├── rag/
│   │   ├── vectorStore.ts          # In-memory document store
│   │   ├── retriever.ts            # Semantic search retriever
│   │   └── documentLoader.ts       # Document loading (future)
│   ├── data/
│   │   └── faqData.ts              # FAQ knowledge base (20 topics)
│   ├── sources/
│   │   └── sourceMapper.ts         # Source mapping
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   └── config/
│       └── index.ts                # App configuration
├── dist/                           # Compiled JavaScript (after npm run build)
├── data/
│   └── sources.json                # Source URLs list
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── README.md                       # Full documentation
├── DISCLAIMER.md                   # Disclaimer snippets
├── SOURCES.csv                     # Source URLs (CSV format)
├── SAMPLE_QA.md                    # Sample Q&A examples
└── test-chatbot.ts                 # Testing script
```

---

### API Endpoints

#### 1. Welcome Endpoint
```
GET http://localhost:3000/

Response:
{
  "message": "Welcome to Facts-Only MF Assistant",
  "exampleQuestions": [...],
  "disclaimer": "⚠️ Facts-only. No investment advice."
}
```

#### 2. Query Endpoint (Main)
```
POST http://localhost:3000/query

Request Body:
{
  "query": "What is the expense ratio?"
}

Response:
{
  "question": "What is the expense ratio?",
  "answer": "Expense Ratio is the annual cost of operating...",
  "source": "What is Expense Ratio?",
  "sourceUrl": "https://www.amfiindia.com/...",
  "disclaimer": "Facts-only. No investment advice.",
  "lastUpdated": "Last updated from sources: 13/11/2025"
}
```

#### 3. Health Check
```
GET http://localhost:3000/health

Response:
{
  "status": "MF FAQ Assistant is running"
}
```

---

### Environment Variables

```bash
# Port configuration (default: 3000)
export PORT=3001

# Base API URL
export API_BASE_URL=http://localhost:3000

# AMC Source URLs
export AMC_SOURCE_URL=https://www.amfiindia.com
export SEBI_SOURCE_URL=https://www.sebi.gov.in
export AMFI_SOURCE_URL=https://www.amfiindia.com
```

---

### Configuration

Edit `src/config/index.ts`:

```typescript
export const config = {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    port: process.env.PORT || 3000,
    sources: {
        amc: process.env.AMC_SOURCE_URL || 'https://www.amfiindia.com',
        sebi: process.env.SEBI_SOURCE_URL || 'https://www.sebi.gov.in',
        amfi: process.env.AMFI_SOURCE_URL || 'https://www.amfiindia.com',
    },
    disclaimer: "Facts-only. No investment advice."
};
```

---

### Adding New FAQ Topics

Edit `src/data/faqData.ts`:

```typescript
export const faqKnowledgeBase: Document[] = [
    {
        id: "NEW_ID",
        title: "Your Question",
        content: "Your factual answer here...",
        sourceUrl: "https://official-source.com",
        category: "CATEGORY_NAME"
    },
    // ... more topics
];
```

---

### Testing

#### Run Test Suite
```bash
npx ts-node test-chatbot.ts
```

#### Manual Testing with curl
```bash
# Factual query
curl -X POST http://localhost:3000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is ELSS lock-in?"}'

# Advisory refusal
curl -X POST http://localhost:3000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Should I buy this fund?"}'

# PII detection
curl -X POST http://localhost:3000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "My PAN is ABCDE1234F"}'
```

#### Expected Responses

**Factual Query:**
```json
{
  "question": "What is ELSS lock-in?",
  "answer": "ELSS has a mandatory lock-in of 3 years...",
  "sourceUrl": "https://www.sebi.gov.in/...",
  "disclaimer": "Facts-only. No investment advice."
}
```

**Advisory Query:**
```json
{
  "answer": "I can only provide factual information...",
  "type": "refusal",
  "disclaimer": "Facts-only. No investment advice."
}
```

**PII Query:**
```json
{
  "error": "Please do not share personal information like PAN, Aadhaar...",
  "disclaimer": "Facts-only. No investment advice."
}
```

---

### Deployment

#### Local Development
```bash
npm start
# Runs on http://localhost:3000
```

#### Docker Deployment
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY tsconfig.json .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t mf-assistant .
docker run -p 3000:3000 mf-assistant
```

#### Production Build
```bash
# Build TypeScript
npm run build

# Run compiled code
node dist/index.js
```

---

### Monitoring & Logging

#### Current Logging
```typescript
console.log(`🚀 MF FAQ Assistant is running on http://localhost:${PORT}`);
console.log(`📚 Knowledge base loaded with 20 factual MF topics`);
```

#### Add Error Logging (Optional)
```typescript
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});
```

---

### Performance Tips

1. **Vector Store Optimization**
   - Current: In-memory keyword matching
   - Future: Use embedding vectors (OpenAI, Hugging Face)

2. **Caching**
   - Add Redis for frequently asked questions
   - Cache results for 24 hours

3. **Rate Limiting**
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   
   app.use('/query', limiter);
   ```

---

### Troubleshooting

#### Port Already in Use
```bash
# Use different port
export PORT=3001
npm start

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

#### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Compilation Errors
```bash
# Check TypeScript version
npm list typescript

# Recompile
npm run build

# View errors
npm run build -- --listFiles
```

---

### Updating Knowledge Base

To add new topics:

1. Add to `faqKnowledgeBase` in `src/data/faqData.ts`
2. Include source URL from SEBI/AMFI/AMC
3. Rebuild: `npm run build`
4. Test the new query
5. Restart: `npm start`

---

### Integration Points

#### Frontend Integration
```javascript
// Example: React/Vue integration
const response = await fetch('http://localhost:3000/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: userQuestion })
});
const data = await response.json();
console.log(data.answer);
```

#### Third-party Integration
- Slack Bot: Webhook integration
- WhatsApp: Twilio/Business API
- Website: Embedded chatbot widget
- Groww App: Native SDK integration

---

### Key Files to Know

| File | Purpose | Edit When |
|------|---------|-----------|
| `src/index.ts` | Server setup | Changing endpoints |
| `src/chatbot/handler.ts` | Query logic | Adding PII patterns |
| `src/data/faqData.ts` | FAQ content | Adding new topics |
| `src/rag/vectorStore.ts` | Search logic | Improving similarity |
| `package.json` | Dependencies | Adding libraries |

---

### Common Commands

```bash
# Development
npm start                  # Start dev server
npm run build             # Compile TypeScript
npx ts-node test-chatbot.ts  # Run tests

# Production
npm run build
NODE_ENV=production node dist/index.js

# Maintenance
npm update                # Update dependencies
npm audit                 # Check vulnerabilities
npm audit fix             # Fix vulnerabilities
```

---

### Support & Resources

- **SEBI**: https://www.sebi.gov.in
- **AMFI**: https://www.amfiindia.com
- **Node.js Docs**: https://nodejs.org/docs/
- **Express Docs**: https://expressjs.com/
- **TypeScript Docs**: https://www.typescriptlang.org/docs/

---

### Version History

- **v1.0.0** (13/11/2025) - Initial release with 20 FAQ topics
  - Facts-only query handling
  - PII detection
  - Advisory refusal
  - Citation-backed responses
