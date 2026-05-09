FROM node:alpine AS build

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm run build

EXPOSE 3000

RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]