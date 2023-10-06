import { getPastFixtures } from '~/common/api';
export default defineEventHandler(async () => {
  const pastFixtures = await getPastFixtures();
  return pastFixtures.map((fx:any)=>({
    id:fx.fixture.id,
    date:fx.fixture.date,
    goals:fx.goals,
    teams:fx.teams,
  }));
});
