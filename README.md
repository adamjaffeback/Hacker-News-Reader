# Hacker-News-Reader
Doist Web Developer Test Project: News reader app which displays the latest Hacker News stories.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Prerequisites:
- Node.js v10
- npm with that version of Node.js
- Internet connection for initial package installation

```bash
git clone https://github.com/adamjaffeback/Hacker-News-Reader.git
cd Hack-News-Reader/
npm install
```

To run in development mode:

`npm start` will automatically launch localhost:3000 (on Linux-based machines, at least).

**To run for evaluation, please use production mode:**

`npm run start:prod` and manually open a browser to localhost:5000.

## Added NPM Packages

### prop-types

Needed to document React component defaultProps and propTypes values.

### moment

Moment.js is used in the StoryItem to display the story's timestamp *with localization*—that means with language support and proper local formatting. There's no other way I could provide a user with such customized date formatting without including Moment.js.

### react-infinite-scroll-component

I weighed the pros/cons of building my own infinite scroll, with the main consideration being the time limit of the project. This package only adds 4.15 kB.

### workbox-build

The bootstrapping tool I used is the well-known and well-used [Create React App](https://github.com/facebook/create-react-app). This starter project comes ready with service worker support, but it is implemented through blackbox magic in `react-scripts`. Those scripts are super handy: all the best practices for Webpack, babel, etc. are included, but it makes it difficult to customize the built-in service worker.

One of the main features of this app was to make it a PWA by caching calls to the third-party API (Hacker News). I had to build my own service worker and workbox-build had the best documentation for that.

Also, this is just a dev dependency.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run start:prod`

Bundles the application for production using `react-scripts build`, then starts a simple server with `serve -s build`. Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
