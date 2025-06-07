# Project_005_Clothes

A clothing management application built with Node.js, Express, and MongoDB that allows users to track their wardrobe items with image uploads and usage statistics.

## Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Item Management**: CRUD operations for clothing items with image upload support
- **Usage Tracking**: Track how often items are worn
- **File Management**: Automatic image handling and cleanup

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with HTTP-only cookies
- **File Upload**: Multer for image handling
- **Security**: bcrypt for password hashing

## Installation

1. Clone the repository

```bash
git clone https://github.com/Yossab55/Project_005_Clothes.git
cd Project_005_Clothes
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
# Create .env file with:
DB_CONNECTION=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Start the application

```bash
npm start
```

## API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User login

### Users
- `GET /users` - Get user profile
- `PATCH /users` - Update user profile
- `DELETE /users` - Delete user account

### Items
- `GET /items` - Get all items (with pagination/filtering)
- `POST /items` - Create new item
- `GET /items/:id` - Get specific item
- `PATCH /items/:id` - Update item
- `DELETE /items/:id` - Delete item

## Project Structure

```
├── controllers/          # Request handlers
├── models/              # Database schemas
├── routers/             # Route definitions
├── middleware/          # Custom middleware
├── utils/               # Utility functions
└── app.js              # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.


Wiki pages you might want to explore:
- [Overview (Yossab55/Project_005_Clothes)](/wiki/Yossab55/Project_005_Clothes#1)
- [Express Application Entry Point (Yossab55/Project_005_Clothes)](/wiki/Yossab55/Project_005_Clothes#2.1)
- [Utility Systems (Yossab55/Project_005_Clothes)](/wiki/Yossab55/Project_005_Clothes#5)
