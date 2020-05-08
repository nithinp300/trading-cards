const express = require('express');
const cors = require('cors');
const app = express();
const root = require('./routes/index');
const cardsRouter = require('./routes/cards');
const bodyParser = require('body-parser')

app.use(cors());

// create application/json parser
const jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser)
app.use(urlencodedParser)

// Connect root route to application
app.use('/', root);

// Connect cards routes to application
app.use('/api/cards', cardsRouter);

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app; // for testing