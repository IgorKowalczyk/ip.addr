const geoip = require("fast-geoip");

function getRateLimitMessage() {
 const rate_limit_message = {
  ratelimit: true,
  error: "Too many requests, please try again later!",
 };
 return rate_limit_message;
}

async function ipAddrInfo(ip) {
 if (ip.includes("::ffff:")) {
  ip = ip.split(":").reverse()[0];
 }
 const lookedIP = await geoip.lookup(ip);
 if (ip === "127.0.0.1" || ip === "::1") {
  return { error: "This won't work on localhost!" };
 }
 if (!lookedIP) {
  return { error: "Error occured while trying to process the information!" };
 }
 return lookedIP;
}

module.exports = { getRateLimitMessage, ipAddrInfo };
