# Sample Q&A - Facts-Only MF Assistant

## Query 1: Expense Ratio Explanation

**User Query:**
> What is the expense ratio?

**Assistant Response:**
```json
{
  "question": "What is the expense ratio?",
  "answer": "Expense Ratio is the annual cost of operating a mutual fund as a percentage of the fund's average assets under management (AUM). It includes management fees, administrative costs, and other fund operating expenses. For example, an expense ratio of 0.5% means you pay ₹0.50 per ₹100 invested annually.",
  "source": "What is Expense Ratio?",
  "sourceUrl": "https://www.amfiindia.com/research-and-reports/fact-sheets",
  "disclaimer": "Facts-only. No investment advice.",
  "lastUpdated": "Last updated from sources: 13/11/2025"
}
```

---

## Query 2: ELSS Lock-in Period

**User Query:**
> What is ELSS lock-in period?

**Assistant Response:**
```json
{
  "question": "What is ELSS lock-in period?",
  "answer": "ELSS (Equity Linked Saving Scheme) has a mandatory lock-in period of 3 years from the date of investment. During this period, you cannot redeem your units. This lock-in is a regulatory requirement for ELSS funds under Section 80C of the Income Tax Act.",
  "source": "What is ELSS Lock-in Period?",
  "sourceUrl": "https://www.sebi.gov.in/sebi_data/commondocs/elss-regulations",
  "disclaimer": "Facts-only. No investment advice.",
  "lastUpdated": "Last updated from sources: 13/11/2025"
}
```

---

## Query 3: Exit Load Definition

**User Query:**
> What is the exit load?

**Assistant Response:**
```json
{
  "question": "What is the exit load?",
  "answer": "Exit Load is a charge levied by mutual funds when you sell or redeem your units before a specified period. It is typically expressed as a percentage of the net asset value (NAV) of the units being redeemed. For example, if exit load is 1%, you lose 1% of your redemption value.",
  "source": "What is Exit Load?",
  "sourceUrl": "https://www.sebi.gov.in/sebi_data/commondocs/exit-load-guidelines",
  "disclaimer": "Facts-only. No investment advice.",
  "lastUpdated": "Last updated from sources: 13/11/2025"
}
```

---

## Query 4: How to Download Capital Gains Statement

**User Query:**
> How to download capital gains statement?

**Assistant Response:**
```json
{
  "question": "How to download capital gains statement?",
  "answer": "To download your capital gains statement: 1) Log into your mutual fund account through the AMC or distributor portal, 2) Navigate to 'Tax Documents' or 'Reports' section, 3) Select the financial year, 4) Download the capital gains statement in PDF format. Most AMCs provide this before March 31st each year.",
  "source": "How to Download Capital Gains Statement?",
  "sourceUrl": "https://www.amfiindia.com/research-and-reports/tax-documentation-guide",
  "disclaimer": "Facts-only. No investment advice.",
  "lastUpdated": "Last updated from sources: 13/11/2025"
}
```

---

## Query 5: Large-Cap Fund Explanation

**User Query:**
> What is a large-cap fund?

**Assistant Response:**
```json
{
  "question": "What is a large-cap fund?",
  "answer": "A Large-Cap fund invests primarily in stocks of large companies (typically top 100 companies by market capitalization). Large-cap funds are generally less volatile and considered suitable for conservative investors, though they may offer moderate growth potential.",
  "source": "What is a Large-Cap Fund?",
  "sourceUrl": "https://www.sebi.gov.in/sebi_data/commondocs/large-cap-guidelines",
  "disclaimer": "Facts-only. No investment advice.",
  "lastUpdated": "Last updated from sources: 13/11/2025"
}
```

---

## Query 6: Riskometer Explanation

**User Query:**
> What is riskometer?

**Assistant Response:**
```json
{
  "question": "What is riskometer?",
  "answer": "Riskometer is a visual representation of the risk level of a mutual fund scheme. It ranges from 'Low' to 'Very High' risk categories. Equity funds typically have higher risk ratings than debt funds. The riskometer helps investors understand the volatility and potential loss exposure of the fund.",
  "source": "What is Riskometer?",
  "sourceUrl": "https://www.sebi.gov.in/sebi_data/commondocs/riskometer-guidelines",
  "disclaimer": "Facts-only. No investment advice.",
  "lastUpdated": "Last updated from sources: 13/11/2025"
}
```

---

## Query 7: NAV (Net Asset Value)

**User Query:**
> What is NAV?

