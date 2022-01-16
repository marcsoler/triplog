
# :notebook: triplog

Triplog is a small blogging application written in React which uses the Google Maps API to log about an adventure on the road.
## Modules

- **User module**
    - [x] Auth system
- **Blog CRUD**
    - [x] Posts & Pictures
    - [x] Live/Draft status
- **Route module**
    - [x] Google Maps API implementation
    - [x] Defining a route
- **Security**
    - [x] Roles (admin/user/anonymous)
- **Comment module**
    - [x] Reactions
    - [x] Moderation by admin
    
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  
The page will reload if you make edits. You will also see any lint errors in the console.

### `npm test`
Launches [cypress.io](https://github.com/cypress-io/cypress) e2e test runner on the terminal

### `npm e2e`
Launches the [cypress.io](https://github.com/cypress-io/cypress) e2e test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.  

## Prerequisites

### Node.js
Node.js and npm are essential to deploy and use triplog. Get it from [here](https://nodejs.org/en/download/). Triplog was built on the LTS version (16.13.3 at the time of this writing) but also worked on the (by the time of this writing) 17.0.x version.
You may verify your node version by running `node -v` and `npm -v` for the node package manager.

## Getting started

### Setting up Firebase
triplog's backend runs on Google's [Firebase](https://firebase.google.com/). Be sure you own an account.
1. Create a new Firebase-Project. You may discard the Google Analytics features.
2. Register a new Web-App and save your app's Firebase configuration. You'll be able to see those configurations on your Firebase project settings.
3. Set up Firebase Authentication and activate the native E-mail/Password sign-in method.
4. Add the Cloud Firestore database.

### Google Maps API Key
You will need a Google Maps API Key. Follow [this guide](https://developers.google.com/maps/documentation/javascript/get-api-key) on how to create one.

### Get triplog
1. Clone this repo into a new folder (e.g., `my-triplog`)
```
git clone git@github.com:marcsoler/triplog.git my-triplog
cd my-triplog
npm install
```
2. Copy the `.env.example` file on the same directory and name it as `.env` and add your Firebase and Google Maps credentials here.
3. The application should be able to run successfully. Start it with `npm start`
The user's administration role must be set in the Firestore Cloud directly. Once you've created your account, go to the `users`' collection, and set `admin` to true. 
