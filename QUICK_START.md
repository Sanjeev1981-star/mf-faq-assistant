# Quick Reference - Facts-Only MF Assistant

## 🚀 Start Here (30 seconds)

```bash
cd mf-faq-assistant
npm install && npm run build && npm start
# Server on http://localhost:3000
```

---

## 📝 Example Queries

### Factual Questions (✅ Answered)
```
"What is the expense ratio?"
"What is ELSS lock-in period?"
"What is the exit load?"
"How to download capital gains statement?"
"What is NAV?"
```

### Advisory Questions (❌ Refused)
```
"Should I invest in this fund?"
"Which fund has best performance?"
"Compare these two funds"
"Is this fund good for me?"
```

---

## 🔌 API Usage

```bash
# Request
curl -X POST http://localhost:3000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the expense ratio?"}'

# Response
{
  "question": "What is the expense ratio?",
  "answer": "Expense Ratio is the annual cost...",
  "sourceUrl": "https://www.amfiindia.com/...",
  "disclaimer": "Facts-only. No investment advice.",
  "lastUpdated": "Last updated from sources: 13/11/2025"
}
```

---

## 📚 Knowledge Base (20 Topics)

1. Expense Ratio
2. Exit Load
3. Minimum SIP
4. ELSS Lock-in
5. Riskometer
6. Benchmark
7. Capital Gains Statement
8. Fund Statement
9. NAV
10. Growth vs Dividend
11. Flexi-Cap Fund
12. Large-Cap Fund
13. Factsheet
14. KIM
15. Key Dates
16. STP
17. Debt Fund
18. Tax Holding Period
19. Fund Valuation
20. KYC Requirements

---

## 🔐 Safety Features

- ✅ Refuses PII (PAN, Aadhaar, accounts, OTPs, emails, phones)
- ✅ Refuses investment advice
- ✅ No data storage
- ✅ Citation links on every answer
- ✅ Facts-only disclaimer always shown

---

## 📋 Key Files

| File | Purpose |
|------|---------|
| `src/chatbot/handler.ts` | Query processing |
| `src/data/faqData.ts` | 20 FAQ topics |
| `src/rag/vectorStore.ts` | Search engine |
| `README.md` | Full documentation |
| `SAMPLE_QA.md` | 10 example Q&A |
| `DISCLAIMER.md` | Disclaimer text |
| `SOURCES.csv` | 25 source URLs |

---

## 🧪 Test

```bash
npx ts-node test-chatbot.ts
# Runs 10 test queries (all pass ✅)
```

---

## 🌐 Sources (25 Total)

**Regulatory:**
- SEBI: https://www.sebi.gov.in
- AMFI: https://www.amfiindia.com

**AMCs (13):**
- HDFC, ICICI, SBI, Axis, Kotak
- Franklin Templeton, Nippon, UTI
- Mirae, IDFC, L&T, Sundaram, Edelweiss

---

## 📦 Deliverables

✅ Working prototype (TypeScript + Express)  
✅ Source list (CSV with 25 URLs)  
✅ README (setup + architecture)  
✅ Sample Q&A (10 examples)  
✅ Disclaimer (6 formats)  
✅ Test suite (all passing)  

---

## ⚙️ Environment

- Node.js v14+
- npm or yarn
- Port: 3000 (configurable)

---

## 🎯 What It Does

✅ Answers factual MF questions  
✅ Provides citation links  
✅ Refuses investment advice  
✅ Protects PII  
✅ Shows factual disclaimer  

---

## ❌ What It Doesn't Do

❌ Give investment advice  
❌ Compare fund performance  
❌ Store personal data  
❌ Make predictions  
❌ Recommend portfolios  

---

## 🔗 Resources

- **SEBI**: https://www.sebi.gov.in
- **AMFI**: https://www.amfiindia.com
- **Docs**: See README.md

---

**Ready to use! 🚀**
