# Doodle It Backend
API for Doodle It application, built with Node.js/Express

## API Documentation

### Required Params
- ?apiKey=<API KEY> to acccess the api
- ?userId=<USER ID> to access user items on item routes

### Authentication Routes
- /v1/auth/register - create a user
- /v1/auth/login - log in with credentials

### Doodle Routes 
- /v1/doodle - access doodles (requires user id and authorization)
- /v1/doodle/:id - access specific doodle (requires user id and authorization)

## Development Setup

### Prerequistes
- Install Node.js
- Install MongoDB

### Environment
- Copy env.example into .env and fill out variables
```
NODE_ENV=
PORT=
SECRET_KEY=
API_LOCK=
MONGODB_URI=
DEV_MONGODB_URI=
TEST_MONGODB_URI=
```

### Start
Install dependecies,
```
npm install
npm run dev
```

### Test
```
npm test
```

### Deploy
Upon merge to master branch, app will be deployed to Heroku
