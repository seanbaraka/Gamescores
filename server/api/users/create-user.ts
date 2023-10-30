// save a new user into db using typeorm
import { AppDataSource } from "~/server/db/data-source"
import {User} from '~/server/db/models/User';

//   export default defineEventHandler(async (event) => {
//     const userInfo =await readBody(event);
//     const repo = AppDataSource.getRepository(User);
//     const newUser = repo.create({
//           email: userInfo.email,
//             role: userInfo.role,
//             isPremium: userInfo.isPremium,
//             active: userInfo.active
//     });
//     await repo.save(newUser);
//     if(await repo.findOneBy({email: userInfo.email})){
//       return {status: 201, data: await repo.findOneBy({email: userInfo.email})}
//     }else{
//       return {status: 400, data: "User not added"}
//     }
// });


export default defineEventHandler(async (event) => {
  const userInfo = await readBody(event);
  const repo = AppDataSource.getRepository(User);

  try {
    // Check if a user with the same email already exists
    const existingUser = await repo.findOne({ where: { email: userInfo.email } });

    if (existingUser) {
      return { status: 400, data: 'User with this email already exists' };
    }

    // Create and save the new user
    const newUser = repo.create({
      email: userInfo.email,
      role: userInfo.role,
      isPremium: userInfo.isPremium,
      active: userInfo.active,
    });

    await repo.save(newUser);

    return { status: 201, data: newUser };
  } catch (error) {
    // Handle any potential errors here
    return { status: 500, data: 'Internal Server Error' };
  }
});
