<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps({ date: String, league: String });

const fixtures = ref([])
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
  console.log('The league', league)
  const { data, pending, error } = await useFetch('/api/updates/fixtures', {
    params: { date, league }
  });
  if (pending.value) {
    loadingFixtures.value = pending.value;
  }
  if (data) {
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
}

watch(props, async(n, o) => {
  // Retrieve a new list of fixtures when the date value changes
  console.log(n.date, n.league )
  const newDate = n.date;
  await getFixtures(newDate, n.league);
})

const selected = ref();

const selectedFixtures = ref([])

const recordChange = (e) => {
 selectedFixtures.value.push(e);
}
</script>

<template>
  <div class="fixture-selection">
    <label for="fixture" class="text-xs font-semibold">Choose a Fixture {{ props.date }} {{ props.league }}</label>
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
        <div class="item p-2 rounded gap-4 grid grid-cols-5 items-center" v-for="fixture of selectedFixtures">
          <span class="text-xs text-gray-400">{{ fixture.id }}</span>
          <span class="text-sm text-right">{{ fixture.home.name }}</span>
          <div class="mid-section flex items-center gap-4">
            <UAvatar class="self-center" size="sm" :src="fixture.home.logo.src" />
            <div class="flex flex-col items-center">
              <UAvatar :src="fixture.avatar.src" size="3xs" />
              <span class="text-xs">{{ dayjs(fixture.timestamp).format('HH:mm') }}</span>
            </div>
            <UAvatar :src="fixture.away.logo.src" size="sm" />
          </div>
          <span class="text-sm">{{ fixture.away.name }}</span>
          <Link class="">Remove</Link>
        </div>
      </div>
    </div>
  </div>
</template>
