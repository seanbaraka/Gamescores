<script setup lang="ts">
const { status, signOut } = useAuth();
if (status.value !== 'authenticated') {
    navigateTo('auth')
}
</script>
<template>
    <section class="text-center h-screen flex flex-col justify-center items-center">
        <h2 class="text-5xl">Coming Soon!!</h2>
    </section>
</template>