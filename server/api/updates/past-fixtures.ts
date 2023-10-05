import { getPastFixtures } from '~/common/api';
export default defineEventHandler(async () => {

  const pastFixtures = await getPastFixtures();
  return pastFixtures;
});
