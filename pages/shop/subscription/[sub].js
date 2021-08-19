import { useRouter } from 'next/router';
import Image from 'next/image';
import {
	signIn, useSession
} from 'next-auth/client';
import { stripe_products } from '../../../utils/stripe_products';

export default function Sub() {
	const router = useRouter();
	const { sub } = router.query;
	const [session,
		loading] = useSession();

	if(!(sub in stripe_products.subscriptions)) {
		return <p>Product not found</p>;
	}

	if(loading) {
		return <p>Loading...</p>;
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
			<Image id="mc_preview" src="//:0" />
			<br />
			<div id="checkout_button_div" hidden>
				<input id="checkout_button" type="button" value="Subscribe" onClick={() => load_stripe(sub)} />
			</div>
		</>;
	} else {
		return <p> To check out, you must first sign in <button onClick={() => signIn(null, { callbackUrl: process.env.NEXT_PUBLIC_URL + '/shop/subscription/' + sub })}>Sign in</button> </p>;
	}
}

function on_user_changed() {
	document.getElementById('checkout_button').disabled = true;
	document.getElementById('mc_uuid').value = '';
	document.getElementById('mc_preview').style = 'display:none;';
	document.getElementById('checkout_button_div').hidden = false;


}

function validate_user() {
	const username = document.getElementById('mc_user').value;

	const uuid_request = new XMLHttpRequest();
	uuid_request.open('get',
		'/api/minecraft/getuuid/' + username);

	uuid_request.send();

	uuid_request.onload = () => {
		try {
			const uuid_response = JSON.parse(uuid_request.response);

			if(uuid_response.success) {
				document.getElementById('mc_user').value = uuid_response.name;

				// convert to format that plays nicer with crafatar and internal server databases
				let uuid = uuid_response.id;
				uuid = uuid.slice(0, 8) + '-' + uuid.slice(8, 12) + '-' + uuid.slice(12, 16) + '-' + uuid.slice(16, 20) + '-' + uuid.slice(20);

				document.getElementById('mc_uuid').value = uuid;
				document.getElementById('checkout_button').disabled = false;
				document.getElementById('mc_preview').style = '';
				document.getElementById('mc_preview').src = '/api/minecraft/getskin/' + uuid;

				document.getElementById('validate_button').value = 'Validate';
			} else {
				document.getElementById('checkout_button').disabled = true;
				document.getElementById('mc_uuid').value = '';
				document.getElementById('validate_button').value = 'Invalid Username!';
				document.getElementById('mc_preview').style = 'display:none;';
			}
		} catch (e) {
			document.getElementById('checkout_button').disabled = true;
			document.getElementById('mc_uuid').value = '';
			document.getElementById('validate_button').value = 'Invalid Username!';
			document.getElementById('mc_preview').style = 'display:none;';
		}
	};

}

function load_stripe(sub) {
	document.getElementById('checkout_button').disabled = true;
	document.getElementById('checkout_button').value = 'Loading...';

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
	const checkout_request = new XMLHttpRequest();
	checkout_request.open('get', '/api/subscribe/' + sub +
        '?user=' + encodeURIComponent(document.getElementById('mc_user').value) +
        '&uuid=' + encodeURIComponent(document.getElementById('mc_uuid').value));

	checkout_request.send();

	checkout_request.onload = () => {
		const checkout_response = JSON.parse(checkout_request.response);

		if(!checkout_response.success) {
			document.getElementById('checkout_button').disabled = false;
			document.getElementById('checkout_button').value = 'Error: ' + checkout_response.error;
		} else {
			/* eslint-disable no-undef */
			const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
			stripe.redirectToCheckout({ sessionId: checkout_response.session_id });
		}

	};
}
