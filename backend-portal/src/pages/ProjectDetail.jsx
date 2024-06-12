import React from "react";
import { useParams } from "react-router-dom";
import DATA from "../api/BackendProjecten.json";

function ProjectDetail() {
	const { id } = useParams();
	const project = DATA.find((project) => project.id === parseInt(id));

	if (!project) {
		return <div>Project not found</div>;
	}

	return (
		<div>
			<h1>{project.website}</h1>
			<img src={project.image} alt={project.website} />
			<h2>{project.naam}</h2>
			<p>{project.description}</p>
			<a href={project.url}>Visit Website</a>
		</div>
	);
}

export default ProjectDetail;
