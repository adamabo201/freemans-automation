# Freemans Automation (Puppeteer + TypeScript)

## 📌 Overview
This project automates the Freemans website checkout flow using Puppeteer (TypeScript).  
It also logs all form interactions (selectors, properties, values, timestamps) into a SQLite database.  

The deliverables include:
- Puppeteer automation script (`src/index.ts`)
- SQLite database (`form_selectors.sqlite`)
- SQL queries file (`queries.sql`)
- Setup & run instructions

---

## 🚀 Features
- Opens Freemans.com
- Accepts cookies automatically
- Searches for a product (`dress`)
- Selects first product + valid size
- Adds to bag & proceeds to checkout
- Fills "About You" form (name, address, DOB, email, password, phone)
- Handles delivery options & payment selection
- Logs all form actions to SQLite
- Stops safely before making real payment

---

## 🛠️ Setup

### 1. Clone repo
```sh
git clone <your-repo-url>
cd revolve-automation
