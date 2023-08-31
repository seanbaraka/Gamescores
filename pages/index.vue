<script setup lang="ts">

import UpdateFixtures from "~/components/UpdateFixtures.vue";

const { data: fixtures, refresh, pending } = useFetch('/api/updates/fixtures');

const { status, signOut } = useAuth();
if (status.value !== 'authenticated') {
    navigateTo('auth')
}

const pastFixtures = ref([
    { home: "Arsenal", away: "Brigton Albion & Hove", correct: true, prediction: "Home Win", premium: false, odds: 1.23 },
    { home: "Manchester City", away: "Chelsea", correct: false, prediction: "Home Win", premium: true, odds: 1.56 },
    { home: "Man Utd", away: "Everton", correct: false, prediction: "Home Win", premium: false, odds: 1.23 },
    { home: "Liverpool F.C", away: "Southampton F.C", correct: true, prediction: "Home Win", premium: true, odds: 1.56 },
    { home: "Arsenal", away: "Brigton Albion & Hove", correct: true, prediction: "Home Win", premium: false, odds: 1.23 },
    { home: "Manchester City", away: "Chelsea", correct: false, prediction: "Home Win", premium: true, odds: 1.56 },
]);

const matchResults = [
    { key: 'Home Win' },
    { key: 'Away Win' },
    { key: 'Draw' },
    { key: 'Match Cancelled' },
    { key: 'Match Postponed'},
]

type ActiveFixture = {
    date: Date;
    home: string,
    away: string,
    category: string,
    prediction: string,
    odds: string,
    premium: boolean,
    outcome?: string,
}

const fixtureCategories = [
    { key: 'Free' },
    { key: 'Premium' }
]
const fixtureCategory = ref({key: 'Free'})
const selectedResult = ref()

const isUpdatingFixture = ref(false);
const activeFixture = ref<ActiveFixture>({} as ActiveFixture);
const uploadingFixture = ref(false);
const saveOrUpdateFixture = async() => {
    // do nothing when we have nothing or missing fields
    if(Object.keys(activeFixture.value).length < 5)  return;
    uploadingFixture.value = true;
    activeFixture.value.premium = fixtureCategory.value.key === 'Premium';
    const { data: uploadFixture, pending, error } = await useFetch('/api/fixtures', {
        method: "post",
        body: activeFixture.value
    });
    if (!pending.value && uploadFixture.value) {
        uploadingFixture.value = false;
        await refresh();
        // reset the form;
        activeFixture.value = {} as ActiveFixture;
    }
}

const setFixtureCategory = (category: any) => {
    fixtureCategory.value.key = category.key;
}

const updateCurrentFixture = (fixture: any) => {
    activeFixture.value = fixture;
    isUpdatingFixture.value = true;
    fixtureCategory.value.key = fixture.premium ? "Premium" : "Free" 
    // key.value = fixture.premium ? "Premium" : "Free"
}
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
            <div class="pending-matches my-4" v-if="fixtures.length">
                <h5>Pending Matches</h5>
                <div class="matches-list">

                </div>
            </div>
            <div class="no-matches" v-else>
              <h2>No Pending Matches Today</h2>
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
        <UpdateFixtures />
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
}

.form-input {
    @apply px-4 py-2 text-sm border outline-none placeholder:font-light
}
.form-header {
    @apply text-2xl
}
</style>