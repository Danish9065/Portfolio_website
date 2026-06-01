import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Load the Vercel API routes dynamically, including nested routes.
app.all(/^\/api\/(.+)$/, async (req, res) => {
  const route = req.params[0];
  if (!route || route.includes("..")) {
    return res.status(400).json({ error: "Invalid API route" });
  }

  try {
    const handler = (await import(`./api/${route}.ts`)).default;
    await handler(req, res);
  } catch (err) {
    console.error(`Error executing /api/${route}:`, err);
    res.status(500).json({ error: "Local dev API error", details: String(err) });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Local API Server running on http://localhost:${PORT}`);
});
