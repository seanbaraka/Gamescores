<template>
    <section class="h-screen overflow-hidden flex">
        <div class="left-bar flex-1 h-screen overflow-auto px-10">
            <div class="mb-10 top-navigation flex w-[90%] justify-between items-center sticky top-0 bg-white py-6">
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
                    <div class="match-card rounded-lg bg-gray-200 border-gray-200 p-5">
                        <!-- Title -->
                        <div
                            class="card-title  flex flex-row justify-between items-center border-solid border-gray-300 border-b-2 pb-4">
                            <p class="title-league">EPL</p>
                            <h2>Chelsea</h2>
                            <div class="title-time ">
                                <p class="date text-gray-500">22 July</p>
                                <p class="time text-gray-700">23:00 hrs</p>
                            </div>
                            <h2>Houton town</h2>
                            <button  class="title-icon rounded-lg rotate-180 text-gray-500">V</button>
                        </div>
                        <!-- card content -->
                        <div class="card-container flex flex-row pt-5 justify-between">
                            <div class="prematch-predictions w-1/2 px-4">
                                <h3 class="font-bold">Prematch predictions</h3>
                                <h4 class="text-gray-400 py-1">Type 1 x 2</h4>
                                <div class="first-board board">
                                    <span class="first-board__items board-items w-1/3 rounded-l-lg border-green-500  bg-green-500 text-gray-50">1&nbsp;&nbsp;&nbsp;&nbsp;Home</span><span class="first-board__items board-items border-2   border-gray-300 ">X&nbsp;&nbsp;&nbsp;&nbsp;Draw</span><span class="first-board__items board-items border-2 border-gray-300  rounded-r-lg">2&nbsp;&nbsp;&nbsp;&nbsp;Away</span>
                                </div>
                                <h4 class="text-gray-400 py-1">Type Ov/Un 1.5</h4>
                                <div class="second-board board">
                                    <span class="second-board__items board-items  rounded-l-lg bg-green-500 text-gray-50 border-green-500">1&nbsp;&nbsp;&nbsp;&nbsp;Ov. 1.5</span><span class="second-board__items board-items rounded-r-lg border-gray-300">2&nbsp;&nbsp;&nbsp;&nbsp;Un. 1.5</span>
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
                                    <div class="results-container pl-5 second-results">
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
                                <p class="footnote py-2">
                                    <span class="ai">AI Powered Advice&nbsp;</span>
                                    <span>&nbsp;Double chance : Chelsea or draw.</span>
                                </p>
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
        <div class="right-bar h-screen overflow-auto flex-1 border border-t-0 border-b-0 border-r-0 p-10">
            <div class="fixture-form border-solid border-gray-200 border-2 bg-gray-100 px-8 py-5">
                <h2 class="form-header" v-if="!isUpdatingFixture">Update Fixtures</h2>
                <h2 class="form-header" v-else>{{ `${activeFixture?.home} vs ${activeFixture?.away}` }}</h2>
                <div class="container flex flex-row py-5">
                    <div class="select-league py-1 flex flex-col w-1/3 ">
                        <label for="league">Select league</label>
                        <select name="league" class="form-input "
                            :class="[fixtureCategory.key !== 'Free' ? 'focus:border-[#4392F1]' : 'focus:border-green-700']"
                            id="league">
                            <option value="">English premier league</option>
                            <option value="">Spanish La Liga</option>
                            <option value="">Italian Serie A</option>
                            <option value="">German Bundesliga</option>
                            <option value="">French Ligue 1</option>
                        </select>
                    </div>
                    <div class="flex flex-col w-1/3">
                        <label class="text-sm" for="matchDate">Match Date</label>
                        <input class="form-input " v-model="activeFixture.date"
                            :class="[fixtureCategory.key !== 'Free' ? 'focus:border-[#4392F1]' : 'focus:border-green-700']"
                            type="date" id="matchDate" />
                    </div>
                </div>
                <div class="flex flex-col my-2">
                    <label for="category" class="text-sm my-2">Category</label>
                    <CustomListBox :default-option-key="fixtureCategory.key" :options="fixtureCategories"
                        @on-option-selected="setFixtureCategory" />
                </div>
                <div class="flex flex-col my-3">
                    <label class="text-sm my-2" for="home">Home Team</label>
                    <input class="form-input" v-model="activeFixture.home"
                        :class="[fixtureCategory.key !== 'Free' ? 'focus:border-[#4392F1]' : 'focus:border-green-700']"
                        placeholder="Arsenal F.C" type="text" id="home" />
                </div>
                <div class="flex flex-col my-3">
                    <label class="text-sm my-2" for="away">Away Team</label>
                    <input class="form-input" v-model="activeFixture.away"
                        :class="[fixtureCategory.key !== 'Free' ? 'focus:border-[#4392F1]' : 'focus:border-green-700']"
                        placeholder="Manchester City" type="text" id="away" />
                </div>
                <div class="flex flex-col my-3">
                    <label class="text-sm my-2 flex gap-2 items-center relative" for="prediction">
                        <span class="gap-1 absolute bottom-[2px] left-[70px]" v-if="fixtureCategory.key === 'Premium'">
                            <img src="@/assets/img/crown.png" class="w-4 h-4 inline-block" />
                            <img src="@/assets/img/crown.png" class="w-4 h-4 inline-block" />
                            <img src="@/assets/img/crown.png" class="w-4 h-4 inline-block" />
                        </span>
                        <span>Prediction</span>
                    </label>
                    <input class="form-input" v-model="activeFixture.prediction"
                        :class="[fixtureCategory.key !== 'Free' ? 'focus:border-[#4392F1]' : 'focus:border-green-700']"
                        placeholder="Home Win" type="text" id="prediction" />
                </div>
                <div class="flex flex-col my-3" v-if="isUpdatingFixture">
                    <label class="text-sm my-2" for="prediction">Match Outcome</label>
                    <CustomListBox :options="matchResults" @on-option-selected="selectedResult" />
                </div>
                <div class="flex flex-col my-3">
                    <label class="text-sm my-2" for="odds">Odds From The Bookies</label>
                <input class="form-input" v-model="activeFixture.odds"
                    :class="[fixtureCategory.key !== 'Free' ? 'focus:border-[#4392F1]': 'focus:border-green-700']"
                    placeholder="Home Win - 2.45" type="text" id="odds" />
            </div>
            <button v-if="!uploadingFixture" @click="saveOrUpdateFixture" class="my-4 p-2.5 text-sm w-full"
                :class="[fixtureCategory.key === 'Free' ? 'text-green-700 bg-gray-100': 'text-[#4392F1] bg-[#ECF5FF]']">Update
                Match
                Details</button>
            <p v-else class="my-4 p-2.5 text-sm w-full text-center"
                :class="[fixtureCategory.key === 'Free' ? 'text-green-700 bg-gray-100': 'text-[#4392F1] bg-[#ECF5FF]']">
                Loading....
            </p>
        </div>
    </div>
</section>
</template>
<script setup lang="ts">

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
// function closeCard(){
//     console.log(this.showCard);
//         if(this.showCard === true){
//             this.showCard = false;
//         }else{
//             this.showCard = true;
//         }
//         console.log(this.showCard)
// }

</script>

<style scoped>
@import "../assets/css/pages/index.css";
</style>