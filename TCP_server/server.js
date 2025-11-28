const net = require('net');
const fs = require('fs');
const path = require('path');
const port = 8080;

// Create a TCP server
const myWebServer = net.createServer();

// Start listening for connections
myWebServer.listen(port, () => {
    console.log(`🚀 Server is listening for connections on localhost port: ${port}`);
});


// Function to serve content based on the URL provided
const serveContent = (requestUrl, callback) => {
    let statusCode = '200 OK';
    let filePath;

    // Handle request URL and determine the appropriate file to serve
    if (requestUrl === '/') {
        filePath = path.join(__dirname, '200_page.html'); // Serve the homepage
    } else {
        filePath = path.join(__dirname, '404_page.html'); // Serve the 404 page for other routes
        statusCode = '404 Not Found';
    }

    // Read HTML Content
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
        if (err) {
            console.error('Error reading file:', err);
            // If there's an error reading the file, send a 500 Internal Server Error
            callback('500 Internal Server Error', 'text/plain', '500 Internal Server Error: Unable to load the requested page.');
        } else {
            // If the file is found, use the content from the file
            callback(statusCode, 'text/html', fileContent);
        }
    });
};

// Handle the HTTP server response
const sendResponse = (socket, statusCode, contentType, content) => {
    const response = [
        `HTTP/1.1 ${statusCode}`,
        `Content-Type: ${contentType}; charset=utf-8`,
        `Content-Length: ${Buffer.byteLength(content)}`,
        '',
        content
    ].join('\r\n');

    console.log("Response sending.");
    socket.write(response); // send the response
};

// Define the connection handler function
const handleConnection = (socket) => {
    console.log('A new connection has been established.');

    let inactivityTimer;

    // Function to reset and close the connection if there is no activity happening
    const resetTimeout = () => {
        clearTimeout(inactivityTimer); // Clear any existing timeout
        inactivityTimer = setTimeout(() => {
            console.log('Connection timed out due to inactivity. Closing the connection.');
            socket.end(); // Close the connection after 30 seconds of inactivity
            myWebServer.close(() => {
                console.log('Server has been stopped.');
                process.exit(0); // Exit the process
            });
        }, 30000); // 30 seconds timeout
    };

    /** socket.on('data') listens for incoming request data from the client.
    * In our case, the client (browser) sends an HTTP request to the server when we access
    * localhost:8080 with a  GET request to '/' or other routes.
    */
    socket.on('data', (data) => {
       // Parse HTTP request
       const request = data.toString();
       console.log('Received request.\n');

   /** we split the HTTP request string at \r\n since it's the standard line break for HTTP headers.
    * store the first line in Requestline array to parse it as it contains the method and url HTTP request
    */
       const [requestLine] = request.split('\r\n'); 
       const [method, requestUrl] = requestLine.split(' '); // Extract method and URL
       console.log(`Method: ${method}, URL: ${requestUrl}\n`);

        // Reset the timeout as activity was detected
        resetTimeout();

        // Serve content based on the URL
        serveContent(requestUrl, (statusCode, contentType, content) => {
            // Send the HTTP response to the client
            sendResponse(socket, statusCode, contentType, content);
        });
    });

    // Handle socket errors
    socket.on('error', (err) => {
        if (err.code === 'ECONNRESET') {
            console.log('Connection reset by the client');
        } else {
            console.error('Socket error:', err);
        }
    });

    // Log when the client closes the connection
    socket.on('end', () => {
        console.log('Connection closed by the client');
    });
};

// Attach the connection handler to the server
myWebServer.on('connection', handleConnection);

// Handle server errors (e.g., issues starting the server)
myWebServer.on('error', (err) => {
    console.error('Server error:', err);
});
