// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "collectiveai-c3e60.firebaseapp.com",
  projectId: "collectiveai-c3e60",
  storageBucket: "collectiveai-c3e60.firebasestorage.app",
  messagingSenderId: "540793105988",
  appId: "1:540793105988:web:0c90656e66dd8c8017d611",
  measurementId: "G-FKS1RGKH2L"
};


// const firebaseConfig = {
//   apiKey: "AIzaSyAJzcmjWHR0m3gRwRZFOtOccr15l1R7xpQ",
//   authDomain: "collectiveai-c3e60.firebaseapp.com",
//   projectId: "collectiveai-c3e60",
//   storageBucket: "collectiveai-c3e60.firebasestorage.app",
//   messagingSenderId: "540793105988",
//   appId: "1:540793105988:web:0c90656e66dd8c8017d611",
//   measurementId: "G-FKS1RGKH2L"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const googleProvider =
  new GoogleAuthProvider();

export const githubProvider =
  new GithubAuthProvider();