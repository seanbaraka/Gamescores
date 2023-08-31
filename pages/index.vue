<template>
    <section class="h-screen overflow-hidden flex flex-col lg:flex-row">
        <div class="left-bar flex-1 h-screen lg:overflow-auto px-10">
            <div class="mb-10 top-navigation flex w-[100%] justify-between items-center sticky top-0 bg-white py-6">
                <Logo />
                <NuxtLink class="nav-link" to="/">Matches</NuxtLink>
                <NuxtLink to="/members" class="nav-link">Members</NuxtLink>
                <NuxtLink @click="signOut()" class="nav-link cursor-pointer text-red-500 font-semibold">Logout</NuxtLink>
            </div>
            <div class="headings flex flex-row items-baseline ">
                <h3 class="text-2xl font-semibold my-2 pr-5">Recent Matches Across the globe</h3>
                <h5>Pending Matches</h5>
            </div>
            <div class="pending-matches my-4">
                <div class="matches-list">
                    <div class="match-card  bg-gray-100 border-gray-300 border-2  p-5">
                        <!-- Title -->
                        <div
                            class="card-title  flex flex-row justify-between items-center border-solid border-gray-300 transition duration-300" 
                            :class="{'border-b-2 pb-4':showCard,'border-b-0':!showCard}"
                            >
                            <p class="title-league">EPL</p>
                            <h2>Chelsea</h2>
                            <div class="title-time ">
                                <p class="date text-gray-500">22 July</p>
                                <p class="time text-gray-700">23:00 hrs</p>
                            </div>
                            <h2>Houton town</h2>
                            <button @click="closeCard"  class="title-icon rounded-lg  text-gray-500 p-2 transition duration-300" :class="{'rotate-180': showCard, 'rotate-0': !showCard}">
                            <img src="@/assets/svg/arrow.svg" class="w-5" alt="">
                            </button>
                        </div>
                        <!-- card content -->
                        <div v-if="showCard" class="card-container flex flex-row pt-5 justify-between transition duration-300">
                            <div class="prematch-predictions w-1/2 px-4">
                                <h3 class="font-bold">Prematch predictions</h3>
                                <h4 class="text-gray-400 py-1">Type 1 x 2</h4>
                                <div class="first-board board">
                                    <span class="first-board__items board-items w-1/3 rounded-l-lg border-green-500  bg-green-500 text-gray-50">1&nbsp;Home</span><span class="first-board__items board-items border-2   border-gray-300 ">X&nbsp;Draw</span><span class="first-board__items board-items border-2 border-gray-300  rounded-r-lg">2&nbsp;Away</span>
                                </div>
                                <h4 class="text-gray-400 py-1">Type Ov/Un 1.5</h4>
                                <div class="second-board board">
                                    <span class="second-board__items board-items  rounded-l-lg bg-green-500 text-gray-50 border-green-500">1&nbsp;&nbsp;&nbsp;&nbsp;Ov. 1.5</span><span class="second-board__items board-items rounded-r-lg  border-gray-300">2&nbsp;&nbsp;&nbsp;&nbsp;Un. 1.5</span>
                                </div>
                                <h4 class="text-gray-500 py-1">Type Ov/Un 2.5</h4>
                            <div class="third-board board">
                                <span class="third-board__items board-items rounded-l-lg border-gray-300">1&nbsp;&nbsp;&nbsp;&nbsp;Ov. 1.5</span><span class="third-board__items board-items rounded-r-lg bg-green-500 border-green-500 text-gray-50">2&nbsp;&nbsp;&nbsp;&nbsp;Un. 1.5</span>
                            </div>
                            </div>
                            <div class="w-1/2 px-4">
                                <!-- last five matches -->
                                <h3 class="font-bold">Last 5 matches</h3>
                                <div class="last-five__matches flex flex-row justify-between">
                                    <div class="results-container first-results">
                                        <span class="results">W</span>
                                        <span class="results">W</span>
                                        <span class="results">W</span>
                                        <span class="results">D</span><span class="results">W</span>
                                    </div>
                                    <div class="results-container pl-1 md:pl-5 second-results">
                                        <span class="results">W</span><span class="results">W</span><span class="results">D</span><span class="results">L</span><span class="results">L</span>
                                    </div>
                                </div>
                                <!-- Expected outcome -->
                                <h4 class="py-2 text-gray-500">Expected Outcome</h4>
                                <div class="expected-outcomes flex flex-row">
                                    <span class="expected-outcomes__items">45% Home</span><span class="expected-outcomes__items">45% Draw</span><span class="expected-outcomes__items">10% Away</span>
                                </div>
                                <!-- Expected goals -->
                                <h4 class="py-2 text-gray-500">Expected goals</h4>
                                <div class="expected-goals flex flex-row justify-between">
                                    <span class="expected-goals__items">1&nbsp;&nbsp;Chelsea&nbsp;&nbsp;Un. 3.5</span><span class="expected-goals__items">2&nbsp;&nbsp;Luton Town&nbsp;&nbsp;Un. 1.5</span>
                                </div>
                                <div class="footnote py-2">
                                    <span class="crown">
                                        <img class=" -rotate-150 translate-y-1" src="@/assets/img/crown.png" alt="" srcset="">
                                    </span>
                                    <span class="ai-note whitespace-no-wrap">AI Powered Advice&nbsp;</span>
                                    <span>&nbsp;Double chance : Chelsea or draw.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-matches">
                <h2>No Pending Matches Today</h2>
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
        <div class="right-bar h-screen lg:overflow-auto overflow-scroll flex-1 border border-t-0 border-b-0 border-r-0 p-10">
                <UpdateFixtures/>
        </div>
</section>
</template>
<script setup lang="ts">

let showCard = ref(true);

import UpdateFixtures from "~/components/UpdateFixtures.vue";

// this.showCard = true;

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
// Closing the card
function closeCard(){
        if(showCard.value === true){
            showCard.value = false;
        }else{
            showCard.value = true;
        }
}

</script>

<style scoped>
@import "@/assets/css/pages/index.css";
</style>