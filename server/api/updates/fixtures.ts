import {getFixtures} from "~/common/api";
import {LEAGUES} from "~/common/rapidapi";
import dayjs from 'dayjs'

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const params = { date: dayjs(query.date as string).format('YYYY-MM-DD') }
    // get the fixtures
    let matches: any[] = [];
    for (let i = 0; i < LEAGUES.length; i++) {
        const fixtures = await getFixtures(params, LEAGUES[i]);
        matches = [...matches, ...fixtures];
    }
    return matches.map((fx: any) => ({
        id: fx.fixture.id,
        timestamp: fx.fixture.timestamp * 1000,
        teams: fx.teams,
        league: {
            id: fx.league.id,
            name: fx.league.name,
            logo: fx.league.logo
        }
    }));
})