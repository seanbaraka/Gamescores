import {BASE_URL, RAPID_HEADERS} from "~/common/rapidapi";

export default defineEventHandler(async (event) => {
    const response = await $fetch<any>(BASE_URL +'/v3/fixtures', {
        params: {
            date: '2023-08-11',
            league: "39",
            season: '2023'
        },
        headers: RAPID_HEADERS
    });
    console.log('Epl Matches being played tomorrow',response.response.length);
    console.log('The fixtures\n-------------');
    const dayjs = useDayjs();
    console.log(dayjs(response.response[0].fixture.timestamp))
    console.log(response.response[0].fixture.id)
    console.log(response.response[0].teams.home)
    console.log(response.response[0].teams.away)
    return []
})