FROM node:alpine3.22

WORKDIR /app

COPY . . 

ENV DATABASE_URL=postgresql://root:password@postgres:5432/codeshare
ENV PORT=8000
ENV REDIS_URL=redis://:password@redis:6379
ENV TIME_PERIOD=2592000

EXPOSE 8000

RUN npm install
CMD ["sh", "-c", "npm run db:push && npm run start"]