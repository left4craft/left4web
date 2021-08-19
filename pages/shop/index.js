import {
	signIn, signOut, useSession
} from 'next-auth/client';
import { Profile } from '../../components/checkout';

export default function Shop() {
	const [session,
		loading] = useSession();

	return <Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />;


}
