import React from "react";
import { Link } from "react-router-dom";

function Tile(props) {
	return (
		<div className="project-tile">
			<Link to={`/project/${props.id}`}>
				<div className="filterblack">
					<img src={props.image} alt="image" />
				</div>
				<div className="info">
					<h3>{props.naam}</h3>
					<h2>{props.website}</h2>
				</div>
			</Link>
		</div>
	);
}

export default Tile;
