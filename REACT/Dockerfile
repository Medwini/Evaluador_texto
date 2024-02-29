FROM node:21.6.2-alpine3.18

WORKDIR /home/django_react/frontend

COPY package.json /home/django_react/frontend/package.json
COPY package-lock.json /home/django_react/frontend/package-lock.json

RUN npm ci
COPY . /home/django_react/frontend

EXPOSE 3001

CMD ["npm", "start"]

