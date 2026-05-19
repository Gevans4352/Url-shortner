# Url Shortener

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)

## Project Overview

**Url Shortener** is a full-stack web application that converts long URLs into shorter, more manageable links. It provides a simple way to store, retrieve, and redirect URLs using a lightweight backend and a responsive frontend.

The goal of this project is to demonstrate how a URL shortening service works under the hood, including REST API design, database persistence, and frontend-backend integration.

## Features

- Shorten long URLs into compact links
- Redirect shortened URLs to their original destinations
- Store URL mappings in a SQLite database
- Fetch and display stored URLs from the backend API
- RESTful API for managing URL data

## Tech Stack

### Frontend
- React

### Backend
- Node.js
- Express.js

### Database
- SQLite

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd url-shortener
```

#### 2. Install backend dependencies
```bash
cd backend
npm install
```

#### 3. Install frontend dependencies
``` bash
cd ../frontend
npm install
```
Running the Project Locally
Start the backend server
cd backend
npm start
Start the frontend development server
cd frontend
npm start


The frontend will run on:
``` bash
http://localhost:3000
```

# Backend Configuration

The backend will run on your configured port (default usually 5000).

---

## API Endpoints

### Base URL
``` bash
http://localhost:<PORT>
```


### Get all shortened URLs
```bash 
GET /shortUrls
```

### Create a new shortened URL
``` bash
POST /shortUrls
```


#### Request Body
```json
{
  "fullUrl": "https://example.com"
}
```

### Redirect to original URL
```bash
GET /:shortCode
``` 
#### Environment Variables

Create a .env file in the backend root directory and add:
```bash
PORT=5000
BASE_URL=http://localhost:5000
DATABASE_PATH=./database.sqlite
```

#### Contributing

Contributions are welcome.

Steps to contribute:
1. Fork the repository, click the fork button on GitHub.

2. Create a feature branch

```bash 
git checkout -b feature-name
```

4. Commit your changes

```bash 
git commit -m "Add feature"
```

6. Push your branch

```bash
git push origin feature-name
```

8. Open a Pull Request
   
#### License
This project is licensed under the MIT License.
