function Layout(props) {
	return (
		<div className="page-layout">
			{/* eslint-disable-next-line react/prop-types */}
			{props.children}
			<style jsx global>{`
          body {
            background-color: rgb(46 46 46);
          }
        `}</style>
		</div>
	);
}

export default Layout;