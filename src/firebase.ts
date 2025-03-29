// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics  } from "firebase/analytics";
import { getAuth       } from "firebase/auth"

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAwKGJAfk6QlfE4IrqqY_6RNZEONjwLUGw",
  authDomain: "store-8f314.firebaseapp.com",
  projectId: "store-8f314",
  storageBucket: "store-8f314.firebasestorage.app",
  messagingSenderId: "851870253331",
  appId: "1:851870253331:web:07e530013299541b1c5ae6",
  measurementId: "G-C1Q1DY7H4D"
};

// Initialiser Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, analytics, auth }; // ✅ Exportation pour l'utiliser ailleurs
