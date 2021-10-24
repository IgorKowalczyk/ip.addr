if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("API requires Node.js v16 or higher. Re-run API with Node.js v16 or higher!");
const express = require("express");
const rate_limit = require("express-rate-limit");
const session = require("express-session");
require("dotenv").config();
const port = process.env.PORT || 6565;
const app = express();
const limiter = rate_limit({
 windowMs: 60 * 1000, // 1 minute
 max: 30,
});
process.env.SESSION_SECRET = "";
for (let i = 0; i <= 15; i++) {
 process.env.SESSION_SECRET += Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6) + i;
}
app.set('trust proxy', true),
app.use(limiter);
app.use((req, res, next) => {
 res.setHeader("Permissions-Policy", "	accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()");
 res.setHeader("Access-Control-Allow-Origin", "*");
 next();
});
app.locals.domain = process.env.DOMAIN.split("//")[1];
app.set("view engine", "html");
const cookieExpire = 1000 * 60 * 60 * 24 * 7; // 1 week
app.use(
 session({
  cookie: {
   expires: cookieExpire,
   secure: false,
   maxAge: cookieExpire,
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
 })
);
app.get('/',function(req, res) {

var ip = req.ip
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || req.connection.socket.remoteAddress;

console.log(ip);

})


app.listen(port, null, null, () => {
 console.log(`API is up and running on port ${port}!`);
});

