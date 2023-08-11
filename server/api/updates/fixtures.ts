import {BASE_URL, RAPID_HEADERS} from "~/common/rapidapi";
import dayjs from 'dayjs';


export default defineEventHandler(async (event) => {
    const params = getQuery(event);
    const apiCall = await $fetch<any>(BASE_URL +'/v3/fixtures', {
        params: {
           ...params,
            season: '2023'
        },
        headers: RAPID_HEADERS
    });
    const matches: any[] = apiCall.response;
    if (!matches.length) {
        return []
    }
    return matches.map((fx) => ({
        id: fx.fixture.id,
        date: dayjs(fx.fixture.timestamp * 1000).format('DD-MM-YYYY'),
        time: dayjs(fx.fixture.timestamp * 1000).format('HH:mm'),
        teams: fx.teams,
        league: {
            id: fx.league.id,
            name: fx.league.name,
            logo: fx.league.logo
        }
    }));
})