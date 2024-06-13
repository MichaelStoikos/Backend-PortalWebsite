import Header from "../component/header.jsx";
import Background from "/src/assets/Background.jpg";
import Tile from "../component/tile.jsx";
import React, { useEffect, useState } from "react";

function Home() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/projects");
				const data = await response.json();
				setProjects(data);
			} catch (error) {
				console.error("Failed to fetch projects:", error);
			}
		};

		fetchProjects();
	}, []);

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
						{projects.map((project) => (
							<Tile key={project.id} id={project.id} image={project.visual} website={project.website} naam={project.naam} url={project.url} description={project.description} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
