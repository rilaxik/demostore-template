const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3001;

const usersRouter = require('./routes/users')
const validateRouter = require('./routes/validate')

app.use(bodyParser.json());
app.use(cors());
console.log(`Running on port ${PORT}`);

app.use('/', usersRouter)
app.use('/', validateRouter)

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.listen(PORT);
