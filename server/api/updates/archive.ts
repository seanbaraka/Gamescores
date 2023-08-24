import {getFixturesArchive} from "~/common/api";

export default defineEventHandler(async(event) => {
    const fixtures: any[] = [];
    const fixtureId = '1035048'; // TODO: Get this from the list of stored fixtures
    const fixtureHistory = await getFixturesArchive(fixtureId);
    if(fixtureHistory) {
        fixtures.push(fixtureHistory)
    }
    return fixtures;
})