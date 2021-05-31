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
            Email: {session.user.email} <br />
            Minecraft Username:&nbsp;
            <input id="mc_user" type="text" placeholder="Minecraft Username" onChange={() => on_user_changed()} /> <br />
            <input id="validate_button" type="button" value="Validate" onClick={() => validate_user()} />

            <br />  <br />
            Minecraft UUID:&nbsp;   
            <input id="mc_uuid" type="text" placeholder="Minecraft UUID" disabled /> <br />

            <br /> <br />
            <img id="mc_preview" src="//:0"></img>
            <br />
            <div id="checkout_button_div" hidden>
                <input id="checkout_button" type="button" value="Subscribe" onClick={() => load_stripe(sub)} />
            </div>
    </>
} else {
    return <p> To check out, you must first sign in <button onClick={() => signIn(null, {callbackUrl: process.env.NEXT_PUBLIC_URL + '/shop/subscription/' + sub})}>Sign in</button> </p>
}
}

function on_user_changed() {
    document.getElementById("checkout_button").disabled = true;
    document.getElementById("mc_uuid").value = "";
    document.getElementById("mc_preview").style = "display:none;";
    document.getElementById("checkout_button_div").hidden = false;


}

function validate_user() {
    const username = document.getElementById("mc_user").value;
    
    const mojang_request = new XMLHttpRequest();
    mojang_request.open("get", 
        "https://api.mojang.com/users/profiles/minecraft/" + username);
    mojang_request.send();

    mojang_request.onload = () => {
        try {
            const mojang_response = JSON.parse(mojang_request.response);

            if(mojang_response.name !== undefined && mojang_response.id !== undefined) {
                document.getElementById("mc_user").value = mojang_response.name;

                // convert to format that plays nicer with crafatar and internal server databases
                let uuid = mojang_response.id;
                uuid = uuid.slice(0,8) + '-' + uuid.slice(8, 12) + '-' + uuid.slice(12, 16) + '-' + uuid.slice(16, 20) + '-' + uuid.slice(20);

                document.getElementById("mc_uuid").value = uuid;
                document.getElementById("checkout_button").disabled = false;
                document.getElementById("mc_preview").style = "";
                document.getElementById("mc_preview").src = "https://mc-heads.net/player/" + uuid;

                document.getElementById("validate_button").value = "Validate";
            } else {
                document.getElementById("checkout_button").disabled = true;
                document.getElementById("mc_uuid").value = "";
                document.getElementById("validate_button").value = "Invalid Username!";
                document.getElementById("mc_preview").style = "display:none;";
            }    
        } catch (e) {
            document.getElementById("checkout_button").disabled = true;
            document.getElementById("mc_uuid").value = "";
            document.getElementById("validate_button").value = "Invalid Username!";
            document.getElementById("mc_preview").style = "display:none;";
        }
    }

}

function load_stripe(sub) {
    console.log("Hello");
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
            });
        }
    
    }
}
