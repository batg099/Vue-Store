// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwKGJAfk6QlfE4IrqqY_6RNZEONjwLUGw",
    authDomain: "store-8f314.firebaseapp.com",
    databaseURL: "https://store-8f314-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "store-8f314",
    storageBucket: "store-8f314.firebasestorage.app",
    messagingSenderId: "851870253331",
    appId: "1:851870253331:web:07e530013299541b1c5ae6",
    measurementId: "G-C1Q1DY7H4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);