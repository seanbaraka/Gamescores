import {getLeagues} from "~/common/api";
// 
export default defineEventHandler(async(event) => {
    // Retrieves a list of all available leagues.
    const leagues: any[] = await getLeagues();
    const results: any[] = leagues.map((league) => ({
        id: league.id,
        name: league.name,
        country: league.country,
        logo: league.logo,
    }));
    return results;
})