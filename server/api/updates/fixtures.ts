import {getFixtures} from "~/common/api";

export default defineEventHandler(async (event) => {
    const params = getQuery(event);
    // get the fixtures
    const matches = await getFixtures(params);
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