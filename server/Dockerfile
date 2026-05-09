FROM node:alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm run build

EXPOSE 8000

CMD ["node", "dist/app.js"]