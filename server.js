const express = require("express");
const app = express();

app.use(express.json());

const portfolio = {
  name: "Ranjitha",
  role: "Full Stack Developer",
  about: "Passionate Full Stack Developer skilled in React, Node.js, and MongoDB.",
  skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git"],
  projects: [
    {
      title: "Portfolio Website",
      description: "Responsive personal portfolio website.",
      tech: "HTML, CSS, JavaScript"
    },
    {
      title: "Mini CRM",
      description: "Client Lead Management System.",
      tech: "React, Node.js, MongoDB"
    }
  ]
};

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>${portfolio.name} | Portfolio</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial;
        margin: 0;
        background: #f4f4f4;
        text-align: center;
      }
      header {
        background: black;
        color: white;
        padding: 40px;
      }
      section {
        background: white;
        margin: 20px auto;
        padding: 20px;
        width: 80%;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        background: #eee;
        margin: 5px;
        padding: 8px;
        border-radius: 5px;
      }
      input, textarea {
        width: 80%;
        margin: 10px;
        padding: 10px;
      }
      button {
        padding: 10px 20px;
        background: black;
        color: white;
        border: none;
        cursor: pointer;
      }
    </style>
  </head>
  <body>

  <header>
    <h1>${portfolio.name}</h1>
    <h2>${portfolio.role}</h2>
  </header>

  <section>
    <h3>About Me</h3>
    <p>${portfolio.about}</p>
  </section>

  <section>
    <h3>Skills</h3>
    <ul>
      ${portfolio.skills.map(skill => `<li>${skill}</li>`).join("")}
    </ul>
  </section>

  <section>
    <h3>Projects</h3>
    ${portfolio.projects.map(project => `
      <div>
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        <small>${project.tech}</small>
      </div>
    `).join("")}
  </section>

  <section>
    <h3>Contact Me</h3>
    <input type="text" id="name" placeholder="Your Name"><br>
    <input type="email" id="email" placeholder="Your Email"><br>
    <textarea id="message" placeholder="Your Message"></textarea><br>
    <button onclick="sendMessage()">Send</button>
    <p id="response"></p>
  </section>

  <script>
    function sendMessage() {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById("response").innerText = data.message;
      });
    }
  </script>

  </body>
  </html>
  `);
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("New Message:", name, email, message);
  res.json({ message: "Message received successfully!" });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
