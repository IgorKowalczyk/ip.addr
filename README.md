<img width="170" height="170" align="left" style="float: left; margin: 0 10px 0 0; border-radius: 50%;" alt="Majo.exe Logo" src="https://media.discordapp.net/attachments/721019707607482409/901835740063879269/icon.png">

# What is my IP?

> Javascript API to display user's IP address and information about it
<br>

---

[![Discord](https://img.shields.io/discord/666599184844980224?color=%2334D058&logo=discord&label=Discord&style=flat-square&logoColor=fff)](https://majobot.igorkowalczyk.repl.co/server)
[![Node.js](https://img.shields.io/github/workflow/status/igorkowalczyk/what-is-my-ip/Node.js/master?style=flat-square&label=Node.js&logo=github&color=%2334D058)](https://majobot.igorkowalczyk.repl.co/)
[![GitHub License](https://img.shields.io/github/license/igorkowalczyk/what-is-my-ip?style=flat-square&logo=github&label=License&color=%2334D058)](https://github.com/IgorKowalczyk/what-is-my-ip)
[![Version](https://img.shields.io/github/package-json/v/igorkowalczyk/what-is-my-ip?style=flat-square&logo=github&label=Version&color=%2334D058)](https://majobot.igorkowalczyk.repl.co/server)

## Endpoints

- `/` - Display only IP Address in `text` format
- `/json` - Display IP Adress in `.json` format
- > **`/json` endpoint accept following arguments:**<br>`?show_all=[boolean]` - Show all data, ignore other arguments<br>`?city=[boolean]` - Show city<br>`?country=[boolean]` - Show country<br>`?continent=[boolean]` - Show continent<br>`?latitude=[boolean]` - Show latitude<br>`?longitude=[boolean]` - Show longitude<br>`?time_zone=[boolean]` - Show time zone<br>`?postal_code=[boolean]` - Show postal code<br>`?org=[boolean]` - Show ISP name<br>`?asn=[boolean]` - Show asn


## Features
- ☠️ Dead Simple
- 🔥 Fast response time
- ⚙️ Fully customizable
- 🧱 Customizable `.json` endpoint
- ❌ No API key required

## Hosting
1. In `.env` file set:
    * `DOMAIN` - Website address (should start with `http://` or `https://`)
    * `PORT` - Website port
2. Run `npm i`
3. Run `npm run start`
4. Visit your browser for API

## Issues
If you have any issues with the page please create [new issue here](https://github.com/igorkowalczyk/what-is-my-ip/issues)

## Pull Requests
When submitting a pull request:
- Clone the repo.
- Create a branch off of master and give it a meaningful name (e.g. my-awesome-new-feature).
- Open a [pull request](https://github.com/igorkowalczyk/what-is-my-ip/pulls) on [GitHub](https://github.com) and describe the feature or fix.

## License
This project is licensed under the MIT. See the [LICENSE](https://github.com/igorkowalczyk/what-is-my-ip/blob/master/license.md) file for details
