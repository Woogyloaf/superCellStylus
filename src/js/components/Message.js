"use strict";
import React from 'react';
import packageJSON from '../../../package.json';

class ReactMessage extends React.Component {
    render() {
    	const version = packageJSON.version;
		const style = {
			card: {
				width: "100%",
			    background: "#fff",
			    marginBottom: "20px",
			    borderRadius: "5px",
			    WebkitBoxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
			    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
			    position: "relative",
			    padding: "30px 40px 30px 40px",
			    marginTop: "20px"
			},
			version: {
				textAlign: 'center',
				margin: '-15px 0 40px'
			}
		};
        return (
        	<div className="container">
				  <div className="card" style={style.card}>
					<h1 className="logo">"SuperCell<SvgLogo /> Index Page"</h1>
					<p style={style.version}>version {version}</p>
					<p>Hello, this is a <strong>{this.props.phrase}</strong></p>
<a href="style-guide.html" target="_blank" title="Style guide">Style guide</a>
							<div className="sprite-santa-1">sprite-santa-</div>
							<div className="sprite-santa-2">sprite-santa-</div>
							<div className="sprite-santa-3">sprite-santa-</div>
							<div className="sprite-santa-4">sprite-santa-</div>

				</div>
			</div>
        );
    }
}

class SvgLogo extends React.Component {
	render(){
		return(
		<svg width="40px" viewBox="0 0 493 393" xmlns="http://www.w3.org/2000/svg"><g fill="#4A4A4A" fill-rule="evenodd"><path d="M140.305 22.393c-23.196 9.055-19.388 25.662-17.602 26.08 23.637-3.082 85.7-16.29 176.757-9.794 92.317 9.333 117.1 19 154.336 33.34 1.38 1.413 21.767-17.584 2.216-33.34-19.55-15.758-61.56-33.127-154.446-37.24-58.957-2.613-122.096 2.03-161.26 20.953z"/><path d="M40.75 162.79s44.236-35.972 127.443-43.944c83.207-7.97 140.68-1.408 140.68-1.408l30.29-30.295-6.676 32.176s102 18.558 118.208 43.47c22.532-2.472 38.797-25.118 41.68-43.47-.972-27.973-62.973-75.413-233.86-75.413S-4.517 86.554 1.042 122.937C6.602 159.32 40.75 162.79 40.75 162.79z"/><path d="M101.103 223.35l86.18-99.795s-118.617 5.176-135 55.41c-3.885 27.326 48.82 44.384 48.82 44.384zM193.43 123.262s50.588-2.09 61.854-2.09c11.266 0 46.853 2.354 46.853 2.354l-84.353 84.853-41.913-2.56 17.56-82.558zM331.05 127.262s109.002 16.587 109.002 52.145c0 35.558-51.472 43.5-51.472 43.5l15.68-21.823-87.298-6.854 14.088-66.968z"/><path d="M99.84 248.164l68.15-78.942-10.99 51.19 44.266 2.445-69.487 97.697 13.46-71.44-45.4-.95zM268.203 262.942l-24.416 129.273 132.606-178.53-77.046-4.953 13.894-75.408-120.906 125.15 75.87 4.468z"/></g></svg>
		);
	}
}

export default ReactMessage;
