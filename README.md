# 📚 BookCourier

## 🔗 Live Site

👉 **Live URL:** [https://assignment-11-bc60e.web.app/](https://assignment-11-bc60e.web.app/)

---

## 🎯 Project Purpose

**BookCourier** is a modern library delivery management system that allows users to request book pickup or delivery from nearby libraries. It is designed for students, researchers, and readers who want to borrow or return books without physically visiting a library.

The platform connects **Readers**, **Librarians**, and **Admins** in a single system with role-based dashboards, secure authentication, and real-time order management.

---

## ✨ Key Features

### 🔑 Role-Based Access Control (RBAC) System

* Fully implemented **Multi-Role Website** architecture
* Three roles: **User (Reader)**, **Librarian**, **Admin**
* Separate dashboards, permissions & API access control
* Server-side role verification using **Firebase JWT tokens**
* Unauthorized users cannot access protected routes or data

---

### 💳 Payment System (Stripe)

* Secure online payment implemented using Stripe
* Users can pay for orders from Pay Now button
* Payment intent created securely from the server
* Stripe secret key protected using environment variables
* After successful payment:
* Payment status updates from unpaid → paid
* Transaction ID stored in database
* Invoice automatically generated
* Paid orders hide the Pay Now button

### 🧩 Advanced CRUD Operations (Core Feature)

* Full **Create, Read, Update, Delete** operations implemented
* Role-based CRUD access control (RBAC enforced)

**Admin CRUD Capabilities**

* Manage all users (Read / Update roles)
* Publish, unpublish & **delete books**
* Deleting a book automatically deletes all related orders

**Librarian CRUD Capabilities**

* Add new books to the system
* Edit book details (name, image, author, price, status)
* Publish / Unpublish books (soft control, no hard delete)
* Manage orders for their books

**User CRUD Capabilities**

* Create book orders
* Cancel pending orders
* Add / remove books from wishlist
* Create reviews & ratings (only for ordered books)

---

### 🔐 Authentication & Security

* Email & Password authentication using **Firebase**
* One social login (Google)
* Persistent login (no redirect on reload)
* Secure Firebase & MongoDB credentials via environment variables

---

### 🔐 Authentication & Security

* Email & Password authentication using **Firebase**
* One social login option (Google)
* Role-based protected routes (RBAC enforced from server)
* Firebase & MongoDB credentials secured using **Environment Variables**
* Logged-in users remain authenticated after page reload

---

### 🔐 Authentication & Security

* Email & Password authentication using **Firebase**
* One social login option (Google)
* Protected routes using **Firebase JWT token verification**
* Firebase & MongoDB credentials secured using **Environment Variables**
* Logged-in users remain authenticated after page reload

---

### 🏠 Public Pages

* Home page with banner slider (3+ slides)
* Latest Books section
* Coverage map (delivery areas)
* Why Choose BookCourier section
* All Books page with search & price sort
* Book Details page with order modal

---

### 🛒 Order & Payment System

* Place book orders via modal form
* Order status flow: `pending → shipped → delivered`
* Payment status: `unpaid → paid`
* Cancel pending orders only
* Automatic invoice generation

---

## 👤 User Dashboard

* **My Orders**

  * View order list with status
  * Cancel pending orders
  * Pay for pending orders

* **My Wishlist**

  * View all wishlisted books

* **Invoices**

  * Payment ID, amount, date & book name

* **My Profile**

  * View & update name and profile image

---

## 📚 Librarian Dashboard

* **Add Book**

  * Book name, image, author, price, status

* **My Books**

  * View & edit added books
  * Publish / Unpublish books

* **Orders**

  * View all orders for their books
  * Change order status: `pending → shipped → delivered`
  * Cancel orders

---

## 🛠 Admin Dashboard

* **All Users**

  * Make Admin / Librarian

* **Manage Books**

  * Publish / Unpublish books
  * Delete books (auto deletes related orders)

* **My Profile**

  * Update admin profile

---


## 🧩 Technologies Used

### Frontend
1. React – UI development
2. React Router – Client-side routing
3. Firebase – Authentication & JWT-based security
4. Tailwind CSS – Utility-first CSS framework
5. React Hook Form – Form handling & validation

### 📦 Special Dependencies
1. Axios – API communication
2. TanStack React Query – Data fetching, caching & revalidation
3. Framer Motion – Animations
4. React Awesome Reveal – Scroll-based animations
5. Swiper – Banner & slider components
6. React Icons – Icon library
7. SweetAlert2 – Alert & confirmation modals
8. React Toastify – Toast notifications
9. Recharts – Dashboard charts & graphs
10. Leaflet & React Leaflet – Map & coverage section

---

### Backend

* Node.js
* Express.js
* MongoDB
* Firebase Admin SDK
* JSON Web Token (JWT)
* CORS
* Dotenv

---

## 🎨 UI & UX Highlights

* Clean, recruiter-friendly & unique design
* Consistent color theme & typography
* Equal-height cards & grid layout
* Fully responsive (mobile, tablet, desktop)
* Collapsible dashboard sidebar

---

## 🔐 Environment Variables

### Client (.env)

````env
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_AUTH_DOMAIN
VITE_projectId=YOUR_PROJECT_ID
VITE_storageBucket=YOUR_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_SENDER_ID
VITE_appId=YOUR_APP_ID
````



## 📦 GitHub Repositories

* **Client Repo:** [https://github.com/mohammad-aftab-hossain-mozumder/BOOK-COURIER-ASSIGNMENT-11.git](https://github.com/mohammad-aftab-hossain-mozumder/BOOK-COURIER-ASSIGNMENT-11.git)
* **Server Repo:** [https://github.com/mohammad-aftab-hossain-mozumder/ASSIGNMENT-11-BOOK-COURIER-SERVER.git](https://github.com/mohammad-aftab-hossain-mozumder/ASSIGNMENT-11-BOOK-COURIER-SERVER.git)

---

## 👨‍💻 Admin Access (For Evaluation)

```
Admin Email: 123aftab@gmail.com
Admin Password: 123abcD
```

---

## Client Site Dependencies

This project uses the following npm packages:

| Package Name              | Version       | Description |
|---------------------------|---------------|-------------|
| @tailwindcss/vite         | ^4.1.17       | Tailwind CSS integration for Vite |
| @tanstack/react-query     | ^5.90.12      | Powerful data-fetching and caching library for React |
| axios                     | ^1.13.2       | Promise-based HTTP client |
| firebase                  | ^12.6.0       | Firebase SDK for authentication, database, and other services |
| framer-motion             | ^12.23.26     | Animation library for React |
| i                         | ^0.3.7        | CLI tool for package version management |
| leaflet                   | ^1.9.4        | Interactive maps library |
| npm                       | ^11.6.4       | Node package manager |
| react                     | ^19.2.0       | Core React library |
| react-awesome-reveal      | ^4.3.1        | Animation effects for React components |
| react-dom                 | ^19.2.0       | React DOM rendering library |
| react-hook-form           | ^7.68.0       | Form validation library for React |
| react-icons               | ^5.5.0        | Popular icons library for React |
| react-leaflet             | ^5.0.0-rc.2   | React wrapper for Leaflet maps |
| react-router              | ^7.10.1       | Routing library for React |
| react-toastify            | ^11.0.5       | Notification library for React |
| recharts                  | ^3.5.1        | Charting library for React |
| sweetalert2               | ^11.26.4      | Beautiful popup and alerts library |
| swiper                    | ^12.0.3       | Modern touch slider library |
| tailwindcss               | ^4.1.17       | Utility-first CSS framework |


---
