import { User } from '~/server/db/models/User';

export default defineEventHandler(async (event) => {
  const repo = User.getRepository();
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
  const users = await repo.find();
  return { users };
});
