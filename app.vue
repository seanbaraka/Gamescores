<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
const fixtures = ref()
const { public: { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId }} = useRuntimeConfig()
const app = initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
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
