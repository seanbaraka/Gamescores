import {getFixturesArchive} from "~/common/api";

export default defineEventHandler(async(event) => {
    const fixtureId = '1035048';
    const fixtureHistory = await getFixturesArchive(fixtureId)
    return [];
})