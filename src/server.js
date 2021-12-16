require("dotenv").config();
const door = process.env.SERVER_DOOR;

const app = require("./app");

app.listen(door, () => console.log("Server running at door: "+door));
