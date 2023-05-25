import { getDocs, collection, DocumentData } from "firebase/firestore/lite";
import { db } from "@/common/firebase"

export default defineEventHandler(async(event) => {
    const coll = event.context.params?.collection;
    if (!coll) return { status: 400, data: [] }
    let result: DocumentData = [];
    
    switch (coll) {
        case "fixtures":
            const fixturesCollection = collection(db, coll);
            const fixturesSnapshot = await getDocs(fixturesCollection);
            const fixturesList = fixturesSnapshot.docs.map(doc => doc.data());
            result = fixturesList;
            break;
        default:
            break;
    }
    return { data: result };
})