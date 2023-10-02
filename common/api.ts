import { BASE_URL, RAPID_HEADERS } from '~/common/rapidapi';

export enum TTL {
  DAILY = 60 * 60 * 24,
  WEEKLY = 86400 * 7,
  MONTHLY = 604801 * 4,
}

export const getFixtures = async (params: any) => {
  // check for matches in the cache
  try {
    const apiCall: any = await $fetch<any>(BASE_URL + '/v3/fixtures', {
      params: {
        ...params,
        season: '2023',
      },
      headers: RAPID_HEADERS,
    });
    if (!apiCall.response) {
      throw new Error(
        'Could not get any response from this side',
        apiCall.statusCode,
      );
    }
    if (!apiCall.response.length) {
      return [];
    }
    return apiCall.response as any[];
  } catch (e: any) {
    console.warn(e);
    console.log('An Error occurred when fetching fixtures', e.message);
  }
};

export const getLeagues = async () => {
  // check for matches in the cache
  const cache = await useStorage().getItem(`redis:fixtures`);
  if (cache) {
    // return JSON.parse(cache.toString())
    return cache as any[];
  }
  try {
    const apiCall = await $fetch<any>(BASE_URL + '/v3/leagues', {
      params: {
        season: '2023',
      },
      headers: RAPID_HEADERS,
    });
    if (!apiCall.response) {
      throw new Error(
        'Could not get any response from this side',
        apiCall.statusCode,
      );
    }
    const results = apiCall.response.map((lg: any) => ({
      id: lg.league.id,
      name: lg.league.name,
      logo: lg.league.logo,
      country: lg.country.name,
    }));
    // save the data to redis
    await useStorage().setItem(`redis:leagues`, results, { ttl: TTL.MONTHLY });
    return results;
  } catch (e: any) {
    console.log('An Error Occurred when fetching leagues', e.message);
  }
};

export const getFixturesArchive = async (fixtureId: string) => {
  try {
    const apiCall = await $fetch<any>(BASE_URL + '/v3/fixtures', {
      params: {
        id: fixtureId,
      },
      headers: RAPID_HEADERS,
    });
    if (apiCall.response) {
      const fixture = apiCall.response[0];
      return {
        id: fixtureId,
        timestamp: fixture.fixture.timestamp * 1000,
        teams: fixture.teams,
        score: fixture.score.fulltime,
      };
    }
  } catch (e: any) {
    console.log(
      `Could not fetch historical data for the fixture ${fixtureId}`,
      e.message,
    );
  }
};

export async function updateFixtures(selectedFixtures: any[], date: string) {
  let allFixtures: any[] = [];
  const fixtures = (await useStorage().getItem(
    `redis:fixtures::${date}`,
  )) as any[];
  if (fixtures && fixtures.length) {
    allFixtures = [...fixtures, ...selectedFixtures];
  } else {
    allFixtures = selectedFixtures;
  }
  return await useStorage().setItem(`redis:fixtures::${date}`, allFixtures, {
    ttl: TTL.WEEKLY,
  });
}

export async function getUpdatesFromCache(date: string) {
  const fixtures = (await useStorage().getItem(
    `redis:fixtures::${date}`,
  )) as any[];
  if (!fixtures || !fixtures.length) {
    return [];
  }
  return fixtures;
}

export async function getPredictions(fixtureId: string) {
  const cache = await useStorage().getItem(`redis:prediction:${fixtureId}`);
  if (cache) {
    console.log(`Fixture ${fixtureId} cache result`);
    return cache as any[];
  }
  // delete the cache
  // useStorage().removeItem(`redis:prediction:${fixtureId}`);

  try {
    const apiCall = await $fetch<any>(BASE_URL + '/v3/predictions', {
      params: {
        fixture: fixtureId,
      },
      headers: RAPID_HEADERS,
    });
    if (apiCall.response) {
      const { winner, win_or_draw, under_over, goals, advice, percent } =
        apiCall.response[0].predictions;
        // last five matches
        const lastFiveMatches:{home:string;away:string} = {home:apiCall.response[0].teams.home.league.form,away:apiCall.response[0].teams.away.league.form};
      const h2h = apiCall.response[0].h2h;
      interface respTypes{
        winner:object,
        underOver:string,
        goals:object,
        advice:string,
        percent:object,
        lastFiveMatches:object,
      }
      let resp:respTypes = {
        winner,
        underOver: under_over,
        goals,
        advice,
        percent,
        lastFiveMatches
      };    

      // save the data to redis
      await useStorage().setItem(`redis:prediction:${fixtureId}`, resp, {
        ttl: TTL.WEEKLY,
      });
      return resp;
    }
  } catch (e) {
    console.log('Could not load the predictions for the fixture', fixtureId);
  }
}

// Get ods for a fixture

export async function getOdds(fixtureId: any) {
  let odds: any[] = [];
  const cache = await useStorage().getItem(`redis:odds::${fixtureId}`);
  if (cache) {
    return cache as any[];
  }
  try {
    const apiCall = await $fetch<any>(BASE_URL + '/v3/odds', {
      params: {
        fixture: fixtureId,
      },
      headers: RAPID_HEADERS,
    });
    if (apiCall.response) {
      odds = apiCall.response[0].bookmakers[0].bets;
      await useStorage().setItem(`redis:odds::${fixtureId}`, odds);
    }
  } catch (e: any) {
    console.log('An error occurred while fetching a matches odds', e.message);
  }
  return odds;
}

// getOdds('568987');

//TODO: get past fixtures by passing fixtures from redis
export async function getPastFixtures() {
  try {
    let cachedFixtures = await useStorage().getItem('redis:fixtures::*')
    if(cachedFixtures){
      console.log('Cached fixtures', cachedFixtures)
    }else{
      console.log('No cached fixtures');
    }
  } catch (error) {
    console.log('An error occurred while fetching cached fixtures', error);
  }
  let pastFixtures: any[] = [];
  try {
    const apiCall = await $fetch<any>(BASE_URL + '/v3/fixtures', {
      params: {
        last: 10,
      },
      headers: RAPID_HEADERS,
    });
    if (apiCall.response) {
      pastFixtures = apiCall.response;
    }
  } catch (e: any) {
    console.log('An error occurred while fetching past fixtures', e.message);
  }
  return pastFixtures;
}

async function getLastFiveMatches(teamId: number) {
  let getLastFiveMatches: any[] = [];
  try {
    const apiCall = await $fetch<any>(BASE_URL + '/v3/fixtures', {
      params: {
        team: teamId,
        last: 5,
      },
      headers: RAPID_HEADERS,
    });
    if (apiCall.response) {
      getLastFiveMatches = apiCall.response;
      console.log('Last five matches', getLastFiveMatches);
    }
  } catch (e: any) {
    console.log(
      'An error occurred while fetching last five matches',
      e.message,
    );
  }
  return getLastFiveMatches;
}

