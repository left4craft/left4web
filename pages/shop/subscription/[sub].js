import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'

export default function Sub() {
const router = useRouter()
const { sub } = router.query
const [ session, loading ] = useSession()

if(loading) {
    return <p>Loading...</p>
}

if(session) {
    return <>
        <p>TODO make this form do better validation on the client side</p>
            Email: {session.user.email} <br />
            Minecraft Username:&nbsp;
            <input id="mc_user" type="text" placeholder="Minecraft Username" /> <br />
            Minecraft UUID:&nbsp;
            <input id="mc_uuid" type="text" placeholder="Minecraft UUID" /> <br />
            <input type="button" value="Subscribe" onClick={() => subscribe_submit(sub)} />
    </>
} else {
    return <p> To check out, you must first sign in <button onClick={() => signIn(null, {callbackUrl: process.env.NEXT_PUBLIC_URL + '/shop/subscription/' + sub})}>Sign in</button> </p>
}
}

function subscribe_submit(sub) {
    window.location.href = "/api/subscribe/" + sub
        + "?user=" + encodeURIComponent(document.getElementById("mc_user").value)
        + "&uuid=" + encodeURIComponent(document.getElementById("mc_uuid").value);
}