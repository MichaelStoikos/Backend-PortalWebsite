import Header from "../component/header.jsx";
import Background from "/src/assets/Background.jpg";
import DATA from "../api/BackendProjecten.json";
import Tile from "../component/tile.jsx";
import React from "react";

function Home() {
	return (
		<>
			<Header />
			<div className="wrapper">
				<div className="header">
					<img src={Background} alt="background" />
					<h1>BACKEND PROJECTEN</h1>
				</div>
				<div className="projecten">
					<h1>Alle projecten</h1>
					<div className="tiles">
						{DATA.map((project) => (
							<Tile key={project.id} id={project.id} image={project.image} website={project.website} naam={project.naam} url={project.url} description={project.description} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
