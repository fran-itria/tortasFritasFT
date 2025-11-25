// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FIREBASE,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.NEXT_PUBLIC_APP_ID_FIREBASE,
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
    throw error;
  }
};

export const storage = getStorage(app) 
