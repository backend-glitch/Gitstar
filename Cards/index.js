import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.send("SVG Gradient Card API is running...");
});

app.get("/card", (req, res) => {
  const title = req.query.title || "My Gradient Card";
  const color1 = req.query.color1 || "pink";
  const color2 = req.query.color2 || "purple";
  const textcolor = req.query.textcolor || "white";
  const width = req.query.width || 450;
  const height = req.query.height || 140;
  const family = req.query.family || "cursive";

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
    </defs>

    <rect width="100%" height="100%" rx="16" fill="url(#grad)" />

    <text x="50%" y="55%" font-family="${family}" font-size="28"
      fill="${textcolor}" text-anchor="middle">
      ${title}
    </text>
  </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});

export default app;



// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
