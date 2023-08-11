import {BASE_URL, RAPID_HEADERS} from "~/common/rapidapi";

export default defineEventHandler(async(event) => {
    // Retrieves a list of all available leagues.
    const apiCall = await $fetch<any>(BASE_URL +'/v3/leagues', {
        headers: RAPID_HEADERS
    });
    const leagues: any[] = apiCall.response;
    return leagues.map((league) => ({
        id: league.league.id,
        name: league.league.name,
        country: league.country.name,
        type: league.league.type,
        logo: league.league.logo,
    }));
})