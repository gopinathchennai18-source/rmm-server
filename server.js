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

app.post('/api/upload', (req, res) => {
    res.send("File received");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
