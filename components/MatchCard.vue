<script setup lang="ts">
// props
import dayjs from "dayjs";

const props = defineProps({
  leagueName: String,
  leagueLogo: String,
  homeTeam: String,
  homeLogo: String,
  awayTeam: String,
  awayLogo: String,
  id: String,
  timestamp: Number,
});
// console.log(props.firstGame)
const id = props.id;
const timestamp = props.timestamp;

let showCard = ref(false);
let advice: string;
let underOver: number;
let goals: { home: number; away: number };
let winner: { id: string; name: string; comment: string };
let winnerName: string;
let percent: { home: string; draw: string; away: string };

const statsLoaded = ref(false);
// Closing and opening the card
async function toggleCard() {
  showCard.value = !showCard.value;
  if (showCard.value === true) {
    const {
      data: cardData,
      error,
      pending: gettingData,
    } = await useFetch<any>(`/api/updates/predictions?fixture=${id}`);
    if (!cardData.value) return;
    console.log(cardData.value);
    statsLoaded.value = true;
    advice = cardData.value.advice;
    underOver = Number(cardData.value.underOver);
    goals = {
      home: Math.abs(Number(cardData.value.goals.home)),
      away: Math.abs(Number(cardData.value.goals.away)),
    };
    percent = cardData.value.percent;
    winner = cardData.value.winner;
    if (winner.name === props.homeTeam) {
      winnerName = 'Home';
    } else if (winner.name === props.awayTeam) {
      winnerName = 'Away';
    } else {
      winnerName = 'Draw';
    }
  }
}
</script>
<template>
  <div
    class="match-card rounded-2xl bg-gray-50 border-gray-100 border-2 mb-2 py-2 px-4"
  >
    <!-- Title -->
    <div
      class="grid grid-cols-12 gap-2 items-center justify-between"
      :class="{'border-b-[1px] pb-4': showCard, 'border-b-0': !showCard }"
    >
      <div class="flex items-center gap-1 col-span-2">
        <img class="w-5 h-5" :src="leagueLogo" alt="" />
        <p class="text-xs">{{leagueName}}</p>
      </div>
      <div class="text-xs col-span-3 text-right">{{ homeTeam }}</div>
      <div class="flex justify-center items-center col-span-3 gap-3">
        <div class="home-logo">
          <img :src="homeLogo" class="w-5 h-5" alt="">
        </div>
        <div class="time-date col-span-1 text-xs flex flex-col items-center justify-center">
         <div class="date">
           {{ dayjs(timestamp).format('D MMM')}}
         </div>
          <div class="time">
            {{ dayjs(timestamp).format('HH:mm')}}
          </div>
        </div>
        <div class="away-logo">
          <img :src="awayLogo" class="w-5 h-5" alt="">
        </div>
      </div>
      <div class="text-xs col-span-3">{{ awayTeam }}</div>
      <button
        @click="toggleCard"
        class="title-icon col-span-1 w-6 h-6 rounded-full text-gray-500 p-1.5 transition duration-300"
        :class="{ 'rotate-180': showCard, 'rotate-0': !showCard }"
      >
        <img src="@/assets/svg/arrow.svg" class="w-4" alt="" />
      </button>
    </div>
    <!-- card content -->
    <div
      v-if="showCard"
      class="card-container pt-5 justify-between transition duration-300"
    >
      <div class="stats-box flex" v-if="statsLoaded">
        <div class="prematch-predictions w-1/2 px-4">
          <h3 class="font-bold">Prematch predictions</h3>
          <h4 class="text-gray-400 py-1">Type 1 x 2</h4>
          <div class="first-board board">
          <span
              class="first-board__items board-items w-1/3 rounded-l-lg border-2"
              :class="
              winnerName === 'Home'
                ? 'bg-green-500 text-gray-50 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >1&nbsp;Home</span
          ><span
              class="first-board__items board-items border-2"
              :class="
              winnerName !== 'Home' && winnerName !== 'Away'
                ? 'bg-green-500 text-gray-100 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >X&nbsp;Draw</span
          ><span
              class="first-board__items board-items border-2 border-gray-300 rounded-r-lg"
              :class="
              winnerName === 'Away'
                ? 'bg-green-500 text-gray-50 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >2&nbsp;Away</span
          >
          </div>
          <h4 class="text-gray-400 py-1">Type Ov/Un 1.5</h4>
          <div class="second-board board">
          <span
              class="second-board__items board-items rounded-l-lg"
              :class="
              underOver != -1.5 && underOver != 0
                ? 'bg-green-500 text-gray-50 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >1&nbsp;&nbsp;&nbsp;&nbsp;Ov. 1.5</span
          ><span
              class="second-board__items board-items rounded-r-lg"
              :class="
              underOver == -1.5 || underOver === 0
                ? 'bg-green-500 text-gray-50 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >2&nbsp;&nbsp;&nbsp;&nbsp;Un. 1.5</span
          >
          </div>
          <h4 class="text-gray-500 py-1">Type Ov/Un 2.5</h4>
          <div class="third-board board">
          <span
              class="third-board__items board-items rounded-l-lg"
              :class="
              underOver >= 2.5
                ? 'bg-green-500 text-gray-50 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >1&nbsp;&nbsp;&nbsp;&nbsp;Ov. 2.5</span
          ><span
              class="third-board__items board-items rounded-r-lg"
              :class="
              underOver < 2.5
                ? 'bg-green-500 text-gray-50 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >2&nbsp;&nbsp;&nbsp;&nbsp;Un. 2.5</span
          >
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
              <span class="results">W</span><span class="results">W</span
            ><span class="results">D</span><span class="results">L</span
            ><span class="results">L</span>
            </div>
          </div>
          <!-- Expected outcome -->
          <h4 class="py-2 text-gray-500">Expected Outcome</h4>
          <div class="expected-outcomes flex flex-row">
          <span
              class="expected-outcomes__items"
              :class="
              winnerName === 'Home'
                ? 'bg-green-500 text-gray-50 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >{{ percent.home }} Home</span
          ><span
              class="expected-outcomes__items"
              :class="
              winnerName !== 'Home' && winnerName !== 'Away'
                ? 'bg-green-500 text-gray-100 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >{{ percent.draw }} Draw</span
          ><span
              class="expected-outcomes__items"
              :class="
              winnerName === 'Away'
                ? 'bg-green-500 text-gray-50 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >{{ percent.away }} Away</span
          >
          </div>
          <!-- Expected goals -->
          <h4 class="py-2 text-gray-500">Expected goals</h4>
          <div class="expected-goals flex flex-row justify-between">
          <span
              class="expected-goals__items"
              :class="
              goals.home >= goals.away
                ? 'bg-green-500 text-gray-50 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >1&nbsp;&nbsp;{{ homeTeam }}&nbsp;&nbsp;Un. {{ goals.home }}</span
          ><span
              class="expected-goals__items"
              :class="
              goals.away > goals.home
                ? 'bg-green-500 text-gray-50 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            "
          >2&nbsp;&nbsp;{{ awayTeam }}&nbsp;&nbsp;Un. {{ goals.away }}</span
          >
          </div>
          <div class="footnote py-2">
          <span class="crown">
            <img
                class="translate-y-1 rotate-1"
                src="@/assets/img/crown.png"
                alt=""
                srcset=""
            />
          </span>
            <span class="ai-note whitespace-no-wrap"
            >AI Powered Advice&nbsp;</span
            >
            <span>&nbsp;{{ advice }}.</span>
          </div>
        </div>
      </div>
      <div class="stats-loading-box" v-else>
        Getting Stats... Hold on
      </div>
    </div>
  </div>
