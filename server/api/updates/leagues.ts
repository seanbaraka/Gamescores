import {getLeagues} from "~/common/api";

export default defineEventHandler(async(event) => {
    // Retrieves a list of all available leagues.
    const leagues: any[] = await getLeagues();
    return leagues.map((league) => ({
        id: league.league.id,
        name: league.league.name,
        country: league.country.name,
        type: league.league.type,
        logo: league.league.logo,
    }));
})