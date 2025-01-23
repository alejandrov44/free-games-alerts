FROM node:22-alpine

COPY . ./app
WORKDIR ./app

ENV TZ="Europe/Madrid"

RUN npm install --save

CMD ["npm", "run", "send_free_games_alert"]
