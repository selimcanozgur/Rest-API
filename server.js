import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3000;
const DB = process.env.DB_URI.replace("<password>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
