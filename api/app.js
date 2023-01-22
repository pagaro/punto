const express = require('express');
const logger = require('morgan');
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', (req, res) => {
  let data = {data: "Hello World!"}
  res.json(data)
})

app.listen(port, () => {
  console.log(`Server running at 3000`);
});


