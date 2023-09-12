import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const method = getMethod(event);
  if (method !== 'POST') {
    return;
  }
  const { selectedFixtures } = await readBody(event);
  console.log(selectedFixtures);
  return selectedFixtures;
});
