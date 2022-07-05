<h1>App for making notes (with authentication)</h1>

<h2>Running locally with command line</h2>

Prerequisites: NPM, Node, Docker

1. ```npm install```
2. ```npm run build```
3. ```docker-compose up -d```
4. ```npm run migrate up```
5. ```npm start```
6. Open http://localhost:3000/

<b>UI pictures</b>: https://xd.adobe.com/view/5ffccda7-6642-4ea5-4385-9426d15f4234-29cd/

<b>Technologies</b>: React, Redux saga, Nodejs, Express, Webpack, Material UI, Postgre, React router, Passport, Redis, Typescript

<b>A lot of TODO</b>: Do tests, do lazy loading, prevent user from spamming http requests with buttons, error handling for requests, 
encode password for request / support https, use ".env" file in more places rather than variables, recheck the code for unneeded code,
make the routing less messy, make the login (and notes) UI more spacious, fix the login from persisting to incognito window, password validation sucks, you can have same username as others (please no)
