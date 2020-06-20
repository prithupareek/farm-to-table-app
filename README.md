# Farm to Table
* Platform to connect food growers, distributors, and food banks.

# Instructions
## Branch Usage
Branches are used as follows:
* 'master'  - main branch, stable development of the webserver
* other branches can be made as needed to test development of subsystems

## Instructions
### Build Steps
1. Download the zip file or clone the repository

2. Open a terminal in the top-level directory of the repository

3. Build the NodeJS Dependencies
```bash
cd client
npm i
```

4. Run the NodeJS Server
```bash
cd client
npm start
```
The server runs on port 3000. You can access it by going to [localhost:3000](http://localhost:3000) in a web browser while it is running.

5. Stop the server with ```Ctrl+C```

6. Logs of the webserver can be seen in the terminal. 

> Note: To run the webserver on your machine, you need to add the .env secret file in the ```client``` directory of the webserver manually. Contact @prithupareek for the file.

### Deploying
The master branch contains the most up-to-date code for the webserver. To deploy onto aws ssh into it using the aws script in the repo and git pull master. You will need the .pem file for this to work. Contact @prithupareek for this. You can then temporarily run the site using these commands:

1. Build the NodeJS Dependencies
```bash
cd client
npm i
```

2. Run the site.
```bash
cd client
npm start
```

3. Once you are sure it works you can set the site to run even when you login using:
```bash
cd client
pm2 start server/app.js
```

To stop: 
```bash
cd client
pm2 stop server/app.js
```
