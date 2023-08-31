<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps({ date: String });
const search = async (q) => {
  const fixtures = await $fetch('/api/updates/fixtures', {
    params: { date: props.date },
  });

  return fixtures
    .map((fx) => ({
      id: fx.id,
      timestamp: fx.timestamp,
      label: fx.teams.home.name + ' vs ' + fx.teams.away.name,
      home: { name: fx.teams.home.name, logo: { src: fx.teams.home.logo } },
      away: { name: fx.teams.away.name, logo: { src: fx.teams.away.logo } },
      avatar: { src: fx.league.logo },
      suffix: fx.league,
    }))
    .filter(Boolean);
};

const selected = ref();

const selectedFixtures = ref([])

const recordChange = (e) => {
 selectedFixtures.value.push(e);
}
</script>

<template>
  <div class="fixture-selection">
    <label for="fixture" class="text-xs font-semibold">Choose a Fixture</label>
    <USelectMenu
      v-model="selected"
      :searchable="search"
      placeholder="Choose the desired fixtures.."
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
            <UAvatar class="self-center h-20 w-20" :src="fixture.home.logo.src" size="2xs" />
            <div class="flex flex-col items-center">
              <UAvatar :src="fixture.avatar.src" size="3xs" />
              <span class="text-xs">{{ dayjs(fixture.timestamp).format('HH:mm') }}</span>
            </div>
            <UAvatar :src="fixture.away.logo.src" size="3xs" />
          </div>
          <span class="text-sm">{{ fixture.away.name }}</span>
          <Link class="">Remove</Link>
        </div>
      </div>
    </div>
  </div>
</template>
