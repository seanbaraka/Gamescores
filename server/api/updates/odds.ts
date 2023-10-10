import { getOdds } from "~/common/api";
export default defineEventHandler(async (event) => {
    const { fixture } = getQuery(event);
    const odds = await getOdds(fixture);
    return odds;
}); 

