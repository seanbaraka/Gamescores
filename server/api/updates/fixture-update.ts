import { H3Event } from 'h3';
import {updateFixtures} from "~/common/api";

export default defineEventHandler(async (event: H3Event) => {
  const method = getMethod(event);
  if (method !== 'POST') {
    return;
  }
  const { selectedFixtures, date } = await readBody(event);
  try {
    await updateFixtures(selectedFixtures, date);
    return { success: true }
  } catch (e: any) {
    console.log('Could not update fixtures. Reason', e.message);
    createError({ statusCode: 400, statusMessage: 'Could not update fixtures '});
  }
});
