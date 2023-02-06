FROM node:16
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g react-scripts
RUN npm install -g sass
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
