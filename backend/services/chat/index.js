import "dotenv/config";
import express from "express";
import router from "./routes/chat.routes.js";
import connectDB from "./config/db.js";

const app = express();
app.use(express.json());
const port=process.env.PORT


app.use("/",router)


app.listen(port, () => {
    connectDB()
  console.log(
    `chat service running on ${port}`
  );
});
