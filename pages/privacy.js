import Head from 'next/head';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';

export default function Privacy() {
	return (
		<div>
			<Head>
				<title>Left4Craft | Privacy</title>
				<meta name="title" content="Left4Craft | Privacy" />
			</Head>
			<Navbar />
			<div className="text-white text-center text-bold text-6xl bg-gradient-to-r from-primary to-secondary h-80 font-bold">
				<div className="h-32" />
				<h1>Privacy</h1>
			</div>
			<div className="text-white bg-dark center flex justify-center items-center">
				<div className="max-w-4xl p-8">
					<div className='text-center text-4xl font-bold p-8'>
						<h1>Privacy Policy for Left4Craft</h1>
					</div>

					<p>At Left4Craft, accessible from https://www.left4craft.org, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Left4Craft and how we use it.
					Left4Craft is not affiliated with Mojang AB.
					</p>
					<br />
					<p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>
					<br />
					<p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Left4Craft. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the <a href="https://www.privacypolicyonline.com/privacy-policy-generator/">Free Privacy Policy Generator</a>.</p>

					<div className='text-center text-2xl font-bold p-4'>
						<h1>Consent</h1>
					</div>

					<p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

					<div className='text-center text-2xl font-bold p-4'>
						<h1>Information we collect</h1>
					</div>

					<p>The personal information that you are asked to provide, and the reasons why you are asked to provide it,
						will be made clear to you at the point we ask you to provide your personal information.</p>
					<br />
					<p>If you contact us directly, we may receive additional information about you such as your name, email address, phone
					number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
					<br />
					<p>When you register for an Account, we may ask for your contact information, including items such as name, company name,
						address, email address, and telephone number.</p>

					<div className='text-center text-2xl font-bold p-4'>
						<h1>How we use your information</h1>
					</div>

					<p>We use the information we collect in various ways, including to:</p>
					<ul className='list-disc' >
						<li>Provide, operate, and maintain our website</li>
						<li>Improve, personalize, and expand our website</li>
						<li>Understand and analyze how you use our website</li>
						<li>Develop new products, services, features, and functionality</li>
						<li>Communicate with you, either directly or through one of our partners, including for customer service,
							to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
						<li>Send you emails</li>
						<li>Find and prevent fraud</li>
					</ul>

					<div className='text-center text-2xl font-bold p-4'>
						<h1>Log Files</h1>
					</div>

					<p>Left4Craft follows a standard procedure of using log files. These files log visitors when they visit websites.
						All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log
						files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp,
						referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally
						identifiable.
						The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website,
						and
						gathering demographic information.</p>

					<div className='text-center text-2xl font-bold p-4'>
						<h1>Cookies and Web Beacons</h1>
					</div>

					<p>Like any other website, Left4Craft uses &apos;cookies&apos;. These cookies are used to store information including
						visitors&apos;
						preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the
						users&apos;
						experience by customizing our web page content based on visitors&apos; browser type and/or other information.</p>
					<br />
					<p>For more general information on cookies, please read <a href="https://www.generateprivacypolicy.com/#cookies">the Cookies article on Generate Privacy Policy website</a>.</p>

					<div className='text-center text-2xl font-bold p-4'>
						<h1>Third Party Privacy Policies</h1>
					</div>

					<p>Left4Craft&apos;s Privacy Policy does not apply to other websites. Thus, we are advising you to consult
						the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their
						practices and instructions about how to opt-out of certain options. </p>
					<br />
					<p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie
						management with specific web browsers, it can be found at the browsers&apos; respective websites.</p>

					<div className='text-center text-2xl font-bold p-4'>
						<h1>CCPA Privacy Rights (Do Not Sell My Personal Information)</h1>
					</div>

					<p>Under the CCPA, among other rights, California consumers have the right to:</p>
					<ul className='list-disc' >
						<li>Request that a business that collects a consumer&apos;s personal data disclose the categories and specific pieces of
							personal data that a business has collected about consumers.</li>
						<li>Request that a business delete any personal data about the consumer that a business has collected.</li>
						<li>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data.</li>
					</ul>
					<br />
					<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights,
						please contact us.</p>

					<div className='text-center text-2xl font-bold p-4'>
						<h1>GDPR Data Protection Rights</h1>
					</div>

					<p>We would like to make sure you are fully aware of all of your data protection rights.
						Every user is entitled to the following:</p>
					<ul className='list-disc' >
						<li>The right to access - You have the right to request copies of your personal data. We may charge you a small fee
							for this service.</li>
						<li>The right to rectification - You have the right to request that we correct any information you believe is inaccurate.
							You also have the right to request that we complete the information you believe is incomplete.</li>
						<li>The right to erasure - You have the right to request that we erase your personal data, under certain conditions.</li>
						<li>The right to restrict processing - You have the right to request that we restrict the processing of your personal data,
							under certain conditions.</li>
						<li>The right to object to processing - You have the right to object to our processing of your personal data, under
							certain conditions.</li>
						<li>The right to data portability - You have the right to request that we transfer the data that we have collected to another
							organization, or directly to you, under certain conditions.</li>
					</ul>
					<br />
					<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights,
						please contact us.</p>

					<div className='text-center text-2xl font-bold p-4'>
						<h1>Children&apos;s Information</h1>
					</div>

					<p>Another part of our priority is adding protection for children while using the internet.
						We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
					<br />
					<p>Left4Craft does not knowingly collect any Personal Identifiable Information from children under the age of 13.
						If you think that your child provided this kind of information on our website, we strongly encourage you to
						contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>

					<div className='h-8' />
					<p>Last updated: December 28, 2021</p>
				</div>
			</div>

			<Footer />
		</div>
	);
}
