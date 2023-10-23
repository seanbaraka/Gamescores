import { initializeApp } from "firebase/app";


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

// var database = db.database();
// get the fixtures collection
//  const fixturesCollection = collection(db, 'fixtures');

// save user data to firebase
// function saveData() {
//   var data = {
//     name: 'John Doe',
//     email: 'johndoe@example.com',
//   };
//   var ref = database.ref('users');
//   ref.push(data);
// }

// saveData();
// // get users
// let usersCollection = collection(db,'users');
// console.log(usersCollection)