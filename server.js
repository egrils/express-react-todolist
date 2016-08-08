const express = require('express');
const app = new express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.json(['text', 'date']);
});

app.listen(3000, () => {
    console.log('Server started.');
});