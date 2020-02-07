# foodhub

MongoDB, ExpressJS, ReactJS, NodeJS, Apollo, GraphQL

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1. Create `config.js` on the root of the `server` folder and add your credentials.
```
module.exports = {
  MONGODB: 'YOUR_MONGODB_DATABASE_STRING'
  SECRET_KEY: 'YOUR_VERY_SECRET_KEY',
  GOOGLE_CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID'
}

```

2. Create `config.js` on `src` of the `client` folder and add your Google Client ID
```
module.exports = {
  GOOGLE_CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID'
}

```

### Running the App

1. Go to `server` directory and run the command

```
npm start
```

1. Go to `client` directory and run the command

```
npm start
```

The app should be up and running!

## Author
**Clark Egbert Alinsob**

