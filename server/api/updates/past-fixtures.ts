import { getPastFixtures } from '~/common/api';
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const params = {
    query: query.last,
  };
  const pastFixtures = await getPastFixtures();
  return pastFixtures.map((fx: any) => ({
    home: fx.teams.home.name,
    away: fx.teams.away.name,
    correct:true,
    prediction:"Home Win",
    premium:true,
    odds:1.56,}
  ));
});
