import {BASE_URL, RAPID_HEADERS} from "~/common/rapidapi";
import {match} from "assert";

export const getFixtures = async (params: any) => {
    // check for matches in the cache
    const cache = await useStorage().getItem(`redis:fixtures::${params.date}::${params.league}`);
    if (cache) {
        console.log('Returning from cache')
        // return JSON.parse(cache.toString())
       return cache as any[];
    }
    const apiCall: any = await $fetch<any>(BASE_URL +'/v3/fixtures', {
        params: {
            ...params,
            season: '2023'
        },
        headers: RAPID_HEADERS
    });
    if (!apiCall.response.length) {
        return []
    }
    // save the data to redis
    await useStorage().setItem(`redis:fixtures::${params.date}::${params.league}`, apiCall.response);
    return apiCall.response;
}

export const getLeagues = async () => {
    // check for matches in the cache
    const cache = await useStorage().getItem(`redis:leagues`);
    if (cache) {
        console.log('Returning from cache')
        // return JSON.parse(cache.toString())
        return cache as any[];
    }
    const apiCall = await $fetch<any>(BASE_URL +'/v3/leagues', {
        headers: RAPID_HEADERS
    });
    if (!apiCall.response.length) {
        return []
    }
    // save the data to redis
    await useStorage().setItem(`redis:leagues`, apiCall.response);
    return apiCall.response;
}