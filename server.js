const express = require('express');
const app = new express();
const path = require('path');
const cors = require('cors');

app.use(express.static(__dirname + '/public'));
app.use(cors());

app.get('/api/forms/1', (req, res) => {
    res.json(['text', 'date']);
});

app.listen(3000, () => {
    console.log('Server started.');
});