// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getRemoteConfig } from "firebase/remote-config";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCty-xkE59h0VU7mQobFYrhPL1Qjlt-890",
  authDomain: "gocar-mvp.firebaseapp.com",
  projectId: "gocar-mvp",
  storageBucket: "gocar-mvp.firebasestorage.app",
  messagingSenderId: "270782727089",
  appId: "1:270782727089:web:5e922250d55f7d082db390",
  measurementId: "G-GW0JP70J4C"
};

// Singleton pattern: ensures we only initialize once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const remoteConfig = getRemoteConfig(app);