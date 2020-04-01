const express = require('express')
const app = express();
const root = require('./routes/index');
const monstersRouter = require('./routes/monsters');
const spellsRouter = require('./routes/spells');
const trapsRouter = require('./routes/traps');

// Connect root route to application
app.use('/', root);

// Connect monster routes to application
app.use('/monsters', monstersRouter);

// Connect spell routes to application
app.use('/spells', spellsRouter);

// Connect trap routes to application
app.use('/traps', trapsRouter);

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app; // for testing