import { getOdds } from "~/common/api";
// TODO: Filter out unused data
export default defineEventHandler(async (event) => {
    const { fixture } = getQuery(event);
    const odds = await getOdds(fixture);
    return odds;
}); 

