// save a new user into db using typeorm
import { User } from '~/server/db/models/User';

export default defineEventHandler(async (event) => {
  const userInfo = await readBody(event);
  const repo = User.getRepository();
  const newUser = repo.create(userInfo);
  const userRecord = await repo.save(newUser);

  if (userRecord) {
    return { status: 201, data: userRecord };
  } else {
    return { status: 400, data: 'User not added' };
  }
});
