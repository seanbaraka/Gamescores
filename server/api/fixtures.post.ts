import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore/lite";
import { db } from "~/common/firebase";

export default defineEventHandler( async(event) => {
    const body = await readBody(event);
    // upload to firebase
    const fixturesCollection = collection(db, 'fixtures');
    const newFixture = await addDoc(fixturesCollection, body);
    return { id: newFixture.id };
})