</template>
<style scoped>
.board {
  @apply flex flex-row justify-between items-center text-left md:text-center;
}
.board-items {
  border-width: 1px;
  @apply px-2 py-1  text-sm;
}
.first-board__items {
  @apply w-1/3;
}
.second-board__items {
  @apply w-1/2;
}

.third-board__items {
  @apply w-1/2;
}
.results-container {
  @apply w-1/2 flex flex-row justify-between;
}

.results-container .results {
  @apply bg-green-500 inline-block px-0.5 md:px-2 text-gray-50 text-center;
}

.first-results .results:nth-child(4) {
  @apply bg-gray-400;
}
.second-results .results:nth-child(3) {
  @apply bg-gray-400;
}
.second-results .results:nth-child(4),
.second-results .results:nth-child(5) {
  @apply bg-red-600;
}
.expected-outcomes__items {
  border-width: 1px;
  @apply w-1/3 px-2 py-1 text-center items-center;
}
.expected-outcomes__items:nth-child(1) {
  @apply rounded-l-lg;
}

.expected-outcomes__items:nth-child(3) {
  @apply rounded-r-lg;
}

.expected-goals__items {
  border-width: 1px;
  @apply w-1/2 px-2 py-1;
}
.expected-goals__items:nth-child(1) {
  @apply rounded-l-lg;
}
.expected-goals__items:nth-child(2) {
  @apply rounded-r-lg;
}
.footnote .ai-note {
  @apply bg-blue-300 text-blue-600 py-1 px-2 rounded-lg;
}
</style>
