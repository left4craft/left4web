import Link from 'next/link';
import {
	signIn, signOut, useSession
} from 'next-auth/client';

export default function Shop() {
	const [session,
		loading] = useSession();

	if(loading) {
		return <>
        Loading...
		</>;
	}

	if(session) {
		return <>
        Signed in as {session.user.email} <br/>
			<Link href="/shop/subscription/userplus">Subscribe to User+</Link> <br />
			<Link href="/shop/subscription/donor">Subscribe to Donor</Link> <br />
			<button onClick={() => signOut()}>Sign out</button>
		</>;
	} else {
		return <>
        Not signed in <br/>
			<Link href="/shop/subscription/userplus">Subscribe to User+</Link> <br />
			<Link href="/shop/subscription/donor">Subscribe to Donor</Link> <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>;
	}

}
