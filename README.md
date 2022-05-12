# Doodle It: Make Something Wonderful

## About this project
Doodle It is a web application that allows users to build images
in thier browser. It utlilizes the [Fabric.js Canvas Library](http://fabricjs.com/)
to allow drag and drop shapes on a canvas, and runs on React. It is served by an API
server that is built using Express/Node.js and stores data on MongoDB.

### Demo
<p align="center">
  <img src="doodle-it-capture.gif" alt="animated" />
</p>

### Built With
- React
- Node.js
- MongoDB

## Getting Started
1) Clone this repo, 

```
git clone https://github.com/chumnend/doodle-it.git
```

2) Install dependencies with 

```
yarn install
```

3) Go into the `doodle-it-api` package. Then copy the `env.example` file and fill it out. After return to the project root.

```
cd packages/doodle-it-ui
cp env.example .env.example
cd ../..
```

4) Go into the `doodle-it-ui` package. Then copy the `env.example` file and fill it out. After return to the project root.

```
cd packages/doodle-it-ui
cp env.example .env.example
cd ../..
```

5) Start the application,

```
yarn start
```

## Deployment 
Deployed on Heroku from ```stable``` branch.

## Contact
Nicholas Chumney - [nicholas.chumney@outlook.com](nicholas.chumney@outlook.com) 
