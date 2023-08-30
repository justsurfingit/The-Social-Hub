const mongoose = require("mongoose");

function connect(url) {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected");
  } catch (err) {
    console.log(url);
    console.log("some error");
  }
}

module.exports = { connect };
