<!-- @format -->

# ROPES

## Introduction

This is a modern social media platform frontend built with React. It allows users to connect, share posts, and interact with each other's content.

## Features

- User Authentication (Login/Signup)
- Create posts with text, images, or both
- View suggested user profiles
- Follow/Unfollow other users
- Like and comment on posts
- Delete own posts
- Responsive design for various screen sizes

## Technologies Used

- React
- Redux for state management
- React Router DOM for routing
- Axios for API requests
- React Icons for UI icons
- Tailwind CSS for styling

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:

   ```
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

The application will be available at `https://ropes-one.vercel.app/`.

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
