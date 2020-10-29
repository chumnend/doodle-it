# Doodle It Backend
API for Doodle It application, built with Node.js/Express

## API Documentation

### Authentication Routes
POST `/v1/auth/register?apiKey=<API_KEY>` (create new user)
- required body parameters: username, email, password
- required query parameters: apiKey
- returns: id, username and jwt

POST `/v1/auth/login?apiKey=<API_KEY>` (acquire jwt for authentication)
- required body parameters: login, password
- required query parameters: apiKey
- returns: id, username and jwt

### Doodle Routes 
GET `/v1/doodle?apiKey=<API KEY>&userId=<USER_ID>` (get a user's doodles)
- required body parameters: none
- required query parameters: apiKey, userId
- returns: array of serialized doodles

POST `/v1/doodle?apiKey=<API KEY>&userId=<USER_ID>` (create a doodle)
- required body parameters: title, content, width, height
- required query parameters: apiKey, userId
- returns: id of created doodle

GET `/v1/doodle/:id?apiKey=<API KEY>&userId=<USER_ID>` (find doodle by id)
- required body parameters: none
- required query parameters: apiKey, userId
- returns: serialized doodle

PUT `/v1/doodle/:id?apiKey=<API KEY>&userId=<USER_ID>` (update a doodle by id)
- required body parameters: none
- optional body parameters: title, content, width, height
- required query parameters: apiKey, userId
- returns: serialized doodle

DELETE `/v1/doodle/:id?apiKey=<API KEY>&userId=<USER_ID>` (remove a doodle by id)
- required body parameters: none
- required query parameters: apiKey, userId
- returns: serialized doodle


## Development Setup

### Prerequistes
- Install Node.js
- Install MongoDB

### Configuration
1) Clone the repo
2) Install dependencies with `npm install`
3) Copy the file env.example and rename it .env. This file contains the name of required environment variables needed for the application to work.

```
NODE_ENV=           # 'development' or 'production'
PORT=               # port to run the server on
SECRET_KEY=         # secret string used for user creation
API_LOCK=           # password to access the api
MONGODB_URI=        # uri of mongodb to use for production
DEV_MONGODB_URI=    # uri of mongodb to use for development
TEST_MONGODB_URI=   # uri of mongodb to use for testing
```

4) Start the application using `npm start` or `npm run dev` for automatic reloading


### Testing
1) Use `npm test` to run test cases using mocha/chai/sinon

## Deployment
Upon merge to `stable` branch, app will be deployed to Heroku
