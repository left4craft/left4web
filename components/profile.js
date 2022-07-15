import PropTypes from 'prop-types';
import Image from 'next/image';

export function Profile (props) {
	if(props.loading) {
		return <div className="shadow-lg bg-dark p-4">
			<div className="max-w-6xl mx-auto px-2">
				<div className="flex-row gap-4 flex items-center max-w-3xl">
					<div className="flex-shrink-0">
						<div className="mx-auto object-cover rounded-full h-16 w-16 bg-black" />
					</div>
					<div className=" flex flex-col">
						<span className="text-gray-400 text-xs">
						Loading...
						</span>
						<span className="text-white text-lg font-medium">
						Loading...
						</span>
					</div>
					<button type="button" onClick={props.signOut} className="py-2 px-4 bg-light animate-pulse text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg">
					Loading...
					</button>
				</div>
			</div>
		</div>;
	}


	if (props.session) {
		return <div className="shadow-lg bg-dark p-4">
			<div className="max-w-6xl mx-auto px-2">
				<div className="flex-row items-center gap-4 flex max-w-3xl ">
					<div className="flex-shrink-0">
						<Image height={ 64 } width={ 64 } className="mx-auto object-cover rounded-full" alt="profile" src={props.session.user.image} />
					</div>
					<div className="hidden md:block">
						<div className="flex flex-col">
							<span className="text-gray-400 text-xs">
						Logged in as
							</span>
							<span className="text-white text-lg font-medium">
								{props.session.user.email}
							</span>
						</div>

					</div>
					<button type="button" onClick={ redirect_to_manage } className="py-2 px-4  bg-primary hover:bg-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg focus:bg-light focus:animate-pulse">
						Manage Subscriptions
					</button>
					<button type="button" onClick={props.signOut} className="py-2 px-4 bg-primary hover:bg-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg focus:bg-light focus:animate-pulse">
					Log Out
					</button>
				</div>
			</div>

		</div>;

	} else {
		return <div className="shadow-lg bg-dark p-4">
			<div className="max-w-6xl mx-auto px-2">
				<div className="flex-row gap-4 flex items-center max-w-3xl">
					<div className="flex-shrink-0">
						<div className="mx-auto object-cover rounded-full h-16 w-16 bg-black" />
					</div>
					<div className=" flex flex-col">
						<span className="text-gray-400 text-xs">
						You must log in with your email to check out
						</span>
						<span className="text-white text-lg font-medium">
						not logged in
						</span>
					</div>
					<button type="button" onClick={props.signIn} className="py-2 px-4 bg-primary hover:bg-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg focus:bg-light focus:animate-pulse">
					Log In
					</button>
				</div>
			</div>
		</div>;
	}
}

function redirect_to_manage() {
	document.location.href='/api/subscribe/manage';
}

Profile.propTypes = {
	loading: PropTypes.bool,
	session: PropTypes.object,
	signIn: PropTypes.func,
	signOut: PropTypes.func
};

