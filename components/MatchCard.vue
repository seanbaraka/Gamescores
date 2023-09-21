<script setup lang="ts">
// props
import dayjs from 'dayjs';
// get ods
import {getOdds} from '@/common/api';
interface propsTypes {
  leagueName: string;
  leagueLogo: string;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  id: string;
  timestamp: number;
}


const props: propsTypes = {
  leagueName: '',
  leagueLogo: '',
  homeTeam: '',
  homeLogo: '',
  awayTeam: '',
  awayLogo: '',
  id: '',
  timestamp: 0,
};
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

    statsLoaded.value = true;
    advice = cardData.value.advice;

    underOver = Number(cardData.value.underOver);
    goals = {
      home: Math.abs(Number(cardData.value.goals.home)),
      away: Math.abs(Number(cardData.value.goals.away)),
    };
    getOdds(id);
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
      :class="{ 'border-b-[1px] pb-4': showCard, 'border-b-0': !showCard }"
    >
      <div class="flex items-center gap-1 col-span-2">
        <img class="w-5 h-5" :src="leagueLogo" alt="" />
        <p class="text-xs">{{ leagueName }}</p>
      </div>
      <div class="text-xs col-span-3 text-right">{{ homeTeam }}</div>
      <div class="flex justify-center items-center col-span-3 gap-3">
        <div class="home-logo">
          <img :src="homeLogo" class="w-5 h-5" alt="" />
        </div>
        <div
          class="time-date col-span-1 text-xs flex flex-col items-center justify-center"
        >
          <div class="date">
            {{ dayjs(timestamp).format('D MMM') }}
          </div>
          <div class="time">
            {{ dayjs(timestamp).format('HH:mm') }}
          </div>
        </div>
        <div class="away-logo">
          <img :src="awayLogo" class="w-5 h-5" alt="" />
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
      class="card-container pt-2 text-xs justify-between transition duration-300"
    >
      <div class="stats-box flex" v-if="statsLoaded">
        <div class="pre-match-predictions w-1/2">
          <h3 class="text-sm font-medium">Prematch predictions</h3>
          <p class="text-gray-400 py-1">Type 1 x 2</p>
          <div class="board grid-cols-3">
            <span
              class="rounded-l-lg border-[1px] p-1.5 text-center"
              :class="
                winnerName === 'Home'
                  ? 'bg-green-500 text-gray-50 border-green-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              "
              >1&nbsp;Home</span>
            <span
              class="board-items"
              :class="
                winnerName !== 'Home' && winnerName !== 'Away'
                  ? 'bg-green-500 text-gray-100 border-green-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              "
              >X&nbsp;Draw</span>
            <span
              class="border-[1px] text-center p-1.5 border-gray-300 rounded-r-lg"
              :class="
                winnerName === 'Away'
                  ? 'bg-green-500 text-gray-50 border-green-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              "
              >2&nbsp;Away</span>
          </div>
          <h4 class="text-gray-400 mt-2 py-1">Type Ov/Un 1.5</h4>
          <div class="board grid-cols-2">
            <span
              class="board-items rounded-l-lg"
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
          <h4 class="text-gray-500 mt-2 py-1">Type Ov/Un 2.5</h4>
          <div class="board grid-cols-2">
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
          <h4 class="text-gray-500 text-xs">Last 5 matches</h4>
          <div class="last-five-matches flex gap-4 justify-between my-1">
            <div class="grid grid-cols-5">
              <span class="results won">W</span>
              <span class="results won">W</span>
              <span class="results won">W</span>
              <span class="results draw">D</span>
              <span class="results won">W</span>
            </div>
            <div class="grid grid-cols-5">
              <span class="results won">W</span>
              <span class="results won">W</span>
              <span class="results draw">D</span>
              <span class="results lost">L</span>
              <span class="results lost">L</span>
            </div>
          </div>

          <!-- Expected outcome -->
          <h4 class="mt-2 py-1 text-gray-500">Expected Outcome</h4>
          <div class="board grid-cols-3">
            <span
              class="board-items rounded-l-lg"
              :class="
                winnerName === 'Home'
                  ? 'bg-green-500 text-gray-50 border-green-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              "
              >{{ percent.home }} Home</span>
            <span
              class="board-items"
              :class="
                winnerName !== 'Home' && winnerName !== 'Away'
                  ? 'bg-green-500 text-gray-100 border-green-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              "
              >{{ percent.draw }} Draw</span>
            <span
              class="board-items rounded-r-lg"
              :class="
                winnerName === 'Away'
                  ? 'bg-green-500 text-gray-50 border-green-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              "
              >{{ percent.away }} Away</span>

          </div>

          <!-- Expected goals -->
          <h4 class="py-2 text-gray-500">Expected goals</h4>
          <div class="board grid-cols-2">
            <span
              class="board-items rounded-l-lg"
              :class="
                goals.home >= goals.away
                  ? 'bg-green-500 text-gray-50 border-green-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              "
              >1 Home Un. {{ goals.home }}</span
            ><span
              class="board-items rounded-r-lg"
              :class="
                goals.away > goals.home
                  ? 'bg-green-500 text-gray-50 border-green-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              "
              >2 Away Un. {{ goals.away }}</span
            >
          </div>

          <div class="py-2 flex flex-col my-4">
            <div class="banner relative">
              <img class="absolute top-[-18px] translate-y-1 rotate-1" src="@/assets/img/crown.png" alt="" srcset=""/>
              <span class="bg-blue-200 text-blue-600 px-2 py-1 mr-2 rounded-2xl">AI Powered Advice</span>
            </div>
            <div class="my-2">
              <span class="text-xs font-medium">{{ advice }}.</span>
            </div>

          </div>
        </div>
      </div>
      <div class="stats-loading-box" v-else>Getting Stats... Hold on</div>
    </div>
  </div>
</template>

<style scoped>
.board {
  @apply w-full grid;
}
.board-items {
  @apply border-[1px] p-1.5 text-center;
}

.results {
  @apply h-5 w-5 p-1 text-center text-xs mx-1;
}

.results.won {
  @apply text-white bg-green-500
}
.results.draw {
  @apply bg-gray-200
}

.results.lost {
  @apply bg-red-500 text-white
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

</style>
