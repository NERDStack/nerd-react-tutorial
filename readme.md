# NERD React Tutorial

This is a port of the React tutorial:

https://facebook.github.io/react/docs/tutorial.html

...onto the NERD stack (Node-Express-React-DocumentDB). It's a simple comments app that does end-to-end reads/writes against the full stack.

To run:

- create a DocumentDB database in Azure
- modify <a href="config.js">config.js</a> to point to a specific DocDB endpoint/database/collection
- pull the repo
- run 'npm install'
- run 'npm start'
- browse to http://localhost:3000
