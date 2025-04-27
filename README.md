Event Cashless Payment Solution

1. Introduction

The Event Cashless Payment Solution is a mobile-based application designed to enhance the payment experience at events such as food festivals, concerts, and markets.
The system allows vendors to easily create QR codes linked to their profiles, enabling customers to make instant payments.
By removing the need for wallet preloads and complex setups, the system ensures fast, secure, and seamless transactions for both vendors and customers.


2. Problem Statement

At events, managing cash transactions is often inconvenient, time-consuming, and risky.
Many existing digital payment solutions require customers to preload funds into a wallet or create detailed accounts, which can be cumbersome and deter usage.
There is a strong need for a lightweight, QR code-based solution that facilitates instant digital payments without complicated onboarding processes.

3. Project Goals

The main objectives of this project are:
	•	To enable vendors to generate QR codes that customers can scan to make immediate payments.
	•	To allow customers to pay seamlessly without the need to preload funds or create complex accounts.
	•	To provide intuitive dashboards for both customers and vendors to track transactions and earnings.
	•	To ensure secure and real-time data handling using modern technologies.

 4. Features

The system offers the following features:
	•	Vendor registration and profile management.
	•	QR code generation for vendors to accept payments.
	•	Customer registration, login, and QR code scanning for payments.
	•	Secure payment processing using Stripe API.
	•	Transaction history tracking for both vendors and customers.
	•	Role-based authentication using Firebase.

 The system is built using the following technologies:
	•	Frontend: React Native for cross-platform mobile development.
	•	Backend and Database: Firebase Firestore for real-time database management.
	•	Authentication: Firebase Authentication for secure login and role-based access.
	•	Payment Gateway: Stripe API for payment processing.
	•	QR Code Generation: Integrated through third-party libraries in React Native.
	•	Cloud Storage: Firebase Storage for storing user profile images if needed.

 6. Installation and Setup

To run the project locally, follow these steps:
	1.	Clone the repository
  
  2. Navigate to the project directory and install dependencies:
  npm install

  3.	Set up Firebase project credentials and Stripe API keys.
  
  4.  Start the application using:
  npx expo start
 
