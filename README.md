# blog_api_rest_node

A RESTful API for a blog platform built with Node.js, Express, and MongoDB.

## Features

- Create, read, update, and delete articles
- Image upload for articles
- Input validation
- MongoDB integration with Mongoose
- CORS support

## Technologies Used

- Node.js
- Express
- MongoDB & Mongoose
- Multer (file uploads)
- Validator (input validation)
- Nodemon (development)

## Getting Started

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd blog_api_rest_node
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your MongoDB connection in `database/connection.js`.

4. Start the server:
   ```
   npm start
   ```

## Project Structure

- `index.js` – Entry point
- `controllers/` – Route handlers
- `models/` – Mongoose models
- `routes/` – API routes
- `database/` – Database connection
- `utils/` – Utility functions
- `images/articles/` – Uploaded article images

## Scripts

- `npm start` – Start the server with nodemon

## License

MIT