**Assistant Response:**
```json
{
  "question": "What is NAV?",
  "answer": "NAV is the per-unit price of a mutual fund scheme calculated as: (Total Assets - Total Liabilities) / Total Number of Units Outstanding. NAV is calculated daily after market close and is used to determine the price at which you buy or sell fund units.",
  "source": "What is NAV (Net Asset Value)?",
  "sourceUrl": "https://www.sebi.gov.in/sebi_data/commondocs/nav-calculation-guidelines",
  "disclaimer": "Facts-only. No investment advice.",
  "lastUpdated": "Last updated from sources: 13/11/2025"
}
```

---

## Query 8: Investment Advice Refusal (Advisory Question)

**User Query:**
> Should I invest in this fund?

**Assistant Response:**
```json
{
  "answer": "I can only provide factual information about mutual fund schemes, not investment advice or comparisons.\n\nYour question: \"Should I invest in this fund?\"\n\nPlease check:\n- Official AMC factsheets\n- SEBI guidelines\n- AMFI resources\n\n⚠️  Facts-only. No investment advice.",
  "type": "refusal",
  "disclaimer": "Facts-only. No investment advice."
}
```

---

## Query 9: Performance Comparison Refusal

**User Query:**
> Which fund has the best performance?

**Assistant Response:**
```json
{
  "answer": "I can only provide factual information about mutual fund schemes, not investment advice or comparisons.\n\nYour question: \"Which fund has the best performance?\"\n\nPlease check:\n- Official AMC factsheets\n- SEBI guidelines\n- AMFI resources\n\n⚠️  Facts-only. No investment advice.",
  "type": "refusal",
  "disclaimer": "Facts-only. No investment advice."
}
```

---

## Query 10: KIM (Key Information Memorandum)

**User Query:**
> What is KIM?

**Assistant Response:**
```json
{
  "question": "What is KIM?",
  "answer": "KIM is a simplified document that provides essential information about a mutual fund scheme in plain language. It includes scheme objectives, features, risks, costs, and historical performance. KIM must be provided to all investors before they invest.",
  "source": "What is KIM (Key Information Memorandum)?",
  "sourceUrl": "https://www.sebi.gov.in/sebi_data/commondocs/kim-guidelines",
  "disclaimer": "Facts-only. No investment advice.",
  "lastUpdated": "Last updated from sources: 13/11/2025"
}
```

---

## Test Results Summary

| Query # | Query Type | Status | Notes |
|---------|-----------|--------|-------|
| 1 | Factual (Expense Ratio) | ✅ PASSED | Correct answer with source |
| 2 | Factual (ELSS Lock-in) | ✅ PASSED | Correct answer with source |
| 3 | Factual (Exit Load) | ✅ PASSED | Correct answer with source |
| 4 | Factual (Tax Documents) | ✅ PASSED | Correct answer with source |
| 5 | Factual (Fund Type) | ✅ PASSED | Correct answer with source |
| 6 | Factual (Riskometer) | ✅ PASSED | Correct answer with source |
| 7 | Factual (NAV) | ✅ PASSED | Correct answer with source |
| 8 | Advisory Refusal | ✅ PASSED | Polite refusal with disclaimer |
| 9 | Advisory Refusal | ✅ PASSED | Polite refusal with disclaimer |
| 10 | Factual (KIM) | ✅ PASSED | Correct answer with source |

---

## Key Observations

1. **Factual Queries**: All factual queries are answered correctly with relevant source links from official SEBI and AMFI sources.

2. **Advisory Refusal**: Portfolio/investment advice queries are properly detected and refused with a polite message directing users to official resources.

3. **Citation Accuracy**: Every response includes a proper source URL and topic title for verification.

4. **Disclaimer Consistency**: All responses include the "Facts-only. No investment advice." disclaimer.

5. **Answer Brevity**: Answers are kept concise (typically 2-3 sentences) as per requirements.

6. **Last Updated Timestamp**: Each response includes the date of last update from sources.

---

## Disclaimer Notice

```
⚠️ FACTS-ONLY. NO INVESTMENT ADVICE.

This assistant provides ONLY factual information about mutual fund schemes from official SEBI, AMFI, 
and AMC sources. 

It does NOT provide:
- Investment recommendations
- Portfolio advice
- Performance comparisons
- Financial planning guidance
- Buy/sell suggestions

For any investment decisions, consult a qualified financial advisor or refer to official sources:
- SEBI: https://www.sebi.gov.in
- AMFI: https://www.amfiindia.com
- Your AMC website
```
