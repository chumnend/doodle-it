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
```

Run standalone,
```
npm start
```

or 

Start with watcher,
```
npm run dev
```

### Test
```
npm test
```

### Deploy
Upon merge to master branch, app will be deployed to Heroku
