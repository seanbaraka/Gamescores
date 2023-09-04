<script setup>
defineProps(['error'])

</script>
<template>
    <section class="bg-gray-100 h-screen text-center flex flex-col  text-gray-700 items-center">
        <!-- <h1>404 error</h1> -->
        <p class="text-9xl pt-10">{{ error.statusCode }}</p>
        <p class="text-3xl py-10">{{ error.message }}</p>
        <NuxtLink to="/" class="bg-blue-500 text-2xl text-gray-100 px-4 py-2 rounded-lg w-100 flex flex-row items-center justify-around">
        <img class="w-5" src="@/assets/svg/back_arrow.svg" alt="">&nbsp;Go back to home</NuxtLink>
    </section>
</template>
 