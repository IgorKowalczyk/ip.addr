function getRateLimitMessage() {
 const rate_limit_message = {
  ratelimit: true,
  error: "Too many requests, please try again later!",
 };
 return rate_limit_message;
}

module.exports = { getRateLimitMessage };
