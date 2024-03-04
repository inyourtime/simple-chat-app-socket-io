FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .
# COPY package*.json pnpm-lock.yaml ./
RUN npm install --omit=dev

EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]

