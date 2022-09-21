require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./router/route");
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors')

app.use(bodyParser.json())

app.use(cors({ origin: '*' }))

mongoose
  .connect(
    process.env.MONGODB_CLUSTER_URL, {
    useNewUrlParser: true,
  }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route)

app.use(express.static('./client/build'));

app.get('/*', (req, res) =>

  res.sendFile('index.html', { root: 'client/build' })

);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});