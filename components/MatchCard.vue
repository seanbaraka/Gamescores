<script setup lang="ts">
// props

// TODO: If home and away highlight home 
 const props = defineProps({
    leagueName:String,
    leagueLogo: String,
    homeTeam:String,
    homeLogo:String,
    awayTeam:String,
    awayLogo:String,
    id: String,
    timestamp:Number,
})
const id = props.id
const timestamp = props.timestamp
const date = new Date(timestamp);
const day:string = date.getDate().toString().padStart(2, '0');
const month:number = date.getMonth()+1;
const hours:string = date.getHours().toString().padStart(2, '0');
const minutes:string = date.getMinutes().toString().padStart(2, '0');
console.clear();
console.log(day,month,hours,minutes);
// month names
const monthNames:string[] = ["January","February","March","April","May","June","July","August","September","October","November","December"]

let showCard = ref(false);
let advice:string;
let underOver:number;
let homeGoal:string;
let awayGoal:string;
let winner:string;
let percentHome:string;
let percentDraw:string;
let percentAway:String;
// Closing the card
async function openCard() {

    // advice = cardData.value[0].advice
    if (showCard.value === true) {
        showCard.value = false; 
    } else {
        const { data: cardData, err, pending: gettingData } = await useFetch<any[]>(`/api/updates/predictions?fixture=${id}`)
        advice = cardData.value.advice;
        underOver = Number(cardData.value.underOver);
        homeGoal = Math.abs(Number(cardData.value.goals.home));
        awayGoal = Math.abs(Number(cardData.value.goals.away));
        percentHome = cardData.value.percent.home;
        percentDraw = cardData.value.percent.draw;
        percentAway = cardData.value.percent.away;
        winner = cardData.value.winner.name;
        if (winner === props.homeTeam) {
            winner = "Home"
        } else if (winner === props.awayTeam) {
            winner = "Away"
        } else {
            winner = "Draw" 
        }
        // console.clear();
        showCard.value = true;
        console.log(percentHome);
        console.log(winner);
        console.log(cardData.value);
        console.log(underOver);
    }
}

