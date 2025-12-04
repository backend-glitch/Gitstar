import express from "express";

const app = express();

app.get("/", (req, res) => {
  const { date, title = "Countdown" } = req.query;

  if (!date) {
    return res.send(`
      <svg width="200" height="20" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="20" fill="#555" />
        <text x="100" y="14" font-family="Verdana" font-size="11" fill="#fff" text-anchor="middle">Error: ?date=YYYY-MM-DD</text>
      </svg>
    `);
  }

  const target = new Date(date);
  const today = new Date();
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));

  const leftColor = "#555";    // Label background
  const rightColor = "#4c1";   // Value background
  const width = 120 + (diff.toString().length * 8); // adjust width based on number length

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20">
      <linearGradient id="b" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <mask id="a">
        <rect width="${width}" height="20" rx="3" fill="#fff"/>
      </mask>
      <g mask="url(#a)">
        <rect width="70" height="20" fill="${leftColor}"/>
        <rect x="70" width="${width-70}" height="20" fill="${rightColor}"/>
        <rect width="${width}" height="20" fill="url(#b)"/>
      </g>
      <g fill="#fff" text-anchor="middle" font-family="Verdana" font-size="11">
        <text x="35" y="14">${title}</text>
        <text x="${70 + (width-70)/2}" y="14">${diff} days</text>
      </g>
    </svg>
  `;

  res.set("Content-Type", "image/svg+xml");
  res.send(svg);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
