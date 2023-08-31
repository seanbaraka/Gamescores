import {BASE_URL, LEAGUES, RAPID_HEADERS} from '~/common/rapidapi';

export const getFixtures = async (params: any, leagueId: number) => {
  // check for matches in the cache
  const cache = await useStorage().getItem(
    `redis:fixtures::${params.date}::${leagueId}`,
  );
  if (cache) {
    console.log('Returning fixtures from cache');
    // return JSON.parse(cache.toString())
    return cache as any[];
  }
  const apiCall: any = await $fetch<any>(BASE_URL + '/v3/fixtures', {
    params: {
      ...params,
      league: leagueId,
      season: '2023',
    },
    headers: RAPID_HEADERS,
  });
  if (!apiCall.response.length) {
    return [];
  }
  // save the data to redis
  await useStorage().setItem(
    `redis:fixtures::${params.date}::${leagueId}`,
    apiCall.response,
    { ttl: 60 * 60 * 24 },
  );

  return apiCall.response as any[];
};

export const getLeagues = async () => {
  // check for matches in the cache
  const cache = await useStorage().getItem(`redis:leagues`);
  if (cache) {
    console.log('Returning from cache');
    // return JSON.parse(cache.toString())
    return cache as any[];
  }
  const results: any[] = [];
  for (const leagueId of LEAGUES) {
    const apiCall = await $fetch<any>(BASE_URL + '/v3/leagues', {
      params: {
        id: leagueId
      },
      headers: RAPID_HEADERS,
    });
    const { league, country } = apiCall.response[0];
    results.push({ id: league.id, name: league.name, logo: league.logo, country: country.name })
  }

  // save the data to redis
  await useStorage().setItem(`redis:leagues`, results, { ttl: 60 * 60 * 24 });
  return results;
};

export const getFixturesArchive = async(fixtureId: string) => {
  try {
    const apiCall = await $fetch<any>(BASE_URL + '/v3/fixtures', {
      params: {
        id: fixtureId
      },
      headers: RAPID_HEADERS,
    });
    if (apiCall.response) {
      const fixture = apiCall.response[0];
      return {
        id: fixtureId,
        timestamp: fixture.fixture.timestamp * 1000,
        teams: fixture.teams,
        score: fixture.score.fulltime
      }
    }
  } catch (e: any) {
    console.log(`Could not fetch historical data for the fixture ${fixtureId}`, e.message)
  }
}


export async function getPredictions(fixtureId: string) {
  try {
    const apiCall = await $fetch<any>(BASE_URL + '/v3/predictions', {
      params: {
        fixture: fixtureId,
      },
      headers: RAPID_HEADERS,
    });
    if (apiCall.response) {
      const { winner, win_or_draw, under_over, goals, advice, percentage } = apiCall.response[0].predictions;
      const h2h = apiCall.response[0].h2h;
      return {
        winner,
        underOver: under_over,
        goals,
        advice,
        percentage
      }
    }
  } catch (e) {
    console.log('Could not load the predictions for the fixture', fixtureId)
  }
}
