import { initializeApp } from "firebase/app"
import { getDocs, collection, getFirestore, DocumentData } from "firebase/firestore/lite";
// get the firebase login credentials
const { public: { apiKey, appId, authDomain, measurementId, messagingSenderId, projectId, storageBucket} } = useRuntimeConfig()
const app = initializeApp({
    apiKey,
    appId,
    authDomain,
    messagingSenderId,
    measurementId,
    projectId,
    storageBucket
});
// get a db instance
export const db = getFirestore(app);