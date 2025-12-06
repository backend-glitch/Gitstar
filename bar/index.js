import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Example URL:
// /skills?list=JS:80,C++:60,Rust:40

app.get("/skills", (req, res) => {
  const list = req.query.list;

  if (!list) {
    return res.type("image/svg+xml").send(`
      <svg width="400" height="60">
        <text x="10" y="35" font-size="20" fill="red">
          Error: ?list=JS:80,C++:60 required
        </text>
      </svg>
    `);
  }

  const items = list.split(","); // ["JS:80:blue", "C++:60:red", "Rust:40:green"]

  const badgeHeight = 60;
  const totalHeight = items.length * badgeHeight + 20;
  let badges = "";

  items.forEach((item, index) => {
    let [name, level,color] = item.split(":");
    level = Number(level) || 0;

    const y = index * badgeHeight + 10;

    const filled = (level / 100) * 250; 

    badges += `
      <g transform="translate(10, ${y})">
        
        <!-- Background -->
        <rect width="350" height="50" rx="12" fill="#1f1f1f" />

        <!-- Skill Name -->
        <text x="20" y="22" fill="white" font-size="18" font-family="Arial">
          ${name}
        </text>

        <!-- Percentage -->
        <text x="300" y="22" fill="white" font-size="18" font-family="Arial">
          ${level}%
        </text>

        <!-- Progress Bar Background -->
        <rect x="20" y="28" width="310" height="10" rx="5" fill="white" />

        <!-- Progress Bar Fill -->
        <rect x="20" y="28" width="${filled}" height="10" rx="5" fill="${color}" />

      </g>
    `;
  });

  const svg = `
    <svg width="380" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
      ${badges}
    </svg>
  `;

  res.type("image/svg+xml").send(svg);
});

export default app;
// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });