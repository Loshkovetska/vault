Vault – Fintech Mobile Application

Overview

Vault is a fintech mobile application built with React Native that simulates the core functionality of a modern digital wallet. The application demonstrates end-to-end financial workflows including wallet management, virtual cards, payments, QR code transactions, transaction history, promotions, and analytics.

The project was built as a portfolio application to showcase scalable architecture, Firebase integration, and production-oriented mobile development practices.

⸻

Features

Authentication

- Email & Password authentication
- Google Sign-In
- Firebase Authentication
- Secure user session management

Virtual Card

- Automatically generated virtual card
- Card details
- Daily spending limits
- PIN management
- Card status management

Transactions

- Transaction history
- Transaction details
- Transaction statuses
- Multiple transaction types:
  - Top Up
  - Transfer
  - Withdraw
  - Bill Payment
  - Refund

QR Payments

- QR code scanner
- Merchant payments
- Dynamic payment creation
- Real-time transaction updates

Bill Payments

- Electricity
- Water
- Internet
- Mobile/Data
- Insurance
- E-commerce

Promotions

- Promotional offers
- Cashback simulation
- Rewards

Analytics

- Spending overview
- Monthly statistics
- Expense visualization

Notifications

- Real-time in-app notifications using Firestore listeners

⸻

Tech Stack

Mobile

- React Native
- TypeScript
- React Navigation
- React Hook Form
- Zod
- Redux Tool Kit
- React Native Unistyles

Backend

- Firebase Authentication
- Cloud Firestore

Architecture

- Feature-based folder structure
- Repository pattern
- Custom hooks
- Type-safe models
- Firebase service layer

⸻

Main User Flows

Authentication

- Register
- Login
- Google Sign-In
- Logout

Wallet

- View balance
- Top up
- Withdraw
- Transfer funds
- Activity demonstrated via charts

Payments

- QR merchant payment
- Bill payment
- Refund
- View transaction details

Cards

- Generate virtual card
- View card details

⸻

Firebase

The application uses Firebase for:

- User Authentication
- Firestore Database
- Real-time updates

⸻

Running the Project

Install dependencies

npm install

iOS

cd ios
pod install
npm run ios

Android

npm run android

⸻

Environment Variables

Create a .env file in the project root.

Example:

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
API_URL=
