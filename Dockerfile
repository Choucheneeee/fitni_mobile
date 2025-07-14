FROM node:22

WORKDIR /app

# Install dependencies only (no source copy!)
COPY package*.json ./

RUN npm install -g expo-cli && npm install

CMD ["npm", "start", "--", "--web"]
