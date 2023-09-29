import { getOdds } from "~/common/api";

export default defineEventHandler(async (event) => {
    const { fixture } = getQuery(event);
    // console.clear();
    // console.log('fixtureId:',fixture);
    const odds = await getOdds(fixture);
    return odds;
}); 

