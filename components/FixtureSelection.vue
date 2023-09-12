<script setup lang="ts">
import dayjs from 'dayjs';
import { Ref } from 'vue';

const props = defineProps({ date: String, league: String });

const fixtures: Ref<any[]> = ref([]);
// const search = async (q) => {
//   console.log('fetching fixtures', props.date)
//   const fixtures = await $fetch('/api/updates/fixtures', {
//     params: { date: props.date },
//   });
//   console.log('obtained', fixtures.length)
//   return fixtures
//     .map((fx) => ({
//       id: fx.id,
//       timestamp: fx.timestamp,
//       label: fx.teams.home.name + ' vs ' + fx.teams.away.name,
//       home: { name: fx.teams.home.name, logo: { src: fx.teams.home.logo } },
//       away: { name: fx.teams.away.name, logo: { src: fx.teams.away.logo } },
//       avatar: { src: fx.league.logo },
//       suffix: fx.league,
//     }))
//     .filter(Boolean);
// };

const loadingFixtures = ref(true);

const getFixtures = async (date: string, league: string) => {
  console.log('The league', league);
  const { data, pending, error } = await useFetch<any[]>(
    '/api/updates/fixtures',
    {
      params: { date, league },
    },
  );
  if (pending.value) {
    loadingFixtures.value = pending.value;
  }
  if (data.value) {
    fixtures.value = data.value.map((fx) => ({
      id: fx.id,
      timestamp: fx.timestamp,
      label: fx.teams.home.name + ' vs ' + fx.teams.away.name,
      home: { name: fx.teams.home.name, logo: { src: fx.teams.home.logo } },
      away: { name: fx.teams.away.name, logo: { src: fx.teams.away.logo } },
      avatar: { src: fx.league.logo },
      suffix: fx.league,
    }));
    loadingFixtures.value = false;
  }
};

watch(props, async (n, o) => {
  // Retrieve a new list of fixtures when the date value changes
  console.log(n.date, n.league);
  if (!n.date || !n.league) return;
  await getFixtures(n.date, n.league);
});

const selected = ref();

const selectedFixtures: Ref<any[]> = ref([]);

const recordChange = (e: any) => {
  selectedFixtures.value.push(e);
};

const updatingFixtures = ref(false);
const updateFixtures = async () => {
  // do some updating here, alright;
  const { data, pending, error } = await useFetch(
    '/api/updates/fixture-update',
    {
      method: 'POST',
      body: {
        date: props.date,
        selectedFixtures: selectedFixtures.value.map((fx) => ({
          id: fx.id,
          timestamp: fx.timestamp,
          teams: { home: fx.home, away: fx.away },
          league: fx.suffix,
        })),
      },
    },
  );
  if (pending.value) {
    updatingFixtures.value = pending.value;
  }
  if (data.value) {
    updatingFixtures.value = false;
    // do something with the result that pops up.
    console.log(data.value);
  }
};
</script>

<template>
  <div class="fixture-selection">
    <label for="fixture" class="text-xs font-semibold"
      >Choose a Fixture {{ props.date }} {{ props.league }}</label
    >
    <USelectMenu
      v-model="selected"
      placeholder="Choose the desired fixtures.."
      :options="fixtures"
      by="id"
      @change="recordChange"
    >
      <template #label>
        <div class="flex justify-between gap-4" v-if="selected">
          <div class="home flex gap-2">
            <UAvatar
              v-if="selected.home.logo"
              v-bind="selected.home.logo"
              class="space-x-2"
              size="3xs"
            />
            <p>{{ selected.home.name }}</p>
          </div>
          <p>vs</p>
          <div class="away flex gap-2">
            <UAvatar
              v-if="selected.away.logo"
              v-bind="selected.away.logo"
              size="3xs"
            />
            <p>{{ selected.away.name }}</p>
          </div>
        </div>
      </template>
    </USelectMenu>
    <div class="fixtures-list">
      <div class="list" v-if="selectedFixtures.length">
        <div
          class="item p-2 rounded gap-4 grid grid-cols-5 items-center"
          v-for="fixture of selectedFixtures"
        >
          <span class="text-xs text-gray-400">{{ fixture.id }}</span>
          <span class="text-xs text-right">{{ fixture.home.name }}</span>
          <div class="mid-section flex items-center gap-2">
            <UAvatar
              class="self-center"
              size="2xs"
              :src="fixture.home.logo.src"
            />
            <div class="flex flex-col gap-1 items-center">
              <UAvatar :src="fixture.avatar.src" size="3xs" />
              <span class="text-xs">{{
                dayjs(fixture.timestamp).format('HH:mm')
              }}</span>
            </div>
            <UAvatar :src="fixture.away.logo.src" size="2xs" />
          </div>
          <span class="text-xs">{{ fixture.away.name }}</span>
          <UButton class="" variant="square">Remove</UButton>
        </div>
      </div>
    </div>
    <div class="submit-matches my-4">
      <UButton @click="updateFixtures" block :loading="updatingFixtures">
        <template #default>
          <span v-if="!updatingFixtures">Update Fixtures</span>
          <span v-else>Updating Fixtures</span>
        </template>
      </UButton>
    </div>
  </div>
</template>
