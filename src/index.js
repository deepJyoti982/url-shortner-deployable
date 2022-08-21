const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./router/route");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(bodyParser.json())

app.use(cors({ origin: '*' }))

mongoose
  .connect(
    "mongodb+srv://deepJyoti982:deep982@cluster0.hcglv.mongodb.net/deepJyoti982", {
    useNewUrlParser: true,
  }
  )
  .then((result) => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route)

app.use(express.static('./client'));

app.get('/*', (req, res) =>

  res.sendFile('index.html', { root: 'client/' })

);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});