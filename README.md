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
- Install Mongodb
- Copy env.example into .env and fill out variables

### Start
```
npm install
npm run dev
```

### Deploy
Upon merge to master branch, app will be deployed to Heroku
