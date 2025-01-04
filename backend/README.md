<!-- @format -->

# Ropes Social API Documentation

## Introduction

Ropes Social API provides endpoints for user authentication, profile management, post creation, interactions, messaging and social networking features.

## Base URL

```
https://ropes.onrender.com
```

## Endpoints

### User Authentication and Profile Management

#### User Signup

- **URL:** `/signup`
- **Method:** POST
- **Description:** Register a new user account.

#### User Login

- **URL:** `/login`
- **Method:** POST
- **Description:** Authenticate a user and receive a token.

#### Check Logged In User

- **URL:** `/alreadyLogged`
- **Method:** GET
- **Description:** Retrieve information about the currently logged-in user.

#### User Logout

- **URL:** `/logoutUser`
- **Method:** POST
- **Description:** Log out the current user and invalidate their token.

#### Update User Profile

- **URL:** `/updateUserData`
- **Method:** POST
- **Description:** Update the user's profile information, including profile picture.
- **Note:** This endpoint uses `upload.single("displaypicture")` middleware for handling file uploads.

#### Search Users

- **URL:** `/searchUser/:query`
- **Method:** GET
- **Description:** Search for users based on the provided query string.

### Post Management

#### Create New Post

- **URL:** `/createPost`
- **Method:** POST
- **Description:** Create a new post with an optional image.
- **Note:** This endpoint uses `upload.single("picture")` middleware for handling image uploads.

#### Get User Posts

- **URL:** `/getUser/post/:userId`
- **Method:** GET
- **Description:** Retrieve all posts for a specific user.

#### Like/Unlike Post

- **URL:** `/likeUnlikepost`
- **Method:** PUT
- **Description:** Toggle like status on a post for the current user.

#### Add New Comment

- **URL:** `/addNewComment`
- **Method:** POST
- **Description:** Add a new comment to a post.

#### Delete Post

- **URL:** `/deletepost/:postId`
- **Method:** DELETE
- **Description:** Delete a specific post by its ID.

### Social Networking

#### Get Suggested Profiles

- **URL:** `/suggestedUsers/:userId`
- **Method:** GET
- **Description:** Retrieve a list of suggested user profiles for the given user ID.

#### Follow/Unfollow User

- **URL:** `/followUnfollowUser`
- **Method:** POST
- **Description:** Toggle follow status for a user.

#### Get User News Feed

- **URL:** `/getnewsFeed/:userId`
- **Method:** GET
- **Description:** Retrieve the news feed (posts from followed users) for the given user ID.

#### Get Other User's Profile

- **URL:** `/getProfile/:userId`
- **Method:** GET
- **Description:** Retrieve the profile information for a specific user.

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
