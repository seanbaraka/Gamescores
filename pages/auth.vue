<script setup lang="ts">
import { UserRole } from '~/server/db/models/User';

const { status, data, signIn, signOut } = useAuth();
const router = useRouter()
if (status.value === 'authenticated') {
    const email = data.value?.user?.email;
    const username = data.value?.user?.name;
    const pfp = data.value?.user?.image

    const { data: userInfo } = await useFetch<any>('/api/users/list', {
        params: {
            email
        }
    });
    const userId = ref('');
    if (userInfo.value) {
        const user = userInfo.value.user;
        if (user.role !== UserRole.ADMIN) {
            navigateTo('/hey')
        } else {
            navigateTo('/')
        }
    } else {
        console.log('Creating a new user')
        const { data: createUser } = await useFetch('/api/users/create-user', {
            method: 'POST',
            body: {
                email,
                pfp,
                username,
            }
        });
        if (createUser.value) {
            const newUser = createUser.value.data[0] as any;
            userId.value = newUser.id;
        }
        navigateTo('/hey')
    }
}
</script>
<template>
    <section class="text-center flex justify-center items-center">
        <div
            class="login-container p-4 lg:w-[40%] md:w-1/2 sm:w-3/4 h-screen flex flex-col items-center justify-center text-center">
            <Logo class="inline-block my-8 w-56" />
            <p class="text-sm">Enjoy real-time updates and manage your sports events with ease using our powerful admin
                tools. This is your gateway to a seamless sports management experience.</p>
            <button @click="signIn('google')"
                class="my-8 flex items-center justify-center gap-2 bg-[#272932] text-white text-sm w-full p-3">
                <img src="@/assets/img/google.png" class="w-5 h-5" />
                <span>Sign In with Google</span>
            </button>
            <p class="text-sm font-light">By clicking "Sign in with Google," you agree to our Terms of Service and Privacy
                Policy.</p>
        </div>
    </section>
</template>