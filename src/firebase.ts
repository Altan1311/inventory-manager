// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAKvSkp94IvRb3_ABy4YOBF1Ppyy7ivB5M",

  authDomain: "ebay-buy-app.firebaseapp.com",

  projectId: "ebay-buy-app",

  storageBucket: "ebay-buy-app.appspot.com",

  messagingSenderId: "813529181641",

  appId: "1:813529181641:web:74f90945a5aad4acec4c18"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);