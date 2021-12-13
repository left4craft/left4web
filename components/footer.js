import Link from 'next/link';

export function Footer() {
	return <>
		<div className='h-0.5 bg-gradient-to-r from-primary to-secondary' />
		<footer className="px-3 py-8 bg-dark text-2 text-gray-300 transition-colors duration-200">
			<div className="flex flex-col">
				<div className="md:hidden mt-7 mx-auto w-11 h-px rounded-full">
				</div>
				<div className="mt-4 md:mt-0 flex flex-col md:flex-row">
					<nav className="flex-1 flex flex-col items-center justify-center md:items-end md:border-r border-light md:pr-5">
						<Link href="/shop">
							<a aria-current="page" className="hover:text-white">Store</a>
						</Link>
						<Link href="/tos">
							<a aria-current="page" className="hover:text-white">Terms of Service</a>
						</Link>
						<Link href="/privacy">
							<a aria-current="page" className="hover:text-white">Privacy</a>
						</Link>
					</nav>
					<div className="md:hidden mt-4 mx-auto w-11 h-px rounded-full">
					</div>
					<div className="mt-4 md:mt-0 flex-1 flex items-center justify-center md:border-r border-light">
						<a className="hover:text-white" href="https://github.com/Left4Craft/left4web/">
							<span className="sr-only">
                            View on GitHub
							</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="text-xl hover:text-white transition-colors duration-200" viewBox="0 0 1792 1792">
								<path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z">
								</path>
							</svg>
						</a>
						<a className="ml-4 hover:text-white" href="https://discord.left4craft.org">
							<span className="sr-only">
                            Discord
							</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
								<path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
							</svg>
						</a>
					</div>
					<div className="md:hidden mt-4 mx-auto w-11 h-px rounded-full ">
					</div>
					<div className="mt-7 md:mt-0 flex-1 flex flex-col items-center justify-center md:items-start md:pl-5">
						<span className="">
                        © { new Date().getFullYear() }
						</span>
						<span className="mt-7 md:mt-1">
                        Created by&nbsp;
							<a className="underline hover:text-white" href="https://github.com/CaptnSisko/">
                            Sisko
							</a>
						&nbsp;and&nbsp;
							<a className="underline hover:text-white" href="https://github.com/eartharoid/">
                            Earth
							</a>

						</span>
					</div>
				</div>
			</div>
		</footer>
	</>;

}