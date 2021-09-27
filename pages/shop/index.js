import {
	signIn, signOut, useSession
} from 'next-auth/client';
import { Profile } from '../../components/profile';
import { Navbar } from '../../components/navbar';
import { SubscriptionCard } from '../../components/subscription_card';
import { OnlineTime } from '../../components/time_online';
import { useState } from 'react';

export default function Shop() {
	const [session,
		loading] = useSession();

	const [isAnnual,
		setAnnual] = useState(false);

	return <div>
		<Navbar />
		<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />

		<div className="text-white text-center text-bold text-6xl bg-gradient-to-r from-primary to-secondary h-80 font-bold">
			<div className="h-32" />
			<h1>Shop</h1>
		</div>

		<div className="text-white text-center text-bold text-4xl bg-dark font-bold">
			<div className="h-8" />
			<h2>Ranks</h2>
		</div>

		<div className="text-white text-center text-l bg-dark p-8">
			<p>Left4Craft has been around for over 8 years, and the best way to support its continued growth is by purchasing a recurring rank.
				<br />
				All players get a 1 month free trial on their first subscription.</p>
			<div className="h-8" />
		</div>

		<div className="flex justify-center bg-dark">
			<div className="relative inline-block w-10 mr-2 align-middle select-none">
				<input type="checkbox" name="toggle" onClick= { () => setAnnual(!isAnnual) } id="Annual" className="checked:bg-primary outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-light border-4 appearance-none cursor-pointer"/>
				<label htmlFor="Annual" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
				</label>
			</div>
			<span className="text-gray-400 font-medium align-middle">
				<b>Annual Billing</b> (save 20%)
			</span>
		</div>

		<div className="flex flex-wrap bg-dark justify-center">
			< SubscriptionCard rank="User+" annual={ isAnnual } />
			< SubscriptionCard rank="Donor" annual={ isAnnual } />
			< SubscriptionCard rank="Patron" annual={ isAnnual } />
			< SubscriptionCard rank="Patron+" annual={ isAnnual } />
		</div>
		<OnlineTime />
		<div className="bg-gradient-to-r from-primary to-secondary py-20 px-4 text-white">
			<div className="mx-auto max-w-6xl flex flex-col md:flex-row">
				<h2 className="mr-8 w-full md:w-1/3 text-3xl font-extrabold leading-9">
            Frequently-asked questions
				</h2>
				<dl className="w-full md:w-2/3">
					<dt className="mb-4">
						<h3 className="text-xl font-semibold">
                    We already have ongoing projects. Will Valohai easily integrate with them?
						</h3>
					</dt>
					<dd className="mb-16">
						<p>
                    Running existing machine learning projects in Valohai is very simple! Integration only requires adding a valohai.yaml configuration file. Moving projects in and out of Valohai is easy – the integration is only the configuration file.
						</p>
					</dd>
					<dt className="mb-4">
						<h3 className="text-xl font-semibold">
                    How do you compare to other data science platforms?
						</h3>
					</dt>
					<dd className="mb-16">
						<p>
                    We don’t. Valohai isn’t a data science platform; it&#x27;s a Machine Learning Management Platform that handles the whole ML pipeline from feature extraction, to training of your model and to deploying it into production in a reproducible manner. Data science platforms offer hosted notebooks and AutoML solutions.
						</p>
					</dd>
					<dt className="mb-4">
						<h3 className="text-xl font-semibold">
                    Does Valohai charge for computation?
						</h3>
					</dt>
					<dd className="mb-16">
						<p>
                    Depends. Most of our customers use their own cloud and thus pay for usage according to their own agreements. Valohai doesn&#x27;t charge anything on top of the per-user license fee. If you don&#x27;t have a cloud provider, you can use our AWS, GCP and Azure accounts, and we&#x27;ll only charge you for what you use.
						</p>
					</dd>
				</dl>
			</div>
		</div>

	</div>;


}
