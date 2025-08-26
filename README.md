# Blog API

A Node.js/Express REST API for blogs, users, and comments using MongoDB via Mongoose.

## Tech stack
- Node.js, Express
- MongoDB, Mongoose
- JSON Web Tokens, bcrypt

## Requirements
- Node.js 18+
- MongoDB instance (local or cloud)

## Setup
```bash
# install dependencies
npm install

# run in dev (with nodemon)
npm run dev

# run in production
npm start
```

## Environment variables
Create a `.env` file in the project root:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blog_api
JWT_SECRET=your_jwt_secret_here
COOKIE_SECRET=your_cookie_secret_here
```

## Scripts
- `npm run dev`: start server with nodemon
- `npm start`: start server with Node

## Project structure
```text
.
├─ index.js
├─ src/
│  ├─ config/
│  │  └─ db.js
│  ├─ controllers/
│  ├─ middlewares/
│  ├─ models/
│  └─ routes/
└─ package.json
```

## API overview
High-level routes (see files in `src/routes` for details):
- Blogs: `src/routes/blog.route.js`
- Comments: `src/routes/comment.route.js`
- Users: `src/routes/user.router.js`

## License
ISC
