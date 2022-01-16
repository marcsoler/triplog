// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// -- This is a parent command --



import {initializeApp} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword, signOut, deleteUser} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const fbConfig = {
    apiKey: Cypress.env('REACT_APP_FIREBASE_API_KEY'),
    authDomain: Cypress.env('REACT_APP_FIREBASE_AUTH_DOMAIN'),
    projectId: Cypress.env('REACT_APP_FIREBASE_PROJECT_ID'),
    storageBucket: Cypress.env('REACT_APP_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: Cypress.env('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
    appId: Cypress.env('REACT_APP_FIREBASE_APP_ID'),
}

const firebaseApp = initializeApp(fbConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);



Cypress.Commands.add('login', (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    }).catch((error) => {
        console.error('Error on commands:login', error);
    });
});

Cypress.Commands.add('logout', () => {
    signOut(auth).then(() => {
        //
    }).catch((error) => {
        console.error('Error on commands:logout', error);
    })
});

Cypress.Commands.add('deleteTestUser', (email) => {
    deleteUser(email).then(() => {

    }).catch((error) => {
        console.error('Error on commands:deleteUser', error);
    });

});
