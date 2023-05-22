<script setup lang="ts">
const { status, signOut } = useAuth();
if (status.value !== 'authenticated') {
    navigateTo('auth')
}
const fixtures = ref([
    { home: "Arsenal", away: "Brigton Albion & Hove", active: true, prediction: "Home Win", premium: false, odds: 1.23 },
    { home: "Manchester City", away: "Chelsea", active: true, prediction: "Home Win", premium: true, odds: 1.56 },
    { home: "Man Utd", away: "Everton", active: true, prediction: "Home Win", premium: false, odds: 1.23 },
    { home: "Liverpool F.C", away: "Southampton F.C", active: true, prediction: "Home Win", premium: true, odds: 1.56 },
]);
const pastFixtures = ref([
    { home: "Arsenal", away: "Brigton Albion & Hove", correct: true, prediction: "Home Win", premium: false, odds: 1.23 },
    { home: "Manchester City", away: "Chelsea", correct: false, prediction: "Home Win", premium: true, odds: 1.56 },
    { home: "Man Utd", away: "Everton", correct: false, prediction: "Home Win", premium: false, odds: 1.23 },
    { home: "Liverpool F.C", away: "Southampton F.C", correct: true, prediction: "Home Win", premium: true, odds: 1.56 },
    { home: "Arsenal", away: "Brigton Albion & Hove", correct: true, prediction: "Home Win", premium: false, odds: 1.23 },
    { home: "Manchester City", away: "Chelsea", correct: false, prediction: "Home Win", premium: true, odds: 1.56 },
]);
</script>
<template>
    <section class="h-screen overflow-hidden flex">
        <div class="left-bar flex-1 h-screen overflow-auto px-10">
            <div class="mb-10 top-navigation flex w-[90%] justify-between items-center sticky top-0 bg-white py-6">
                <Logo />
                <NuxtLink class="nav-link" to="/">Matches</NuxtLink>
                <NuxtLink to="/members" class="nav-link">Members</NuxtLink>
                <NuxtLink @click="signOut()" class="nav-link cursor-pointer text-red-500 font-semibold">Logout</NuxtLink>
            </div>
            <h3 class="text-2xl font-semibold my-2">Recent Matches Across the globe</h3>
            <div class="pending-matches my-4">
                <h5>Pending Matches</h5>
                <div class="matches-list">
                    <div v-for="fixture of fixtures"
                        class="fixture item flex justify-between text-sm items-center my-4  py-[.5em] px-6 cursor-pointer font-light"
                        :class="[fixture.premium ? 'border border-[#4392F1] bg-[#ECF5FF]' : 'bg-[#F8F8F8]']"
                        >
                        <p>{{ fixture.home }}</p>
                        <p>vs</p>
                        <p>{{ fixture.away }}</p>
                        <span v-if="fixture.premium">
                            <img src="@/assets/img/crown.png" alt="" srcset="">
                        </span>
                        <div class="flex flex-col">
                            <p class="font-bold text-[10px]" :class="[ fixture.premium ? 'text-[#4392F1]' : 'text-green-700']">{{ fixture.premium ? 'PREMIUM' : 'FREE' }}</p>
                            <p class="flex gap-4 font-medium text-[12px]">
                                <span>{{ fixture.prediction }}</span>
                                <span>{{ fixture.odds }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="past-fixtures mt-10">
                <h5>Past Matches</h5>
                <div class="matches-list">
                    <div class="flex justify-between my-2 items-center text-sm px-4 py-[.75em] border" 
                    v-for="fixture of pastFixtures"
                    :class="[fixture.correct ? 'bg-[#F8F8F8] border-[#4A7856] text-green-700' : 'bg-[#FFF5F9] text-[#FF4684] border-[#FFC8DA]']">
                        <p>12/05/2023</p>
                        <p>{{ fixture.home }}</p>
                        <p>vs</p>
                        <p>{{ fixture.away }}</p>
                        <span v-if="fixture.correct">
                            <img src="@/assets/img/check-badge.svg" alt="">
                        </span>
                        <p>{{ fixture.prediction }}</p>
                        <p>{{ fixture.odds }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-bar flex-1 border border-t-0 border-b-0 border-r-0"></div>
    </section>
</template>
<style scoped>
::-webkit-scrollbar {
    width: 1px;
}
::-webkit-scrollbar-track {
    width: 1px;
}
::-webkit-scrollbar-thumb {
    background-color: #E9E9E9;
    border-radius: 2px;
}
.nav-link {
    @apply py-1.5 px-6
}

.nav-link.router-link-active,
.nav-link.router-link-exact-active {
    @apply rounded-full bg-gray-100 text-green-900 font-semibold
}</style>