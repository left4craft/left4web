import { toNodeHandler } from 'better-auth/node';
import { getAuth } from '../../../utils/auth';

// better-auth handles all /api/auth/* routes, including the Discord OAuth
// callback at /api/auth/callback/discord (same path next-auth used)
export const config = { api: { bodyParser: false } };

export default (req, res) => toNodeHandler(getAuth())(req, res);
