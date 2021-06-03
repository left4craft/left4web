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
			<a href="/shop/subscription/userplus">Subscribe to User+</a> <br />
			<a href="/shop/subscription/donor">Subscribe to Donor</a> <br />
			<button onClick={() => signOut()}>Sign out</button>
		</>;
	} else {
		return <>
        Not signed in <br/>
			<a href="/shop/subscription/userplus">Subscribe to User+</a> <br />
			<a href="/shop/subscription/donor">Subscribe to Donor</a> <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>;
	}

}
