<script setup lang="ts">

const props = defineProps({
    fixture: Object
})
</script>
<template>
        <div class="flex justify-between my-2 items-center text-sm px-4 py-[.75em] border rounded-lg bg-gray-50 border-green-500 text-green-500"
                            >
                            <span class="flex flex-row justify-around">
                                <img class="w-5 h-5" :src="fixture.league.logo" alt="gamescores">
                                <p class="pl-2">{{ fixture.league.name }}</p>
                            </span>
                            <p>{{ fixture.date.split('T')[0] }}</p>
                            <span class="flex flex-row justify-between">
                                <img class="w-5 h-5" :src="fixture.teams.home.logo" alt="gamescores home team logo">
                                <p class="pl-2">{{ fixture.teams.home.name }}</p>
                            </span>
                            <p class="text-gray-50 bg-green-500 px-2 py-1 rounded-3xl">{{ fixture.goals.home + " : " + fixture.goals.away }}</p>
                            <span class="flex flex-row justify-between">
                                <img class="w-5 h-5" :src="fixture.teams.away.logo" alt="gamescores away team logo">
                                <p class="pl-2">{{ fixture.teams.away.name }}</p>                    
                            </span>
                    </div>
</template>
<style>
</style>