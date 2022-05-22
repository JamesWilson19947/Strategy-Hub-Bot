const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      connectTimeoutMS: 10000,
      family: 4,
    };

    mongoose.connect(process.env.MONGO_URI, dbOptions);
    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
      console.log("StratBot has connected to the MongoDB Database.");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("StratBot has disconnected from the MongoDB Database.");
    });
    mongoose.connection.on("err", (err) => {
      console.log("Something went wrong when connecting to MongoDB: " + err);
    });
  },
};
