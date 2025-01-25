<!-- @format -->

# ROPES Frontend

## Introduction

ROPES is a modern social media platform that enables users to connect, share posts, chat and interact in real-time. This frontend application is built with React and offers a seamless user experience.

## Features

- **User Authentication**: Secure login and signup functionality.
- **Post Creation**: Share posts containing text, images, or both.
- **User Suggestions**: Discover and connect with suggested profiles.
- **Follow/Unfollow**: Manage your network by following or unfollowing users.
- **Engagement**: Like and comment on posts to interact with others.
- **Post Management**: Delete your own posts when needed.
- **Real-Time Messaging**: Chat with other users, see when they are typing, and know when your messages are seen.
- **Responsive Design**: Optimized for various screen sizes to ensure a consistent experience across devices.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management for predictable application behavior.
- **React Router DOM**: Declarative routing for React applications.
- **Axios**: Promise-based HTTP client for API requests.
- **React Icons**: Collection of popular icons for React projects.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Socket.IO**: Enables real-time, bidirectional communication for messaging features.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14.0.0 or later)
- **npm** (v6.0.0 or later)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/anurag090697/Ropes.git

   ```

2. Navigate to the project directory:

   ```
   cd frontend
   ```

3. Install the dependencies:

   ```
   npm install
   ```

## Running the Application

To start the development server, run:

```
npm start
```

The application will be available at [ROPES](https://ropes-one.vercel.app/).

## Building for Production

To create a production build, run:

```
npm run build
```

This will create a `build` folder with optimized production-ready files.

## State Management

Redux is used for global state management. The store is configured in `src/store.js`, and individual slices (e.g., user, posts, profiles) are located in the `src/slice/` directory.

## API Integration

Axios is used for making API requests to the backend. API service functions are organized in the `src/slice` directory.

## Routing

React Router DOM is used for handling routes. The main routes are defined in `App.js`.

## Styling

Tailwind CSS is used for styling components. The Tailwind configuration can be found in `tailwind.config.js`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- React team for the amazing library
- Redux team for the powerful state management solution
- Tailwind CSS team for the utility-first CSS framework
