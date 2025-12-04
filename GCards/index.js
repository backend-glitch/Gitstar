import express from "express";

const app = express();

// Helper to generate error SVG
function errorSVG(message, color = "red") {
  return `
    <svg width="400" height="60" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}" rx="12" />
      <text x="50%" y="50%" fill="white" font-size="20" text-anchor="middle" dominant-baseline="middle">
        ${message}
      </text>
    </svg>
  `;
}

app.get("/github", async (req, res) => {
  const username = req.query.user;

  if (!username) {
    return res.type("image/svg+xml").send(errorSVG("Error: ?user=username required"));
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (data.message === "Not Found") {
      return res.type("image/svg+xml").send(errorSVG("User not found", "orange"));
    }

    if (data.message && data.message.includes("API rate limit")) {
      return res.type("image/svg+xml").send(errorSVG("Rate limit exceeded", "purple"));
    }

    const svg = `
      <svg width="800" height="180" xmlns="http://www.w3.org/2000/svg">

        <!-- Animated Gradient -->
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ff8a00">
              <animate attributeName="stop-color"
                values="#ff8a00;#e52e71;#9c27b0;#ff8a00"
                dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stop-color="#e52e71">
              <animate attributeName="stop-color"
                values="#e52e71;#9c27b0;#ff8a00;#e52e71"
                dur="8s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" rx="20" fill="url(#grad)" />

        <!-- Avatar -->
        <image href="${data.avatar_url}" x="20" y="20" height="140" width="140"
          clip-path="circle(70px at 70px 70px)" />

        <!-- Name -->
        <text x="180" y="55" font-size="28" fill="white" font-weight="bold">
          ${data.name || data.login}
        </text>

        <!-- Username -->
        <text x="180" y="85" font-size="18" fill="#f0f0f0">
          @${data.login}
        </text>

        <!-- Stats -->
        <text x="180" y="125" font-size="18" fill="white">
          ⭐ Repos: ${data.public_repos}
        </text>
        <text x="370" y="125" font-size="18" fill="white">
          👥 Followers: ${data.followers}
        </text>
        <text x="580" y="125" font-size="18" fill="white">
          🔂 Following: ${data.following}
        </text>

      </svg>
    `;

    res.type("image/svg+xml").send(svg);

  } catch (err) {
    res.type("image/svg+xml").send(errorSVG("Server error", "darkred"));
  }
});

// Optional: root route for instructions
app.get("/", (req, res) => {
  res.send(`
    <h2>GitHub SVG Card API</h2>
    <p>Use <code>/github?user=USERNAME</code> to get a card.</p>
    <p>Example: <a href="/github?user=octocat">/github?user=octocat</a></p>
  `);
});

export default app;


/*
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Prevent favicon.ico 404
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.send("SVG Gradient Card API is running...");
});

// Example Endpoint: /card?title=Hello&color1=ff00ff&color2=00ffff
app.get("/card", (req, res) => {
  const title = req.query.title || "My Gradient Card";
  const color1 = req.query.color1 || "ff7eb3";
  const color2 = req.query.color2 || "65c7f7";

  const svg = `
  <svg width="450" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#${color1}" />
        <stop offset="100%" stop-color="#${color2}" />
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
*/