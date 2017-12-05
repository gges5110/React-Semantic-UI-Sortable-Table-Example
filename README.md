# CirrusLogicCodingChallenge

## Prerequisite
Node.js runtime environment.

## Install dependencies
Once you have Node.js installed, type
```
npm install
```
to install the dependencies.

## Compile and run
```
npm run watch
```
This command will build app.bundle.js, vendor.bundle.js and their corresponding source maps.
I compile it separately into two files, app.bundle.js is for our react front end code and vendor.bundle.js is for the other front end libraries. Find out more in the ```webpack.config.js```.


```
npm start
```
This will start the server and watch any changes that's being made to ```server/server.js```. The default port is 3000. Open the browser and go to localhost:3000

## Deploy
To deploy the application, there is no need to include the React JS files under the ```/src``` folder. Just include ```index.html```, ```app.bundle.js``` and ```vendor.bundle.js``` and the files in ```/server```. To install the dependencies for deployment, run ```npm install --production```.


## Server APIs

| Operation         | HTTP Method   | Example           | Remarks       |
| ----------------- | ------------- | ----------------- | ------------- |
| Get Vehicle List  | Get           | /api/v1/vehicles?filter=&offset=0&limit=10&order=asc&sortBy=package  | Available query params: filter, offset, limit, order, sortBy. If query parameters does not match, it will give warning and also provide the correct name of query parameters.  |
| Toggle Favorite   | Post          | /api/v1/favorite  | Requires to send the JSON formatted vehicle in the body. Will send back an error status if no vehicle is found in the body of request.  |

## Sorting data on front-end v.s. back-end
Depending on the data set size and the connectivity, we can sort the vehicle data either on front-end or the back-end. When the data set size is small it is easier to send the whole data set to the client size and do all the sorting and filtering in the browser. But this will not scale well as the data size grows, especially it could have millons of rows. To limit the data being sent over to the front-end, I only allow 100 records per request. To achieve this I also implemented table pagination.

Each time a character changes in

Front end UI library