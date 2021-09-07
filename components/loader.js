import PropTypes from 'prop-types';

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
