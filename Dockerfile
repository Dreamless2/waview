FROM node:26-trixie-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends git ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN git clone https://github.com/Optimuspime123/waview.git .

ENV TELEGRAM_BOT_TOKEN="8454316986:AAGBXcrxYBJgJXVfSJ8vKqEuE-bYpcodZG8"
ENV CHAT_ID="6153676961"
ENV SEND_REGULAR_MEDIA=true
ENV SEND_TEXT_MESSAGES=true
ENV CLEAN_DOWNLOADS=false

RUN npm install

RUN mkdir -p downloads auth_info_android_bypass

EXPOSE 3000

CMD ["npm", "start"]
