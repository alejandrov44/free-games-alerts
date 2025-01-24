# Free Games Alerts

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/alejandrov44/free-games-alerts/blob/master/README.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/alejandrov44/free-games-alerts/blob/master/README.es.md)

## Table of contents

- [Description](#description)
- [Create a webhook on discord](#create-a-webhook-on-discord)
- [How to run a quick alert](#how-to-run-a-quick-alert)
- [Add the extension to Chromium browsers](#add-the-extension-to-chromium-browsers)

## Description

A simple way to get notified 📨 with all the info about every new free game on the main videogame platforms, like steam, epic or gog 🎮.

## Create a webhook on discord

To be able to get notified on discord first you need to create a webhook that will allow the project to send messages to one channel of your server.

1- Go to `Server Settings` -> `Integrations` -> `Webhooks` -> `New Webhook`.

2- Personalizate your webhook and copy the URL that it gives to you.
The url have 2 important parts:

```bash
# Webhook url example
https://discord.com/api/webhooks/4684567458694593/aL2uEoXIwrkbGE67q9ihxHRPEnua3zXoII-t6k104rMJ0kpLv2HKFCUpTZlqaRF5HiKI
```
- The webhook id: `4684567458694593`.
- The webhook token: `aL2uEoXIwrkbGE67q9ihxHRPEnua3zXoII-t6k104rMJ0kpLv2HKFCUpTZlqaRF5HiKI`.

Both are needed to be able to send a message with it, so be sure to write the 2 of them to the corresponding fields on the `.env` file.

## How to run a quick alert

1- Ensure you have installed nodejs.

2- Crate a .env file at the root of the project with the variables needed. *See the `example.env` file*.

3- Execute this two commands on the bash terminal on the root of the project:

```bash
# Install all project packages
npm i --save

# Run the project
npm run send_free_games_alert
```
(*You can always execute with `docker-compose` so you don't have to install nothing more than docker.*)

4- Wait until you can see the message arrive on the channel especified on your webhook

## Future upgrades
 
I plan to add other platforms sus as Origin or Primer Gaming. Additionally, future updates will include support for other popular notification channels like Email 📧 and Slack 💼 to enhance accessibility and user preference compatibility.

## License
Distributed under the MIT License. See LICENSE for more information.
 
## Star the repo!!! ⭐
 
If I was able to help you, please star the repository. This will help me in my further work.

## Contact Me:
 
[Discord](https://discord.gg/yGMknyc9)