// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsbbRkTq4HCil9QtX5KKbibL2B1UZKHww",
  authDomain: "tortasfritasft.firebaseapp.com",
  projectId: "tortasfritasft",
  storageBucket: "tortasfritasft.firebasestorage.app",
  messagingSenderId: "396615403131",
  appId: "1:396615403131:web:188ed89f66ac3f1e9084de",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

export const googleOAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleOAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    return { user, token };
  } catch (error) {
    console.error("Error en signInWithGoogle:", error);
    throw error;
  }
};
