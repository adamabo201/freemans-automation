# Freemans Automation (Puppeteer + TypeScript)

## 📌 Overview
This project automates the checkout flow on **Freemans.com** using Puppeteer (TypeScript).  
All form interactions (selectors, properties, values, timestamps) are logged into a SQLite database for later analysis.  

Deliverables include:
- Puppeteer automation script (`src/index.ts`)
- SQLite database (`form_selectors.sqlite`)
- SQL queries file (`queries.sql`)
- Setup & run instructions

---

## 🚀 Features
- Launches **Freemans.com** in a Chromium browser
- Handles cookie banner immediately:
  - Clicks **Accept All** if visible  
  - Otherwise, clicks **Only Necessary Cookies**
- Searches for a product (`dress`)
- Selects first product + valid size
- Adds item to bag & navigates to checkout
- Continues as guest
- Fills **About You** form:
  - Title, First & Last Name  
  - Address (house no., street, city, postcode)  
  - Phone number, Date of Birth  
  - Email + Confirm Email  
  - Password + Confirm Password  
- Selects **Delivery Options** (safe place = Garage)
- Selects **Payment Method** (Pay Now with Card)
- Fills test credit card details (Visa test number)
- Logs every action into SQLite
- Stops before making a real payment

---

## 🛠️ Setup

### 1. Clone the repository
```sh
git clone https://github.com/adamabo201/freemans-automation.git
cd freemans-automation

2. Install dependencies
npm install

3. Run the script
npm run dev
