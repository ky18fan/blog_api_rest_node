# blog_api_rest_node

A RESTful API for a blog platform built with Node.js, Express, and
MongoDB.\
This project is fully containerized using Docker and Docker Compose for
consistent development and deployment environments.

------------------------------------------------------------------------

## 🚀 Features

-   Create, read, update, and delete articles
-   Image upload for articles
-   Input validation
-   MongoDB integration with Mongoose
-   CORS support
-   Containerized multi-service architecture

------------------------------------------------------------------------

## 🛠 Technologies Used

-   Node.js
-   Express
-   MongoDB & Mongoose
-   Docker
-   Docker Compose
-   Multer (file uploads)
-   Validator (input validation)

------------------------------------------------------------------------

## 🐳 Docker Setup (Recommended)

This project runs using a multi-container Docker setup:

### Services

-   **API Service** -- Node.js + Express application
-   **MongoDB Service** -- Official MongoDB image
-   Persistent Docker volume for database storage

------------------------------------------------------------------------

### 📦 Run with Docker

1.  Make sure Docker is installed.

2.  Clone the repository:

    git clone `<your-repo-url>`{=html} cd blog_api_rest_node

3.  Run the application:

    docker compose up --build

4.  The API will be available at:

    http://localhost:3000

MongoDB runs internally inside the Docker network.

------------------------------------------------------------------------

## 🔐 Environment Variables

Create a `.env` file in the root directory:

PORT=3000 MONGO_URI=mongodb://mongodb:27017/blogdb

> Note: `mongodb` is the service name defined in `docker-compose.yml`.

------------------------------------------------------------------------

## 🧱 Docker Architecture

-   The API runs inside a custom Node.js container.
-   MongoDB runs in a separate container.
-   Services communicate through a Docker internal network.
-   Database data is persisted using Docker volumes.
-   Environment variables are injected at runtime.

This structure ensures environment consistency, portability, and
scalability.

------------------------------------------------------------------------

## 🚀 Deployment-Ready Structure

The application follows container-based deployment best practices:

-   Multi-container setup
-   Isolated service networking
-   Persistent storage
-   Environment-based configuration
-   Ready to migrate to Kubernetes or cloud container platforms

------------------------------------------------------------------------

## 📂 Project Structure

-   `index.js` -- Entry point
-   `controllers/` -- Route handlers
-   `models/` -- Mongoose models
-   `routes/` -- API routes
-   `database/` -- Database connection
-   `utils/` -- Utility functions
-   `images/articles/` -- Uploaded article images
-   `Dockerfile` -- API container definition
-   `docker-compose.yml` -- Multi-container orchestration

------------------------------------------------------------------------

## 📜 License

MIT
