<!-- @format -->

# ROPES Backend

## Introduction

The ROPES backend is a RESTful API built with **Node.js** and **Express.js**. It serves as the core of the platform, enabling functionalities like user authentication, profile management, post creation, social interactions, and real-time messaging.

## Features

- **User Authentication**: Secure user registration, login, and session management.
- **Profile Management**: Update user profiles, including uploading profile pictures.
- **Post Management**: Create, retrieve, and delete posts, including optional images.
- **Social Interactions**: Like posts, add comments, and follow/unfollow users.
- **Real-Time Messaging**:
  - Send and receive messages in real-time.
  - Typing indicators to show when someone is composing a message.
  - Read receipts for delivered messages.
- **Suggested Users**: Get recommendations for potential connections.
- **News Feed**: View posts from followed users.

## Base URL

```
https://ropes.onrender.com
```

## Technologies Used

- **Node.js**: Backend runtime for building scalable applications.
- **Express.js**: Web framework for API development.
- **MongoDB**: NoSQL database for efficient data storage.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB.
- **Socket.IO**: Real-time, event-based communication for messaging.
- **JWT (JSON Web Tokens)**: Secure token-based user authentication.
- **Multer**: Middleware for handling file uploads.

## Prerequisites

Ensure the following tools are installed on your system:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (local or cloud instance)

## API Documentation

### User Authentication and Profile Management

#### Signup

- **URL:** `/signup`
- **Method:** POST
- **Description:** Create a new user account.

#### Login

- **URL:** `/login`
- **Method:** POST
- **Description:** Authenticate a user and return a JWT token.

#### Get Current User

- **URL:** `/alreadyLogged`
- **Method:** GET
- **Description:** Retrieve details of the currently authenticated user.

#### Logout

- **URL:** `/logoutUser`
- **Method:** POST
- **Description:** Log out the user and invalidate their token.

#### Update Profile

- **URL:** `/updateUserData`
- **Method:** POST
- **Description:** Update user details or profile picture.
- **Note:** Uses `multer` for file uploads (`displaypicture`).

---

### Post Management

#### Create Post

- **URL:** `/createPost`
- **Method:** POST
- **Description:** Share a new post with optional text and image.

#### Get User Posts

- **URL:** `/getUser/post/:userId`
- **Method:** GET
- **Description:** Retrieve all posts from a specific user.

#### Like/Unlike Post

- **URL:** `/likeUnlikepost`
- **Method:** PUT
- **Description:** Toggle the like status of a post.

#### Comment on Post

- **URL:** `/addNewComment`
- **Method:** POST
- **Description:** Add a comment to a post.

#### Delete Post

- **URL:** `/deletepost/:postId`
- **Method:** DELETE
- **Description:** Remove a specific post by its ID.

---

### Real-Time Messaging

#### Send Message

- **Socket Event:** `sendMessage`
- **Description:** Sends a message to another user in real-time.

#### Receive Messages

- **Socket Event:** `receiveMessage`
- **Description:** Listens for incoming messages.

#### Typing Indicator

- **Socket Event:** `typing`
- **Description:** Notifies the recipient when the sender is typing.

#### Message Seen

- **Socket Event:** `messageSeen`
- **Description:** Marks a message as read and updates the status.

---

### Social Features

#### Follow/Unfollow User

- **URL:** `/followUnfollowUser`
- **Method:** POST
- **Description:** Toggle the follow status for a user.

#### Get Suggested Users

- **URL:** `/suggestedUsers/:userId`
- **Method:** GET
- **Description:** Fetch recommended user profiles for the logged-in user.

#### News Feed

- **URL:** `/getnewsFeed/:userId`
- **Method:** GET
- **Description:** Retrieve posts from followed users for the news feed.

---

## Socket.IO Setup

Real-time communication is powered by **Socket.IO**. To integrate:

1. The backend server listens for events like `sendMessage`, `typing`, and `messageSeen`.
2. Socket.IO maintains a persistent connection for instant updates.

---

## Authentication

Most endpoints require authentication. Include the authentication token in the request headers:

```
Authorization: Bearer <your_token_here>
```

## Request/Response Format

All requests and responses should be in JSON format, except for endpoints that involve file uploads.

### Example Request (Create Post):

```json
POST /createPost
Content-Type: multipart/form-data

{
  "caption": "Beautiful sunset!",
  "picture": ["url"]
}
```

### Example Response:

```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {
    "id": "123456",
    "caption": "Beautiful sunset!",
    "imageUrl": "https://ropessocial.com/images/posts/123456.jpg",
    "createdAt": "2024-10-18T15:30:00Z"
  }
}
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests. In case of an error, the response will include a JSON object with an `error` field describing the issue.

Example error response:

```json
{
  "error": "Invalid credentials",
  "status": 401
}
```

## Rate Limiting

To ensure fair usage and protect the service from abuse, the API implements rate limiting. Please refer to the response headers for information on your current rate limit status.

## Versioning

This documentation is for version 1 of the Ropes Social API. As the API evolves, we'll update the version number and provide separate documentation for each version.

## Support

For any questions or issues regarding the Ropes Social API, please contact our support team at anurag090697@gmail.com.
