FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

# Create data directory for persistence
RUN mkdir -p /app/data && chown node:node /app/data

EXPOSE 80

ENV NODE_ENV=production
ENV PORT=80

CMD ["npm", "start"]
