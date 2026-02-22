# Budget App

## Overview

Upload CSV / PDF bank / CC statements to save them securely, store your balances, categorize transactions, budget your expenses, and assist with your financial goals.

## Problem Statement

Most budgeting apps are bloated, expensive, and rely on broken third-party connections. This app relys soley on CSV / PDF files to import your transactions. So you're forced to log into your bank every month — something you should always be doing.

## Target Users

Individuals who want to track their finances and build better habits.

## Core Features

- Files stored flatly, but rendered nested in a tree structure YYYY / MM / file.{csv,pdf}
- AI detections of Bank Statements to map balances, transactions, and categories
- Visualize your portfolio and spendings over time
- Categorize transactions and see how much you're fitting in your budget
- Extract and store as much metadata as possible from the files
  - Checking balances:
    - Account name
    - Account type (checking, savings, credit card, loan, mortgage, other)
    - Account balance
    - Account transactions
  - Credit Card balances:
    - Account name
    - Account type (credit card)
    - Interest rate
    - Account balance
    - Account transactions

## Tech Stack

- Bun + Vite
- Vue 3 (Options API focused)
- TypeScript
- Pinia
- Tailwind CSS
- Lucid Icons
- Firebase
- Vercel AI SDK (User brings their own Model + API Key)
- ./viper = DataViz library (if you want something not in it, tell me and I'll add it!)

## Architecture

Monorepo structure with packages/

- packages/app
- packages/functions (for AI, Firebase, etc.)

## Project Status

- MVP:
  - [ ] Files stored flatly, but rendered nested in a tree structure YYYY / MM / file.{csv,pdf}
  - [ ] On new file upload, AI detections of Bank Statements to map balances, transactions, and categories
  - Start with a single page that allows view of everything
  - [ ] Visualize your portfolio and spendings over time (line charts pie charts)
  - [ ] Categorize transactions and see how much you're fitting in your budget

## Roadmap

- [ ] MVP Launch

## Out of Scope

- Upgrade front-end to Capacitor for mobile app
