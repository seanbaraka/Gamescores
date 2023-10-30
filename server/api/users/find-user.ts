import { AppDataSource } from "~/server/db/data-source";
import { User } from "~/server/db/models/User";

export default defineEventHandler(async (event) => {
const userId = await getQuery(event).id;
const repo = AppDataSource.getRepository(User);
try{
    if (userId) {
        const user = await repo.findOne({ where: { id: Number(userId) } });
        if (user) {
            console.log(user);
            return { status: 200, data: user };
        } else {
            return { status: 404, data: "User not found" };
        }
    } else {
        const users = await repo.find();
        if(users){
            console.log(users)
            return {status:200,data:users}
        }else{
            return {status: 404, data: "No users found"}
        }
    }


}catch(e){
    return {status: 500, data: "Internal Server Error"}
}

});