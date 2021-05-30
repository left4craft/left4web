// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req });

  const { sub, user, uuid } = req.query;
  if (session && sub && user && uuid) {
    return res.send(`Sub: ${sub}, Email: ${session.user.email}, Username: ${user}, UUID: ${uuid}.`)
  } else {
    return res.send('Error: you are not signed in or missing parameter(s)!');
  }
}
