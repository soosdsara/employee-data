# Employee Data
<a id="readme-top"></a>

The goal of this project is to develop a transparent and user-friendly web application for storing and managing employee data with **MERN** stack.

### Built With
<a id="built-with"></a>

* [![JavaScript][JavaScript.com]][JavaScript-url]
* [![React][React.js]][React-url]
* [![MongoDB][Mongodb.com]][Mongodb-url]
* [![Mongoose][Mongoose.com]][Mongoose-url]
* [![Express][Express.com]][Express-url]
* [![Nodejs][Nodejs.com]][Nodejs-url]


<!-- GETTING STARTED -->
## Getting Started
<a id="getting-started"></a>

### Prerequisites
<a id="prerequisites"></a>

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/)
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass)

## Installation

### Server side

#### Install dependencies
```bash
cd ./server
npm install
```

#### .env file
Copy the .env.sample as .env and fill up the environment variable for your personal mongodb connecttion url.

#### Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a buch of starter data for your database. 

#### Running the code

```bash
cd ./server
npm run dev
```

#### Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your environment as well. And if you install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can actually run those in your editor.



### Client side

#### Install dependencies

```bash
cd ./client
npm install
```

#### Proxy

Watch for the port of your rest api. By default it will bind on port 8080 and the frontend proxy settings also depend on this configuration. If you for some reasons change the port of the backend, don't forget to change the ./client/package.json proxy settings as well.

#### Runnig the code

```bash
cd ./client
npm start
```

And the create-react-app react-scripts package will start your frontend on the 3000 port and you can visit the http://localhost:3000 on your preferred browser.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-frontend?logo=Linkedin&logoColor=black&labelColor=blue&color=blue
[linkedin-url]: https://linkedin.com/in/sára-soós-251772305
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&labelColor=yellow&color=yellow
[React-url]: https://reactjs.org/
[JavaScript.com]: https://img.shields.io/badge/JavaScript-language?style=for-the-badge&logo=javascript&labelColor=lightblue&color=lightblue
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Express.com]: https://img.shields.io/badge/Express.js-js?style=for-the-badge&logo=Express&labelColor=red&color=red
[Express-url]: https://expressjs.com/
[Nodejs.com]: https://img.shields.io/badge/Node.js-js?style=for-the-badge&logo=Node.js&labelColor=orange&color=orange
[Nodejs-url]: https://nodejs.org/en
[Mongodb.com]: https://img.shields.io/badge/MongoDB-js?style=for-the-badge&logo=MongoDB&labelColor=lightgreen&color=lightgreen
[Mongodb-url]: https://www.mongodb.com/
[Mongoose.com]: https://img.shields.io/badge/Mongoose-js?style=for-the-badge&logo=Mongoose&labelColor=lightgrey&color=lightgrey
[Mongoose-url]: https://mongoosejs.com/docs/
