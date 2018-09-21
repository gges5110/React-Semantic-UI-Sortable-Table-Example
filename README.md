# React-Semantic-UI-Sortable-Table-Example
An example for React Semantic UI sortable table.

[![build status](https://img.shields.io/travis/gges5110/React-Semantic-UI-Sortable-Table-Example/master.svg)](https://travis-ci.org/gges5110/React-Semantic-UI-Sortable-Table-Example)
[![Coverage Status](https://coveralls.io/repos/github/gges5110/React-Semantic-UI-Sortable-Table-Example/badge.svg?branch=master&service=github)](https://coveralls.io/github/gges5110/React-Semantic-UI-Sortable-Table-Example?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a5f2bc2a9a8944549c95a17de5d863e9)](https://www.codacy.com/app/gges5110/React-Semantic-UI-Sortable-Table-Example?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gges5110/React-Semantic-UI-Sortable-Table-Example&amp;utm_campaign=Badge_Grade)

## Prerequisite
Node.js runtime environment.

## Install dependencies
Once you have Node.js installed, type
```
npm install
```
to install the dependencies.

## Compile and run
To compile the React component once, type
```
npm run compile
```
This command will build app.bundle.js, vendor.bundle.js and their corresponding source maps.
I compile it separately into two files, app.bundle.js is for our react front end code and vendor.bundle.js is for the other front end libraries. Find out more in the ```webpack.config.js```.

To watch the changes related to front end and compile automatically, use
```
npm run watch
```

To start the server and watch any changes that's being made to ```server/server.js```, type
```
npm start
```
 The default port is 3000. Open the browser and go to localhost:3000

All of the above commands can be found in the scripts section of ```package.json```.

## Deployment
To deploy the application, there is no need to include the React JS files under the ```/src``` folder. Just include ```index.html```, ```app.bundle.js``` and ```vendor.bundle.js``` and the files in ```/server```. To install the dependencies for deployment, run ```npm install --production```.

## Docker
```bash
# Build the image
docker build -t {SOME_TAG} .
# Run the container with exposing port 5000
docker run -p 5000:3000 {SOME_TAG}
```


## Server APIs

| Operation         | HTTP Method   | Example           | Remarks       |
| ----------------- | ------------- | ----------------- | ------------- |
| Get Vehicle List  | Get           | /api/v1/vehicles?filter=&offset=0&limit=10&order=asc&sortBy=package  | Available query params: filter, offset, limit, order, sortBy. If query parameters does not match, it will give warning and also provide the correct name of query parameters.  |
| Toggle Favorite   | Post          | /api/v1/favorite  | Requires to send the JSON formatted vehicle in the body. Will send back an error status if no vehicle is found in the body of request.  |

## Sorting data on front-end v.s. back-end
Depending on the data set size and the connectivity, we can sort the vehicle data either on front-end or the back-end. When the data set size is small it is easier to send the whole data set to the client size and do all the sorting and filtering in the browser. But this will not scale well as the data size grows, especially it could have millons of rows. To limit the data being sent over to the front-end, I only allow 100 records per request.

## Input Validation
Each time a character changes in filter input, it will check two things. 1) If the input contains invalid character, and 2) there is no result being found after applying the filter. For the first case, the input UI will turn red and a popup will show a message warning the user. If the filter will cause the result to be empty, the popup will inform the user about this. On the server side, it will also check if the input only contains alphanumerics, and will send a 422 response along with an error message.
