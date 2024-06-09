import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./src/config/database.js";
import cors from "cors";
import router from "./src/routes/index.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

//Connect to database
connectDatabase();

// Middleware setup
app.use(cors());
app.options("*", cors());

const bodyParserOptions = {
  limit: "15mb",
};

app.use(express.json(bodyParserOptions)); 
app.use(express.urlencoded({ extended: true, ...bodyParserOptions }));
app.use("/user", router.User);
app.use("/tasks", router.Task);

//Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Node.js demo project!");
});
