<script setup lang="ts">
import MatchCard from "../components/MatchCard.vue";
// TODO: Remove unused code
// get fixtures data
const { data: fixtures, refresh, pending } = useFetch('/api/updates/fixtures');
// console.log(fixtures.value)
// get past fixtures
const { data: pastFixtures } = useFetch('/api/updates/past-fixtures');
console.log(pastFixtures.value)
const { status, signOut } = useAuth();
 
if (status.value !== 'authenticated') {
    navigateTo('auth')
}

// const pastFixtures = ref([
//     { home: "Arsenal", away: "Brigton Albion & Hove", correct: true, prediction: "Home Win", premium: false, odds: 1.23 },
//     { home: "Manchester City", away: "Chelsea", correct: false, prediction: "Home Win", premium: true, odds: 1.56 },
//     { home: "Man Utd", away: "Everton", correct: false, prediction: "Home Win", premium: false, odds: 1.23 },
//     { home: "Liverpool F.C", away: "Southampton F.C", correct: true, prediction: "Home Win", premium: true, odds: 1.56 },
//     { home: "Arsenal", away: "Brigton Albion & Hove", correct: true, prediction: "Home Win", premium: false, odds: 1.23 },
//     { home: "Manchester City", away: "Chelsea", correct: false, prediction: "Home Win", premium: true, odds: 1.56 },
// ]);

const matchResults = [
    { key: 'Home Win' },
    { key: 'Away Win' },
    { key: 'Draw' },
    { key: 'Match Cancelled' },
    { key: 'Match Postponed' },
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
const fixtureCategory = ref({ key: 'Free' })
const selectedResult = ref()

const isUpdatingFixture = ref(false);
const activeFixture = ref<ActiveFixture>({} as ActiveFixture);
const uploadingFixture = ref(false);
const saveOrUpdateFixture = async () => {
    // do nothing when we have nothing or missing fields
    if (Object.keys(activeFixture.value).length < 5) return;
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
    <section class="h-screen overflow-hidden flex flex-col lg:flex-row">
        <div class="left-bar flex-1 h-screen  overflow-scroll  px-10">
            <div class="mb-10 top-navigation bg-transparent backdrop-blur flex w-[100%] justify-between items-center sticky top-0 py-6 z-10">
                <h2 class="text-2xl font-semibold">Game<span class="font-light">scores</span></h2>
                <NuxtLink class="nav-link" to="/">Matches</NuxtLink>
                <NuxtLink to="/members" class="nav-link">Members</NuxtLink>
                <NuxtLink @click="signOut()" class="nav-link cursor-pointer text-red-500 font-semibold">Logout</NuxtLink>
            </div>
            <div class="headings flex flex-row items-baseline ">
                <h3 class="text-2xl font-semibold my-2 pr-5">Recent Matches Across the globe</h3>
                <h5>Pending Matches</h5>
            </div>
            <div class="pending-matches my-4">
                <!-- matches -->
                <div class="matches-list" v-if="fixtures.length">
                    <MatchCard 
                    v-for="data in fixtures"
                    :leagueName="data.league.name"
                    :leagueLogo="data.league.logo"
                    :homeTeam="data.teams.home.name"
                    :homeLogo="data.teams.home.logo.src"
                    :awayTeam="data.teams.away.name"
                    :awayLogo="data.teams.away.logo.src"
                    :id="data.id"
                    :timestamp="data.timestamp"
                    />
                </div>
                <div class="no-matches" v-else>
                  <h2>No Pending Matches Today</h2>
                </div>
            </div>
            <div class="past-fixtures mt-10">
                <h5>Past Matches</h5>
                <div class="matches-list">
                    <div class="flex justify-between my-2 items-center text-sm px-4 py-[.75em] border rounded-lg"
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
    <div
        class="right-bar h-screen lg:overflow-auto overflow-scroll  flex-1 border border-t-0 border-b-0 border-r-0 p-10">
        <UpdateFixtures />
    </div>
</section>
</template>
<style scoped>@import "@/assets/css/pages/index.css";</style>