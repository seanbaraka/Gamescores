<script>
</script>
<template>
        <div class="flex justify-between my-2 items-center text-sm px-4 py-[.75em] border rounded-lg"
                            :class="[fixture.correct ? 'bg-[#F8F8F8] border-[#4A7856] text-green-700' : 'bg-[#FFF5F9] text-[#FF4684] border-[#FFC8DA]']">
                            <p></p>
                            <p>{{ fixture.teams.home.name }}</p>
                            <p>vs</p>
                            <p>{{ fixture.teams.away.name }}</p>
                            <span v-if="fixture.correct">
                            <img src="@/assets/img/check-badge.svg" alt="">
                        </span>
                        <p>{{ fixture.prediction }}</p>
                        <p>{{ fixture.odds }}</p>
                    </div>
</template>
<style>
</style>