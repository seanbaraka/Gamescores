// save a new user into db using typeorm
import { AppDataSource } from "~/server/db/data-source"
import {User} from '~/server/db/models/User';


  export default defineEventHandler(async (event) => {
    const userInfo =await readBody(event);
    const repo = AppDataSource.getRepository(User);
    const newUser = repo.create({
          email: userInfo.email,
            role: userInfo.role,
            isPremium: userInfo.isPremium,
            active: userInfo.active
    });
    await repo.save(newUser);
    if(await repo.findOneBy({email: userInfo.email})){
      return {status: 201, data: await repo.findOneBy({email: userInfo.email})}
    }else{
      return {status: 400, data: "User not added"}
    }
});