# 📰 Blog-site

A **full-stack blogging platform** built with the **MERN stack (MongoDB, Express, React, Node.js)** — allowing bloggers to create and manage posts while admins explore and oversee all blogs.

---

## 🚀 Features

- ✍️ **User Authentication** — JWT-based login & signup
- 👥 **Role-based Access** — Bloggers & Admins
- 📝 **Blog Management** — Create, Read, Update, Delete (CRUD)
- 🧭 **Explore Section** — Admins can view all blogs
- 🔍 **Search & Filter** — Filter by category or tag
- 🌙 **Light/Dark Theme** toggle
- 🧩 **Responsive Design** — Tailwind + Shadcn UI
- 💾 **MongoDB Integration** — Blogs & Users stored securely
- ⚡ **Real-time Filtering** & clean, modern UI

---

## 🧱 Tech Stack

| Layer                     | Technologies                                                  |
| ------------------------- | ------------------------------------------------------------- |
| **Frontend**              | React, React Router v6, Tailwind CSS, Shadcn/UI, Lucide React |
| **Backend**               | Node.js, Express.js, MongoDB (Mongoose)                       |
| **Auth**                  | JWT (JSON Web Token)                                          |
| **Deployment (optional)** | Vercel / Netlify (Frontend), Render / Railway (Backend)       |

---

## 📂 Project Structure

```
blog-site/
│
├── backend/
│   ├── models/
│   │   ├── Blog.js
│   │   └── User.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── blogControllers.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── blogRoutes.js
│   ├── middleware/
│   │   └── auth.js
|   |   └── upload.js
│   ├── config/
│   │   └── db.js
│   ├── uploads/
│   ├── server.js
│   ├── swagger.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   ├── App.jsx
    │   └── index.css
    └── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ambagwa/blog-site.git
cd blog-site
```

---

### 2️⃣ Backend setup

```bash
cd backend
npm install || pnpm add
```

Create a `.env` file inside `/backend` and add:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRETKEY=<your-jwt-secret>
PORT=5000
```

Then start the server:

```bash
npm run dev || pnpm run dev
```

The backend should now be running on [http://localhost:5000](http://localhost:5000)

---

### 3️⃣ Frontend setup

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 👤 User Roles

### **Blogger**

- Can log in / register
- Can create, edit, delete **own blogs**
- Can view blogs under “My Blogs”

### **Admin**

- Can access **Explore Page** to view **all blogs**
- Can filter blogs by category
- Can create, edit, delete **own blogs**
- Can view blogs under “My Blogs”
- (Optional) Manage users or approve content

---

## 🖋️ Example Blog Schema

```javascript
{
  title: "Healthy Living Tips",
  content: "A healthy lifestyle starts with balance...",
  author: "UserID",
  category: "Health",
  tags: ["wellness", "fitness", "lifestyle"]
}
```

---

## 💡 Example Categories

- Life
- Business
- Food
- Travel
- Technology
- Health

Each post belongs to one category and can include multiple tags.

---

## 🔍 Features in Action

| Feature                | Description                            |
| ---------------------- | -------------------------------------- |
| **Search**             | Filter blogs by title or tags          |
| **Category Filter**    | Narrow down blogs by selected category |
| **Dark/Light Mode**    | Switch UI themes easily                |
| **Admin Explore View** | Access all user blogs                  |

---

## 🧪 How to Use

1. **Register or Log In** as a user
2. **Blogger**:
   - Navigate to "My Blogs"
   - Click **New Post**
   - Fill in title, content, category, and tags
   - Click **Submit**
3. **Admin**:
   - Log in as admin
   - Go to **Explore**
   - View, filter, and manage all blogs

---

## 🧩 Future Improvements

- 📱 Add mobile-first UI refinements
- 🖋️ Add markdown editor for blogs
- 💬 Add comments & reactions
- 📊 Add analytics dashboard for admins
- 🧍 Add profile pictures & bios for users
- ⚙️ Add pagination & search API endpoints

---

## 🧑‍💻 Contributing

1. Fork the project
2. Create your feature branch
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit changes
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to your branch
   ```bash
   git push origin feature/my-feature
   ```
5. Open a Pull Request 🚀

---
