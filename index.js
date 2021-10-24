if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("API requires Node.js v16 or higher. Re-run API with Node.js v16 or higher!");
const express = require("express");
const rate_limit = require("express-rate-limit");
const messages = require("./src/json.js");
require("dotenv").config();
const port = process.env.PORT || 6565;
const app = express();
const limiter = rate_limit({
 windowMs: 60 * 1000, // 1 minute
 max: 60, // 60 requests per 1 minute
 message: messages.getRateLimitMessage(),
});
process.env.SESSION_SECRET = "";
for (let i = 0; i <= 15; i++) {
 process.env.SESSION_SECRET += Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6) + i;
}
app.set("trust proxy", true);
app.use(limiter);
app.locals.domain = process.env.DOMAIN.split("//")[1];
app.set("view engine", "html");
const cookieExpire = 1000 * 60 * 60 * 24 * 7; // 1 week

app.get("/", function (req, res) {
 let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || res.ip;
 if (ip.includes("::ffff:")) {
  ip = ip.split(":").reverse()[0];
 }
 res.send(ip);
});

app.get("/json", async function (req, res) {
 var xForwardedFor = (req.headers["x-forwarded-for"] || "").replace(/:\d+$/, "");
 var ip = xForwardedFor || req.connection.remoteAddress;
 res.send(await messages.ipAddrInfo(ip));
});

app.get("/json-simple", function (req, res) {
 let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || res.ip;
 if (ip.includes("::ffff:")) {
  ip = ip.split(":").reverse()[0];
 }
 const json = {
  ip: ip,
 };
 res.send(json);
});

app.use(function (req, res, next) {
 res.status(404);
 const json = {
  error: "404!",
 };
 res.send(json);
});

app.listen(port, null, null, () => {
 console.log(`API is up and running on port ${port}!`);
});
