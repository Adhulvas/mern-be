const mongoose = require("mongoose");

const DBconnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB connected successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
};

module.exports = DBconnect;

