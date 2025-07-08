# 🛒 MERN Green Cart

An advanced, full-stack **E-Commerce Web App** built with the MERN stack, supporting both **Admin/Seller** and **User** flows including product management, secure authentication, cart functionality, and payments using **Stripe**.

🌐 **Live Preview:**  
[https://mern-green-cart-app-frontend.vercel.app](https://mern-green-cart-app-frontend.vercel.app)

---

## 📦 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Axios, React Hot Toast
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** Secure Cookie-based Sessions
- **Image Hosting:** Cloudinary
- **Payments:** Stripe Integration
- **State Management:** React Context API

---

## 🔐 Authentication

- Secure login/logout using **HttpOnly** session cookies.
- Role-based access control for **Users** and **Sellers**.
- Protected routes with middleware: `userAuth`, `sellerAuth`.

---

## 👤 User Features

- ✅ Register / Login / Logout
- ✅ Browse products by **category** (e.g., Vegetables, Drinks)
- ✅ Add / Remove products from cart
- ✅ View cart summary and place orders
- ✅ Order via **Cash on Delivery (COD)** or **Stripe Payment**
- ✅ View past orders with status (Paid / Pending)

---

## 🛍️ Seller / Admin Features

- ✅ Login / Logout
- ✅ Add new products with Cloudinary image upload
- ✅ Toggle product stock using a switch button
- ✅ View all user orders (with payment method & shipping address)
- ✅ Admin dashboard ready (can be extended with charts and analytics)

---

## 💳 Stripe Integration

- Stripe Checkout dynamically calculates total with 2% tax.
- Metadata links payment intent to order/user.
- Stripe Webhooks handle:
  - `payment_intent.succeeded` → mark order paid & clear cart
  - `payment_intent.payment_failed` → delete unpaid order

---

## 🖼️ Cloudinary Integration

- Products are uploaded via Cloudinary REST API.
- Responsive image URLs are stored in the MongoDB database.
- Image optimization handled automatically by Cloudinary.

---

## 🚀 Getting Started

### 📁 Clone the Repository

```bash
# 1.Clont The Repo
git clone https://github.com/syedthedev/mern-green-cart-app.git
cd mern-green-cart-app
# 2. Backend
cd Server
npm install
# 3. Front
cd Client
npm run dev
