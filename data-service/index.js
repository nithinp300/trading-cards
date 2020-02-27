const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send('This is the Yu-Gi-Oh! Trading Cards RESTful API');
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));