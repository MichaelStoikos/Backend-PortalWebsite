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
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);

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

		const fetchComments = async () => {
			try {
				const response = await fetch(`http://localhost:5000/api/projects/${id}/comments`);
				const data = await response.json();
				setComments(data);
			} catch (error) {
				console.error("Failed to fetch comments:", error);
			}
		};

		fetchProject();
		fetchProjects();
		fetchComments();
	}, [id]);

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:5000/api/projects/${id}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: comment }),
			});
			if (response.ok) {
				const newComment = await response.json();
				setComments([...comments, newComment]);
				setComment("");
			} else {
				throw new Error("Failed to post comment");
			}
		} catch (error) {
			console.error(error.message);
		}
	};

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
							<a href={project.url} target="_blank">
								Visit Website
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="comments">
				<h2>Comments</h2>
				<ul>
					{comments.map((comment, index) => (
						<li key={index}>{comment.text}</li>
					))}
				</ul>
				<form onSubmit={handleCommentSubmit}>
					<textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." required></textarea>
					<button type="submit">Post Comment</button>
				</form>
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
