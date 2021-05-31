import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'
import { Head } from 'next/head'

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
            <input id="checkout_button" type="button" value="Subscribe" onClick={() => load_stripe(sub)} />
    </>
} else {
    return <p> To check out, you must first sign in <button onClick={() => signIn(null, {callbackUrl: process.env.NEXT_PUBLIC_URL + '/shop/subscription/' + sub})}>Sign in</button> </p>
}
}

function load_stripe(sub) {
    document.getElementById("checkout_button").disabled = true; 
    document.getElementById("checkout_button").value = "Loading..."; 
    
    const stripe_script = document.getElementById('stripe_script');
    if (!stripe_script) {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/'; // Stripe must be loaded externally
        script.id = 'stripe_script';
        document.body.appendChild(script);
    
        script.onload = () => {
            checkout(sub);
        };
    } else {
        checkout(sub);
    }
}

function checkout(sub) {
    let checkout_request = new XMLHttpRequest();
    checkout_request.open("get", "/api/subscribe/" + sub
        + "?user=" + encodeURIComponent(document.getElementById("mc_user").value)
        + "&uuid=" + encodeURIComponent(document.getElementById("mc_uuid").value));
    checkout_request.send();

    checkout_request.onload = () => {
        let checkout_response = JSON.parse(checkout_request.response);

        if(!checkout_response.success) {
            document.getElementById("checkout_button").disabled = false; 
            document.getElementById("checkout_button").value = "Error: " + checkout_response.error;    
        } else {
            var stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
            stripe.redirectToCheckout({
              sessionId: checkout_response.session_id
            })
        }
    
    }
}
