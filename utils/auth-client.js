import { magicLinkClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({ plugins: [magicLinkClient()] });

export const { useSession } = authClient;

// Matches the call sites that used next-auth's signIn()/signOut()
export function signIn() {
	window.location.href = '/login';
}

export function signOut() {
	authClient.signOut({ fetchOptions: { onSuccess: () => window.location.reload() } });
}
