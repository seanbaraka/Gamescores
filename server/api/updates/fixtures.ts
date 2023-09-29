import { getUpdatesFromCache} from '~/common/api';
import dayjs from 'dayjs';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const params = {
    date: dayjs(query.date as string).format('YYYY-MM-DD'),
    league: query.league,
  };
  // get the fixtures
  const date = dayjs(Date.now()).format('YYYY-MM-DD');

  return await getUpdatesFromCache(date);

  // return matches.map((fx: any) => ({
  //   id: fx.fixture.id,
  //   timestamp: fx.fixture.timestamp * 1000,
  //   teams: fx.teams,
  //   league: {
  //     id: fx.league.id,
  //     name: fx.league.name,
  //     logo: fx.league.logo,
  //   },
  // }));
});

