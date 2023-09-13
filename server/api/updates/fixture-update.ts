import { H3Event } from 'h3';
import {updateFixtures} from "~/common/api";
import dayjs from "dayjs";

export default defineEventHandler(async (event: H3Event) => {
  const method = getMethod(event);
  if (method !== 'POST') {
    return;
  }
  const { selectedFixtures } = await readBody(event);
  try {
    for (let f = 0; f < selectedFixtures.length; f++) {
      await updateFixtures(selectedFixtures[f], dayjs(selectedFixtures[f].timestamp).format('YYYY-MM-DD'));
    }
    return { success: true }
  } catch (e: any) {
    console.log('Could not update fixtures. Reason', e.message);
    createError({ statusCode: 400, statusMessage: 'Could not update fixtures '});
  }
});
