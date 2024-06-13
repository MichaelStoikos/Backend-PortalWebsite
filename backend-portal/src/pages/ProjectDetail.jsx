import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../component/header.jsx";
import Arrow from "/src/assets/Icon feather-arrow-left.png";
import Tile from "../component/tile.jsx";

function ProjectDetail() {
	const { id } = useParams();
	const [project, setProject] = useState(null);
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const response = await fetch(`http://localhost:5000/api/projects/${id}`);
				if (!response.ok) {
					throw new Error("Failed to fetch project data");
				}
				const data = await response.json();
				setProject(data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};

		const fetchProjects = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/projects");
				const data = await response.json();
				setProjects(data);
			} catch (error) {
				console.error("Failed to fetch projects:", error);
			}
		};

		fetchProject();
		fetchProjects();
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!project) {
		return <div>Project not found</div>;
	}

	return (
		<>
			<Header />
			<div className="wrapper2">
				<div className="flex-Terug">
					<Link to="/">
						<img src={Arrow} alt="arrow" />
						<h2>Terug naar alle projecten</h2>
					</Link>
				</div>
				<div className="header-Info">
					<div className="circle-placeholder">
						<img src={project.visual} alt={project.website} />
					</div>
					<div>
						<h1>{project.website}</h1>
						<h2>{project.naam}</h2>
					</div>
				</div>
				<div className="flex-info">
					<div className="flex-VERT">
						<img className="FirstImage" src={project.image} alt={project.website} />
						<div className="flex-HOR">
							<img className="SecImages" src={project.image1} alt={project.website} />
							<img className="SecImages" src={project.image2} alt={project.website} />
						</div>
						<div className="flex-HOR">
							<img className="SecImages" src={project.image3} alt={project.website} />
							<img className="SecImages" src={project.image4} alt={project.website} />
						</div>
					</div>
					<div className="Beschrijving">
						<h1>Beschrijving</h1>
						<p>{project.description}</p>
						<h1>Genre</h1>
						<p>{project.genre}</p>
						<div>
							<a href={project.url}>Visit Website</a>
						</div>
					</div>
				</div>
			</div>
			<div className="wrapper">
				<div>
					<div>
						<h1>Alle Projecten</h1>
					</div>
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

export default ProjectDetail;
