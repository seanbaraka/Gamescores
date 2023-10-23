import { AppDataSource } from "~/server/db/data-source"
import {User} from '~/server/db/models/User';

AppDataSource.initialize()
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => console.log(err));

export default defineEventHandler(async (event) => {   
    const repo = AppDataSource.getRepository(User);

    return {"Users": await repo.find()}

})
