const express = require("express");
const dotenv = require("dotenv");
const { main, post } = require("./dataManipulator/access");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Working!");
});

app.get("/get", async (req, res) => {
  const data = await main();
  console.log(data[0]);
  res.json(data[0]);
});

app.post("/post", async (req, res) => {
  const data = req.body;
  console.log("Received data:", data); // Add this line

  const messages = {
    Medical: "Medical Emergency call the Ambulance/come for First Aid help...",
    Police: "Emergency Call the Cops ASAP...",
    Female: "This is an Emergency Call the Female Help Line...",
    Fire: "Not a Fire Drill call the Fire Fighters near me...",
    Other: null,
  };

  try {
    const dataPosted = await post({
      ...data,
      emergencymessage: messages[data.emergencytype],
    });

    console.log(dataPosted);
    res.json(dataPosted);
  } catch (error) {
    console.error("Error handling POST request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
