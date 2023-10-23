import { AppDataSource } from '~/server/db/data-source';
import { User } from '~/server/db/models/User';

AppDataSource.initialize()
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => console.log(err));

export default defineEventHandler(async (event) => {
  const repo = AppDataSource.getRepository(User);
  const query = getQuery(event);

  if (query.email) {
    const email = query.email as string;
    // get the specific user details
    const user = await repo.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      console.log('no user found');
      return createError({
        statusCode: 404,
        message: 'Could not find user with the given email address',
      });
    }

    return { user };
  }
  return { users: await repo.find() };
});
