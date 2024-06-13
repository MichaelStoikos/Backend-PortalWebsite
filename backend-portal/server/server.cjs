const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const app = express();
const port = 5000;

app.use(cors());

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

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
