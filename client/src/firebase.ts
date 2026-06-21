import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyCUDW6aW7hGK2srCkJa7SVArGngI2pXDFA",
  authDomain: "ij-bengles.firebaseapp.com",
  projectId: "ij-bengles",
  storageBucket: "ij-bengles.firebasestorage.app",
  messagingSenderId: "653639871444",
  appId: "1:653639871444:web:2f530d50e77379a16b8441",
  measurementId: "G-BZHZJVY3CT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);