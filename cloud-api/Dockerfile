FROM node:20-slim

WORKDIR /usr/src/app

# Install deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy source
COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["node", "index.js"]
