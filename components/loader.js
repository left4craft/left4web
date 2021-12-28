import PropTypes from 'prop-types';

export function Spinner() {
	return <svg width="15" height="15" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
		<path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
		</path>
	</svg>;
}

Spinner.propTypes = { text: PropTypes.string };

export function Loader(props) {
	// https://github.com/tobiasahlin/SpinKit/blob/master/spinkit.css
	return <>
		<style>{`
		.sk-grid {
			width: ` + props.width + `px;
			height: ` + props.height + `px;
			/* Cube positions
			 * 1 2 3
			 * 4 5 6
			 * 7 8 9
			 */ 
		   }
		  .sk-grid-cube {
			  width: 33.33%;
			  height: 33.33%;
			  background-color: #` + props.color + `;
			  float: left;
			  animation: sk-grid 1.3s infinite ease-in-out; 
		  }
		  .sk-grid-cube:nth-child(1) { animation-delay: 0.2s; }
		  .sk-grid-cube:nth-child(2) { animation-delay: 0.3s; }
		  .sk-grid-cube:nth-child(3) { animation-delay: 0.4s; }
		  .sk-grid-cube:nth-child(4) { animation-delay: 0.1s; }
		  .sk-grid-cube:nth-child(5) { animation-delay: 0.2s; }
		  .sk-grid-cube:nth-child(6) { animation-delay: 0.3s; }
		  .sk-grid-cube:nth-child(7) { animation-delay: 0.0s; }
		  .sk-grid-cube:nth-child(8) { animation-delay: 0.1s; }
		  .sk-grid-cube:nth-child(9) { animation-delay: 0.2s; }
		  
		  @keyframes sk-grid {
			0%, 70%, 100% {
			  transform: scale3D(1, 1, 1); 
			} 35% {
			  transform: scale3D(0, 0, 1); 
			} 
		  }		  
      `}</style>
		<div className="sk-grid">
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
			<div className="sk-grid-cube"></div>
		</div>
	</>;
}

Loader.propTypes = {
	color: PropTypes.string,
	height: PropTypes.number,
	width: PropTypes.number
};
