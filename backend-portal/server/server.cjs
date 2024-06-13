const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let db;

async function main() {
	const client = new MongoClient(process.env.ATLAS_URI);
	try {
		await client.connect();
		db = client.db("BackEnd");
		console.log("Connected to MongoDB");
	} catch (e) {
		console.error(e);
	}
}

main();

app.get("/api/projects", async (req, res) => {
	try {
		const projects = await db.collection("Projects").find({}).toArray();
		res.json(projects);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

app.get("/api/projects/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const project = await db.collection("Projects").findOne({ id: parseInt(id) });
		if (!project) {
			res.status(404).json({ error: "Project not found" });
		} else {
			res.json(project);
		}
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

app.get("/api/projects/:id/comments", async (req, res) => {
	const { id } = req.params;
	try {
		const comments = await db
			.collection("Posts")
			.find({ projectId: parseInt(id) })
			.toArray();
		res.json(comments);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

app.post("/api/projects/:id/comments", async (req, res) => {
	const { id } = req.params;
	const { text } = req.body;
	try {
		const newComment = { projectId: parseInt(id), text, date: new Date() };
		const result = await db.collection("Posts").insertOne(newComment);
		res.json(newComment);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
