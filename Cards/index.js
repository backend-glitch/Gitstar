
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Prevent favicon.ico 404
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.send("SVG Gradient Card API is running...");
});

//ex: /card?title=Hello&color1=ff00ff&color2=00ffff
app.get("/card", (req, res) => {
  const title = req.query.title || "My Gradient Card";
  const color1 = req.query.color1 || "ff7eb3";
  const color2 = req.query.color2 || "65c7f7";

  const svg = `
  <svg width="450" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
    </defs>

    <rect width="100%" height="100%" rx="16" fill="url(#grad)" />

    <text x="50%" y="55%" font-family="Verdana" font-size="28"
      fill="#ffffff" text-anchor="middle">
      ${title}
    </text>
  </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
