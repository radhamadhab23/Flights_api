FROM node

WORKDIR /developers/nodejs/flights

COPY . .

RUN npm ci
CMD ["npm","run","dev"]
