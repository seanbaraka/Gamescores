import {getPredictions} from "~/common/api";

export default defineEventHandler(async (event) => {
    const params = getQuery(event);
    const fixtureId: string = params.fixture as string;
    if (!fixtureId) {
       throw createError({
           statusCode: 400,
           statusMessage: "Yoh, rada",
       });
    }
    const predictions: any = await getPredictions(fixtureId);
    return predictions;
})