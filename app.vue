<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
const fixtures = ref()
const app = initializeApp({
  apiKey: "AIzaSyC-QorOakQ9RJqPWS1VfetxXagrRiDhMZo",
  authDomain: "artemis-messenger.firebaseapp.com",
  projectId: "artemis-messenger",
  storageBucket: "artemis-messenger.appspot.com",
  messagingSenderId: "777259064933",
  appId: "1:777259064933:web:5d250b5a825696f986708c",
  measurementId: "G-ZW9WM3DH95"
});

const db = getFirestore(app);
const collections = collection(db, 'fixtures');
const docs = await getDocs(collections);
fixtures.value = docs.docs.map(record => record.data())

</script>
<template>
  <div>
    <NuxtPage />
  </div>
</template>
