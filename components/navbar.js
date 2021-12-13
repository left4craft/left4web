/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from 'react';

export function Navbar (props) {
	const [isOpen,
		setOpen] = useState(false);

	return <div>
		{/* eslint-disable-next-line react/prop-types */}
		<nav className={'bg-dark shadow' + (props.fixed ? ' fixed w-full' : 'absolute w-full') }>
			<div className="max-w-6xl mx-auto px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center" >
						<a className="flex-shrink-0" href="/">
							<img className="h-8 w-8" src="/images/logo.png" alt="Logo"/>
						</a>
						<div className="hidden md:block">
							<div className="ml-10 flex items-baseline space-x-4">
								<a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/">
                                Home
								</a>
								<a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/shop">
                                Shop
								</a>
								<a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="https://wiki.left4craft.org">
                                Wiki
								</a>
								<a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/vote">
                                Vote
								</a>
								<a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="https://bans.left4craft.org">
                                Bans
								</a>
								<a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="https://status.left4craft.org">
                                Status
								</a>
							</div>
						</div>
					</div>
					<div className="block">
						<div className="ml-4 flex items-center md:ml-6">
						</div>
					</div>
					<div className="-mr-2 flex md:hidden">
						<button className="text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none" onClick={() => {
							setOpen(!isOpen);
						} }>
							<svg width="20" height="20" fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
								<path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
								</path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className="md:hidden" hidden={!isOpen}>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					<a className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/">
                    Home
					</a>
					<a className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/shop">
                    Shop
					</a>
					<a className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="https://wiki.left4craft.org">
                    Wiki
					</a>
					<a className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/vote">
                    Vote
					</a>
					<a className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="https://bans.left4craft.org">
                    Bans
					</a>
					<a className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="https://status.left4craft.org">
                    Status
					</a>
				</div>
			</div>
		</nav>
	</div>;
}