export default function NextAuth() {
	return <div>
		<p>{process.env.NEXTAUTH_URL}</p>
	</div>;
}
