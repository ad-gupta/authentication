# Stateless Authentication System

A complete stateless authentication system built with Node.js, Express, MongoDB, React, JWT, Cookies, Bcrypt, and Cloudinary.

## Features

- User registration and login with encrypted passwords
- Stateless authentication using JWT
- Secure password hashing with Bcrypt
- Token storage using HTTP-only cookies
- Image upload and management with Cloudinary
- Full-stack integration with React frontend

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, JWT, Bcrypt, Cloudinary
- **Frontend**: React.js
- **Others**: Cookies, Cloudinary API

## Installation

Follow these steps to set up the project locally:

1. Clone the repository
    ```sh
    $ git clone https://github.com/ad-gupta/authentication.git
    ```

2. Install backend dependencies and run the server
    ```sh
    $ npm install
    $ npm run dev
    ```

3. Set up the client (frontend)
    ```sh
    $ cd client
    $ npm install
    $ npm run dev
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```plaintext
MONGO_URI=your_mongodb_connection_string
PORT=8000
JWT_EXPIRE="1d"
COOKIE_EXPIRE=1
JWT_SECRET=" "
```
The backend server will run on http://localhost:8000
The frontend will be available at http://localhost:5173
