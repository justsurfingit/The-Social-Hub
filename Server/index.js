require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connect } = require("./dbConnect");
const cors = require("cors");
const PORT = process.env.PORT || 4001;
const url = process.env.MONGO_URI;

const mainRouter = require("./Routers/MainRouter");
//middkware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3000/signup"],
  })
);

app.use("/api/v1", mainRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});
async function init() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Connected to the database");

    app.listen(3002, () => {
      console.log("Server listening on port 3002 ");
    });
  } catch (err) {
    console.log(err);
  }
}

init();
// init();
