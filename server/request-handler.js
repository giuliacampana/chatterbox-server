/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {


  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  // if (request.url === '/class/messages') {
  //}
    var results = [];

    if (request.url === '/classes/messages') {
      if(request.method === 'GET') {
        response.end(JSON.stringify({results: []}));
      } else {
        statusCode = 404;
      }
      response.writeHead(statusCode, headers);
      response.end();
    }
    
        
    if(request.method === 'POST' && request.url === '/classes/messages'){
      console.log('we posted this message!');
      
      // request.on('data', function (chunk) {
      //   results.push(chunk);
      // }).on('end', function() {
      //   results = Buffer.concat(results).toString();
      //   // at this point, `body` has the entire request body stored in it as a string
      // });
      // var message = "";
      // request.on('data', function(chunk) {
      //   message += chunk.toString();
      // }).on('end', function() {
      //   results.push(message);
      //   // at this point, `total` has the entire request body stored in it as a string
      // });

      // request.end(results.push(message));



      request.on('error', function(err) {
        console.error(err);
      }).on('data', function(chunk) {
        results.push(chunk);
      }).on('end', function() {
        results = Buffer.concat(results).toString();

        response.on('error', function(err) {
          console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');

        const responseBody = {headers, method, url, body};

        response.write(JSON.stringify(responseBody));
        response.end();
      })
    }

// var total = "";
// request.on('data', function(chunk) {
//   total += chunk.toString();
// }).on('end', function() {
//   // at this point, `total` has the entire request body stored in it as a string
// });     

    // if(request.method === 'PUT'){

    //   request.on('data', function (chunk) {
    //     results.push(chunk);
    //   }).on('end', function() {
    //     results = Buffer.concat(results).toString();
    //     // at this point, `body` has the entire request body stored in it as a string
    //   });
    // }
    // if(request.method === 'DELETE'){
    // }
    // if(request.method === 'OPTIONS'){
    // }



// let body = [];
// request.on('data', (chunk) => {
//   body.push(chunk);
// }).on('end', () => {
//   body = Buffer.concat(body).toString();
//   // at this point, `body` has the entire request body stored in it as a string
// });
     


  response.end('Hello, World!');
};

var requestMethods = {
  get: function(request, response, headers) {
    response.writeHead(200, headers);
  },

  post: function(request, response, headers) {
    response.writeHead(201, headers);
  }

  error: function(request, response, headers) {
    response.writeHead(404, headers);
  }

  options: function(request, response, headers) {
    response.writeHead(200, headers);
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
