FROM node:16

WORKDIR /usr/src/app

COPY . .
ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm install
RUN CI=true npm test
RUN npm run build

CMD ["npm", "start"]
