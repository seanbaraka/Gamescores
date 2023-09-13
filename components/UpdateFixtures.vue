<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import dayjs from 'dayjs';

const isUpdatingFixture = ref(false);

const {
  data: leagues,
  pending: fetchingLeagues,
  error,
} = await useFetch('/api/updates/leagues');

const search = async (q: string) => {
  if (leagues.value) {
    return leagues.value.filter(
      (lg) =>
        lg.name.toLowerCase().includes(q.toLocaleLowerCase()) ||
        lg.country.toLowerCase().includes(q.toLocaleLowerCase()),
    );
  }
};

const selected = ref({ name: 'Premier League', id: '39', country: 'England' });

const date = ref(new Date());

const label = computed(() =>
  date.value.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
);

const fixtures = async (date?: string) => {
  const data = await $fetch(
    `/api/updates/fixtures?date=${dayjs(date).format('YYYY-MM-DD')}`,
  );
  return data
    .map((fx: any) => ({ id: fx.id, label: fx.teams }))
    .filter(Boolean);
};

const formatedDate = computed(() => dayjs(date.value).format('YYYY-MM-DD'));
</script>

<template>
  <div class="right-bar overflow-auto flex-1 min-h-[90vh]">
    <div class="fixture-form bg-gray-50 rounded-xl p-4">
      <h2
        class="form-header p-2 text-xl border-b-[1px] font-semibold"
        v-if="!isUpdatingFixture"
      >
        Update Today's Fixtures
      </h2>
      <div class="league-date-selection flex gap-4">
        <div class="league-selection flex-1 bg-transparent">
          <label for="league" class="text-xs">Choose A League</label>
          <USelectMenu
            class="min-w-full p-4"
            v-model="selected"
            :searchable="search"
            :options="leagues"
            id="league"
            placeholder="Search For a specific league"
            searchable-placeholder="Type the name of the league"
            v-if="leagues.length"
            by="id"
          >
            <template #label>
              <span v-if="selected" class="truncate"
                >{{ selected.name }} - {{ selected.country }}</span
              >
              <span v-else>Select League</span>
            </template>
            <template #option="{ option: league }">
              <span class="truncate"
                >{{ league.name }} - {{ league.country }}</span
              >
            </template>
            <template #option-empty="{ query }">
              <q>{{ query }}</q> not found
            </template>
          </USelectMenu>
        </div>
        <div class="date-selection flex-1">
          <label for="match-date" class="text-xs">Pick a match date</label>
          <UPopover :popper="{ placement: 'bottom-start' }" id="match-date">
            <UButton icon="i-heroicons-calendar-days-20-solid" :label="label" />
            <template #panel="{ close }">
              <ClientOnly>
                <DatePicker v-model="date" @close="close" />
              </ClientOnly>
            </template>
          </UPopover>
        </div>
      </div>
      <div class="fixture-selection py-2">
        <fixture-selection :date="formatedDate" :league="selected.id" />
      </div>
    </div>
  </div>
</template>
