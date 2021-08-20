import {
	signIn, signOut, useSession
} from 'next-auth/client';
import { Profile } from '../../components/profile';
import { Navbar } from '../../components/navbar';


export default function Shop() {
	const [session,
		loading] = useSession();

	return <div>
		<Navbar />
		<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />
	</div>;


}
