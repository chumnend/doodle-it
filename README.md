# Doodle It: Make Something Wonderful
Doodle It is a web application that allows users to build images
in thier browser. It utlilizes the [Fabric.js Canvas Library](http://fabricjs.com/)
to allow drag and drop shapes on a canvas, and runs on React. It is served by an API
server that is built using Express/Node.js and stores data on MongoDB.

## Demo 
![pixahunt-capture](doodle-it-capture.gif)

## Development Setup

### Prerequisites
- React
- Node
- npm

### Configuration
1) Clone the repo
2) Run `npm install` to install dependencies
3) Copy the file env.example and rename it .env. This file contains the name of required environment variables needed for the application to work

```
NODE_ENV=
PORT=
BROWSER=none

REACT_APP_API_PREFIX=   # uri path to here the API server is running
REACT_APP_API_KEY=      # password to access the API server
```
4) Start the application using `npm run serve`

### Deployment
Application is deployed to Heroku upon push to the stable branch
