import express from "express";

const app = express();

app.listen(3000, (req, res) => {
  res(hello);
  console.log("Server is running on port 3000");
});
