import express from "express";
import userRoutes from "../src/routes/userRoutes";
import tweetRoutes from "../src/routes/tweetRoutes";

const app = express();
app.use(express.json());

//Routes
app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("SERVER running at localhost: 3000");
});
