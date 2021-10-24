import {
	useEffect, useState
} from 'react';

// midnight on november 27, 2013
const server_founded = 1385532000000;

export function OnlineTime () {
	const [time,
		setTime] = useState(Date.now());

	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return <section className="bg-dark py-8 md:py-16">
		<div className="max-w-6xl mx-auto px-5 box-content">
			<div className="flex items-center flex-col md:flex-row -mx-5">
				<div className="w-full px-5 mb-5 md:mb-0 text-center md:text-left">
					<h3 className="font-bold font-heading text-xl md:text-2xl text-white">
						Thanks to your support, Left4Craft has been online for
					</h3>
				</div>
				<div className="w-full md:w-auto px-5 py-10">
					<div className="flex justify-center text-white text-center">
						<div className="w-20 md:w-24 border border-light-300 bg-light-100 rounded-lg py-3 md:py-4 mx-2">
							<div className="text-2xl md:text-3xl font-semibold">
								{ Math.floor((time - server_founded) / 86400000) }
							</div>
							<div className="opacity-75 text-xs mt-3 uppercase">
								{ Math.floor((time - server_founded) / 86400000) === 1 ? 'Day' : 'Days' }
							</div>
						</div>
						<div className="w-20 md:w-24 border border-light-300 bg-light-100 rounded-lg py-3 md:py-4 mx-2">
							<div className="text-2xl md:text-3xl font-semibold">
								{ Math.floor((time - server_founded) / 3600000) % 24 }
							</div>
							<div className=" opacity-75 text-xs mt-3 uppercase">
								{ Math.floor((time - server_founded) / 3600000) % 24 === 1 ? 'Hour' : 'Hours' }
							</div>
						</div>
						<div className="w-20 md:w-24 border border-light-300 bg-light-100 rounded-lg py-3 md:py-4 mx-2">
							<div className="text-2xl md:text-3xl font-semibold">
								{ Math.floor((time - server_founded) / 60000) % 60 }
							</div>
							<div className=" opacity-75 text-xs mt-3 uppercase">
								{ Math.floor((time - server_founded) / 60000) % 60 === 1 ? 'Minute' : 'Minutes' }
							</div>
						</div>
						<div className="w-20 md:w-24 border border-light-300 bg-light-100 rounded-lg py-3 md:py-4 mx-2">
							<div className="text-2xl md:text-3xl font-semibold">
								{ Math.floor((time - server_founded) / 1000) % 60 }
							</div>
							<div className=" opacity-75 text-xs mt-3 uppercase">
								{ Math.floor((time - server_founded) / 1000) % 60 === 1 ? 'Second' : 'Seconds' }
							</div>
						</div>
					</div>
				</div>
			</div>
			<h3 className="font-bold font-heading text-lg md:text-xl md:py-0 text-primary py-4">
						Only want to pay once?
			</h3>
			<div className="mt-4 w-full md:w-44">
				<button type="button" className="py-2 px-4 bg-primary hover:bg-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg ">
							One-Time Purchase
				</button>
			</div>

		</div>
	</section>;

}