</script>
<template>
        <div class="match-card  bg-gray-100 border-gray-300 border-2 mb-2  p-5">
                            <!-- Title -->
                            <div class="card-title  flex flex-row justify-between items-center border-solid border-gray-300 transition duration-300"
                                :class="{ 'border-b-2 pb-4': showCard, 'border-b-0': !showCard }">
                                <p class="title-league flex flex-row">
                                    <span class="mr-2"><img class="w-5" :src="leagueLogo" alt=""> </span>
                                    {{ leagueName }}</p>
                                    <h2 class="flex flex-row">
                                        {{ homeTeam }}
                                        <span class="ml-2"><img class="w-5" :src="homeLogo" alt=""> </span>
                                    </h2>
                                <div class="title-time ">
                                    <p class="date text-gray-500">{{ day+" "+monthNames[month] }}</p>
                                    <p class="time text-gray-700">{{ hours+":"+minutes }} hrs</p>
                                </div>
                                <h2 class="flex flex-row">
                                    <span class="mr-2"><img class="w-5" :src="awayLogo" alt=""> </span>
                                    {{ awayTeam }}
                                </h2>
                                <button @click="openCard"
                                    class="title-icon rounded-lg  text-gray-500 p-2 transition duration-300"
                                    :class="{ 'rotate-180': showCard, 'rotate-0': !showCard }">
                                    <img src="@/assets/svg/arrow.svg" class="w-5" alt="">
                                </button>
                            </div>
                            <!-- card content -->
                            <div v-if="showCard"
                                class="card-container flex flex-row pt-5 justify-between transition duration-300">
                                <div class="prematch-predictions w-1/2 px-4">
                                    <h3 class="font-bold">Prematch predictions</h3>
                                    <h4 class="text-gray-400 py-1">Type 1 x 2</h4>
                                    <div class="first-board board">
                                        <span
                                            class="first-board__items board-items w-1/3 rounded-l-lg border-2" 
                                            :class="winner === 'Home' ? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300' "
                                            >1&nbsp;Home</span><span
                                            class="first-board__items board-items border-2 "
                                            :class="winner !== 'Home' && winner !== 'Away' ? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300' "
                                            >X&nbsp;Draw</span><span
                                            class="first-board__items board-items border-2 border-gray-300  rounded-r-lg"
                                            :class="winner === 'Away' ? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300'"
                                            >2&nbsp;Away</span>
                                    </div>
                                    <h4 class="text-gray-400 py-1">Type Ov/Un 1.5</h4>
                                    <div class="second-board board">
                                        <span
                                            class="second-board__items board-items  rounded-l-lg"
                                            :class="underOver != -1.5 && underOver != 0? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300' "
                                            >1&nbsp;&nbsp;&nbsp;&nbsp;Ov.
                                            1.5</span><span
                                            class="second-board__items board-items rounded-r-lg "
                                            :class="underOver == -1.5 || underOver === 0 ? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300'"
                                            >2&nbsp;&nbsp;&nbsp;&nbsp;Un.
                                            1.5</span>
                                    </div>
                                    <h4 class="text-gray-500 py-1">Type Ov/Un 2.5</h4>
                                    <div class="third-board board">
                                        <span
                                            class="third-board__items board-items rounded-l-lg "
                                            :class="underOver >= 2.5 ? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300' "
                                            >1&nbsp;&nbsp;&nbsp;&nbsp;Ov.
                                            2.5</span><span
                                            class="third-board__items board-items rounded-r-lg"
                                            :class="underOver < 2.5 ? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300'"
                                            >2&nbsp;&nbsp;&nbsp;&nbsp;Un.
                                            2.5</span>
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
                                            <span class="results">W</span><span class="results">W</span><span
                                                class="results">D</span><span class="results">L</span><span
                                                class="results">L</span>
                                        </div>
                                    </div>
                                    <!-- Expected outcome -->
                                    <h4 class="py-2 text-gray-500">Expected Outcome</h4>
                                    <div class="expected-outcomes flex flex-row">
                                        <span class="expected-outcomes__items"
                                        :class="winner === 'Home' ? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300' "
                                        >{{ percentHome }} Home</span><span
                                            class="expected-outcomes__items"
                                            :class="winner !== 'Home' && winner !== 'Away' ? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300'"
                                            >{{ percentDraw }} Draw</span><span
                                            class="expected-outcomes__items"
                                            :class="winner === 'Away' ? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300'"
                                            >{{ percentAway }} Away</span>
                                    </div>
                                    <!-- Expected goals -->
                                    <h4 class="py-2 text-gray-500">Expected goals</h4>
                                    <div class="expected-goals flex flex-row justify-between">
                                        <span class="expected-goals__items"
                                        :class="homeGoal >= awayGoal  ? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300' "
                                        >1&nbsp;&nbsp;{{homeTeam}}&nbsp;&nbsp;Un. {{ homeGoal }}</span><span
                                            class="expected-goals__items"
                                            :class="awayGoal>homeGoal? 'bg-green-500 text-gray-50 border-green-500' : 'bg-gray-50 text-gray-700 border-gray-300'"
                                            >2&nbsp;&nbsp;{{awayTeam}}&nbsp;&nbsp;Un. {{ awayGoal }}</span>
                                    </div>
                                    <div class="footnote py-2">
                                        <span class="crown">
                                            <img class="translate-y-1 rotate-1" src="@/assets/img/crown.png" alt=""
                                                srcset="">
                                        </span>
                                        <span class="ai-note whitespace-no-wrap">AI Powered Advice&nbsp;</span>
                                        <span>&nbsp;{{ advice }}.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
</template>
<style scoped>
.match-card{
    @apply rounded-lg
}
.board{
    @apply flex flex-row justify-between items-center text-left md:text-center
}
.board-items{
    @apply px-2 py-1 border-2 text-sm
}
.first-board__items{
    @apply w-1/3 
}
.second-board__items{
    @apply w-1/2  
}

.third-board__items{
    @apply w-1/2
}
.results-container{
    @apply w-1/2 flex flex-row justify-between 
}

.results-container .results{
    @apply bg-green-500 inline-block px-0.5 md:px-2 text-gray-50 text-center 
}

.first-results .results:nth-child(4){
    @apply bg-gray-400
}
.second-results .results:nth-child(3){
    @apply bg-gray-400
}
.second-results .results:nth-child(4), .second-results .results:nth-child(5){
    @apply bg-red-600
}
.expected-outcomes__items{
    @apply w-1/3 px-2 py-1 text-center items-center border-2
}
.expected-outcomes__items:nth-child(1){
    @apply  border-2 rounded-l-lg
}

.expected-outcomes__items:nth-child(3){
    @apply rounded-r-lg
}

.expected-goals__items{
    @apply w-1/2 px-2 py-1
}
.expected-goals__items:nth-child(1){
    @apply  border-2 rounded-l-lg
}
.expected-goals__items:nth-child(2){
    @apply border-2  rounded-r-lg 
}
.footnote .ai-note{
    @apply bg-blue-300 text-blue-600 py-1 px-2 rounded-lg
}
</style>