# WriteOff (working title) — Income & Write‑Off Tracker

Mobile‑first web app for people with cash-heavy jobs and multiple income streams to log income, capture receipts, auto‑categorize expenses, surface potential write‑offs, and export a tax‑ready package. The MVP centers on four tabs: **Dashboard**, **Income**, **Expenses**, and **Taxes**, plus **History** views for both income and expenses.  

> Prototype includes screens for Dashboard totals, income flows (cash/check/digital), expense flows (scan/manual), Taxes summary/write‑offs, and history lists with bottom navigation. 

---

## Features (MVP)
- One‑tap cash/tip logging; check deposit (scan) and bank/digital import stubs.  
- Receipt capture with OCR + AI‑assisted categorization and deductible suggestions (rules first, ML later). Auto‑accept ≥ 0.85 confidence. 
- Dashboard with yearly income, expenses, and potential tax savings cards. 
- Taxes view with YTD summary, possible write‑offs, and export to CSV/XLSX/QuickBooks‑ready CSV. 
- Offline‑first posture, secure storage, privacy defaults (scaffolded at MVP). 
- Estimated tax calculator stub + quarterly reminder hook. 

**Backlog highlights:** manual mileage tracking, Plaid adapter, tagging rules editor, CPA sharing link; future: auto‑mileage, ML OCR corrections, concierge CPA. 

---

## Tech Stack
- **Next.js (App Router) + React + TypeScript**
- **Tailwind CSS** and **shadcn/ui** for components; **lucide-react** for icons.
- **Zod** for request validation; **Drizzle or Prisma** for models (SQLite in dev).
- Testing with **Vitest/Jest** + **Playwright** (e2e).

---

## Monorepo Layout (suggested)
