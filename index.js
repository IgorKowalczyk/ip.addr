if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("API requires Node.js v16 or higher. Re-run API with Node.js v16 or higher!");
const express = require("express");
const rate_limit = require("express-rate-limit");
const messages = require("./src/json.js");
const iplocate = require("node-iplocate");
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
app.set("query parser", "simple");
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
 req.query;
 let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || res.ip;
 if (ip.includes("::ffff:")) {
  ip = ip.split(":").reverse()[0];
 }
 iplocate(ip).then(function (results) {
  const response = {
   ip: ip,
   ...((req.query.city == "true" || req.query.show_all == "true") && { city: results.city }),
   ...((req.query.country == "true" || req.query.show_all == "true") && { country: results.country }),
   ...((req.query.country_code == "true" || req.query.show_all == "true") && { country_code: results.country_code }),
   ...((req.query.continent == "true" || req.query.show_all == "true") && { continent: results.continent }),
   ...((req.query.latitude == "true" || req.query.show_all == "true") && { latitude: results.latitude }),
   ...((req.query.longitude == "true" || req.query.show_all == "true") && { longitude: results.longitude }),
   ...((req.query.time_zone == "true" || req.query.show_all == "true") && { time_zone: results.time_zone }),
   ...((req.query.postal_code == "true" || req.query.show_all == "true") && { postal_code: results.postal_code }),
   ...((req.query.org == "true" || req.query.show_all == "true") && { org: results.org }),
   ...((req.query.asn == "true" || req.query.show_all == "true") && { asn: results.asn }),
  };
  res.send(response);
 });
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
