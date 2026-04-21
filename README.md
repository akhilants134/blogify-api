# Blogify API

> RESTful API for a modern blogging platform

![Node.js](https://img.shields.io/badge/Node.js-v18-green)
![Express](https://img.shields.io/badge/Express-v4-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

**Live Demo:** [https://blogify-api-1-0fck.onrender.com](https://blogify-api-1-0fck.onrender.com)

---

## 📖 Description

Blogify API is a robust, production-ready RESTful API for a blogging platform. It supports user authentication, secure CRUD operations for blog posts, image uploads, and payment processing. Built with Node.js, Express, MongoDB, and JWT, it’s designed for scalability and security.

---

## 🚀 Features

- User registration and authentication (JWT)
- CRUD operations for blog posts
- Secure password hashing with bcrypt
- File uploads to Cloudinary
- Payment processing with Stripe
- Order management system
- MongoDB Atlas cloud database
- Input validation and error handling
- RESTful API design

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens), bcrypt
- **File Storage:** Cloudinary
- **Payment Processing:** Stripe
- **Deployment:** Render, MongoDB Atlas

---

## ⚙️ Prerequisites

- Node.js v18+
- npm
- MongoDB Atlas account
- Cloudinary account
- Stripe account

---

## 🏗️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/blogify-api.git
   cd blogify-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables (replace with your actual values):

     ```env
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development

     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret

     STRIPE_SECRET_KEY=sk_test_...
     STRIPE_PUBLISHABLE_KEY=pk_test_...
     ```

4. **Run the server:**
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:3000`.

---

## 🔑 Environment Variables

| Variable               | Description                          | Example Value     |
| ---------------------- | ------------------------------------ | ----------------- |
| PORT                   | Server port                          | 3000              |
| MONGODB_URI            | MongoDB connection string            | mongodb+srv://... |
| JWT_SECRET             | JWT secret key                       | your_jwt_secret   |
| NODE_ENV               | Environment (development/production) | development       |
| CLOUDINARY_CLOUD_NAME  | Cloudinary cloud name                | your_cloud_name   |
| CLOUDINARY_API_KEY     | Cloudinary API key                   | your_api_key      |
| CLOUDINARY_API_SECRET  | Cloudinary API secret                | your_api_secret   |
| STRIPE_SECRET_KEY      | Stripe secret key                    | sk*test*...       |
| STRIPE_PUBLISHABLE_KEY | Stripe publishable key               | pk*test*...       |

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | No            |
| POST   | `/api/auth/login`    | User login        | No            |

### User

| Method | Endpoint       | Description              | Auth Required |
| ------ | -------------- | ------------------------ | ------------- |
| GET    | `/api/profile` | Get current user profile | Yes           |
| PATCH  | `/api/profile` | Update user profile      | Yes           |

### Posts

| Method | Endpoint         | Description               | Auth Required |
| ------ | ---------------- | ------------------------- | ------------- |
| GET    | `/api/posts`     | Get all blog posts        | No            |
| GET    | `/api/posts/:id` | Get single post by ID     | No            |
| POST   | `/api/posts`     | Create new post           | Yes           |
| PATCH  | `/api/posts/:id` | Update post (author only) | Yes           |
| DELETE | `/api/posts/:id` | Delete post (author only) | Yes           |

### File Upload

| Method | Endpoint      | Description                | Auth Required |
| ------ | ------------- | -------------------------- | ------------- |
| POST   | `/api/upload` | Upload image to Cloudinary | Yes           |

### Payments

| Method | Endpoint                              | Description           | Auth Required |
| ------ | ------------------------------------- | --------------------- | ------------- |
| POST   | `/api/payments/create-payment-intent` | Create Stripe payment | Yes           |
| POST   | `/api/payments/confirm-payment`       | Confirm payment       | Yes           |

### Orders

| Method | Endpoint                | Description       | Auth Required |
| ------ | ----------------------- | ----------------- | ------------- |
| POST   | `/api/orders`           | Create order      | Yes           |
| GET    | `/api/orders/my-orders` | Get user orders   | Yes           |
| GET    | `/api/orders/:id`       | Get order details | Yes           |

---

## 🧪 Usage Examples

### Register User

```bash
curl -X POST http://localhost:3000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"username":"john","email":"john@example.com","password":"password123"}'
```

### Create Post

```bash
curl -X POST http://localhost:3000/api/posts \
	-H "Authorization: Bearer <JWT_TOKEN>" \
	-H "Content-Type: application/json" \
	-d '{"title":"My First Post","content":"Hello World!"}'
```

### Upload Image

```bash
curl -X POST http://localhost:3000/api/upload \
	-H "Authorization: Bearer <JWT_TOKEN>" \
	-F "image=@/path/to/image.jpg"
```

---

## 🗂️ Project Structure

```
src/
	config/
		db.js
	controllers/
		auth.controller.js
		posts.controller.js
	middleware/
		auth.middleware.js
	models/
		Post.js
		User.js
	routes/
		auth.routes.js
		posts.routes.js
	services/
	utils/
index.js
```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

---

## 🙋‍♂️ Author

- Akhilan T (akhilan.t.s.134@kalvium.community)

---

**Tip:** Always review and update this README as your project evolves!
