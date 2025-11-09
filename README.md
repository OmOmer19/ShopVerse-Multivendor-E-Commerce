# ShopVerse - a Multi-Vendor E-Commerce Platform

## Introduction
ShopVerse is a modern multi-vendor e-commerce platform built with React. It allows multiple vendors to register, manage their products, and track orders, while users can browse, add items to their cart, and place orders seamlessly. The app solves the problem of managing multiple sellers in one storefront and provides an intuitive interface for both vendors and users.

## Project Type
Frontend

## Deployed App
Frontend:

## Directory Structure
multi-vendor-e-commerce/
src/
├─ components/
│  ├─ CheckoutPage.jsx
│  ├─ Footer.jsx
│  ├─ Header.jsx
│  ├─ InventoryTable.jsx
│  ├─ ProductCard.jsx
│  ├─ RoleSelection.jsx
│  ├─ UserOrders.jsx
│  ├─ UserSignIn.jsx
│  ├─ VendorLogin.jsx
│  ├─ VendorOrders.jsx
│  ├─ VendorProducts.jsx
│  └─ VendorProfile.jsx
├─ context/
│  ├─ CartContext.jsx
│  └─ VendorAuthContext.jsx
├─ pages/
│  ├─ Cart.jsx
│  ├─ Home.jsx
│  ├─ VendorDashboard.jsx
│  ├─ VendorDetails.jsx
│  └─ VendorPage.jsx
├─ utils/
│  ├─ mapVendorToProducts.js
│  └─ vendors.js
├─ app.css
├─ index.css
├─ App.jsx
├─ main.jsx
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js

## Features 
- Multi-vendor registration and authentication
- Vendor dashboard for managing products and orders
- Product listing fetched dynamically from [Fake Store API](https://fakestoreapi.com/products)
-  add to cart functionality for users
- User cart management and order placement
- Order confirmation and history views for users and vendors

## Design Decisions or Assumptions
- Used React Context and useReducer for global state management (cart and vendor auth)
- LocalStorage used for persisting vendor login state
- Products are fetched dynamically from the public Fake Store API instead of hardcoding
- Unique IDs for products generated using timestamp (Date.now())
- Demo vendors and products are hardcoded in utils for simplicity
- No backend API yet, all data handled on frontend (can be extended in future)

## APIs Used
- [Fake Store API](https://fakestoreapi.com/products) for product data

## Installation & Getting Started
 clone the repository:
 ````bash
 git clone https://github.com/OmOmer19/Project-1.git

 cd multi-vendor-e-commerce
 npm install
 npm run dev

## Usage
- Browse products on the homepage.
- Sign in as a user or login as  vendor(only fixed vendors can login as this is demo data) via the Role Selection page.
- Users can add products to their cart, view cart, and place orders.
- Vendors can log in to manage products and view orders.
- Products are dynamically fetched from the Fake Store API.

## Credentials 

Vendor Demo Accounts:
1- Email- shop@vendor.com, Password- shop@123
2- Email- mega@vendor.com, Password- mega@123
3- Email- elite@vendor.com, Password- elite@123
4- Email- global@vendor.com, Password- global@123

User Demo Account:
- Email: user@example.com
- Password: password123
and any other that anyone can do 

## Technology Stack
- React.js (Vite)
- React Router
- React Context API & useReducer
- Fake Store API (for product data)
- Tailwind CSS (for styling)
- Lucide-react (icons)

## API Endpoints
- No backend APIs yet.
- Product data fetched from [Fake Store API](https://fakestoreapi.com/products).