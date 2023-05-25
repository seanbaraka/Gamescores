<script setup lang="ts">

const { data: fixtures, refresh, pending } = useFetch('/api/collections/fixtures');

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
            <div class="pending-matches my-4">
                <h5>Pending Matches</h5>
                <div class="matches-list">
                    <div v-for="fixture of fixtures?.data"
                        @click="updateCurrentFixture(fixture)"
                        class="fixture item flex justify-between text-sm items-center my-4  py-[.5em] px-6 cursor-pointer font-light"
                        :class="[fixture.premium ? 'border border-[#4392F1] bg-[#ECF5FF]' : 'bg-[#F8F8F8]']">
                        <p>{{ fixture.home }}</p>
                        <p>vs</p>
                        <p>{{ fixture.away }}</p>
                        <span v-if="fixture.premium">
                            <img src="@/assets/img/crown.png" alt="" srcset="">
                        </span>
                        <div class="flex flex-col">
                            <p class="font-bold text-[10px]"
                                :class="[fixture.premium ? 'text-[#4392F1]' : 'text-green-700']">{{ fixture.premium ?
                                    'PREMIUM' : 'FREE' }}</p>
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
        <div class="right-bar h-screen overflow-auto flex-1 border border-t-0 border-b-0 border-r-0 p-10">
            <div class="fixture-form">
                <h2 class="form-header" v-if="!isUpdatingFixture">Add A new Fixture</h2>
                <h2 class="form-header" v-else>{{ `${activeFixture?.home} vs ${activeFixture?.away}` }}</h2>
                <div class="flex flex-col my-3">
                    <label class="text-sm my-2" for="matchDate">Match Date</label>
                    <input class="form-input" v-model="activeFixture.date" :class="[fixtureCategory.key !== 'Free' ? 'focus:border-[#4392F1]': 'focus:border-green-700']" type="date" id="matchDate" />
                </div>
                <div class="flex flex-col my-2">
                    <label for="category" class="text-sm my-2">Category</label>
                    <CustomListBox :default-option-key="fixtureCategory.key" :options="fixtureCategories" @on-option-selected="setFixtureCategory" />
                </div>
                <div class="flex flex-col my-3">
                    <label class="text-sm my-2" for="home">Home Team</label>
                    <input class="form-input" v-model="activeFixture.home" :class="[fixtureCategory.key !== 'Free' ? 'focus:border-[#4392F1]': 'focus:border-green-700']" placeholder="Arsenal F.C" type="text" id="home" />
                </div>
                <div class="flex flex-col my-3">
                    <label class="text-sm my-2" for="away">Away Team</label>
                    <input class="form-input" v-model="activeFixture.away" :class="[fixtureCategory.key !== 'Free' ? 'focus:border-[#4392F1]': 'focus:border-green-700']" placeholder="Manchester City" type="text" id="away" />
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
                    <input class="form-input" v-model="activeFixture.prediction" :class="[fixtureCategory.key !== 'Free' ? 'focus:border-[#4392F1]': 'focus:border-green-700']" placeholder="Home Win" type="text" id="prediction" />
                </div>
                <div class="flex flex-col my-3" v-if="isUpdatingFixture">
                    <label class="text-sm my-2" for="prediction">Match Outcome</label>
                    <CustomListBox :options="matchResults" @on-option-selected="selectedResult" /> 
                </div>
                <div class="flex flex-col my-3">
                    <label class="text-sm my-2" for="odds">Odds From The Bookies</label>
                    <input class="form-input" v-model="activeFixture.odds" :class="[fixtureCategory.key !== 'Free' ? 'focus:border-[#4392F1]': 'focus:border-green-700']" placeholder="Home Win - 2.45" type="text" id="odds" />
                </div>
                <button v-if="!uploadingFixture" @click="saveOrUpdateFixture" class="my-4 p-2.5 text-sm w-full" :class="[fixtureCategory.key === 'Free' ? 'text-green-700 bg-gray-100': 'text-[#4392F1] bg-[#ECF5FF]']">Update Match
                    Details</button>
                <p v-else class="my-4 p-2.5 text-sm w-full text-center" :class="[fixtureCategory.key === 'Free' ? 'text-green-700 bg-gray-100': 'text-[#4392F1] bg-[#ECF5FF]']">
                Loading....
                </p>
            </div>
        </div>
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