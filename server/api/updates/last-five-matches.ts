// // TODO: Get last 5 matches from database
// import { getLastFiveMatches } from "~/common/api";
// export default defineEventHandler(async(event)=>{
//     const query = getQuery(event);
//     const params = {
//         team: query.team,
//         last:query.last
//     };
//     return await getLastFiveMatches(params.team);
// })