import {
	signIn, signOut, useSession
} from 'next-auth/client';
import { Profile } from '../../utils/components/checkout';

export default function Shop() {
	const [session,
		loading] = useSession();

	return <Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />;


}
