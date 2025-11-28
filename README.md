# Network Programming Project

A collection of client-server applications demonstrating TCP and UDP network protocols using Node.js and Python.

## 📋 Overview

1. **TCP Web Server** (Node.js) - Custom HTTP server built with TCP sockets
2. **UDP Client** (Python) - Client for math expression evaluation via UDP

## 📁 Project Structure

```
project/
├── TCP_server/
│   ├── server.js          # TCP Web server
│   ├── 200_page.html      # Home page
│   └── 404_page.html      # 404 error page
├── UDP_client/
│   └── client.py          # UDP client
├── main.sh                # Launcher script
└── README.md
```

## 🛠️ Prerequisites

- Node.js (v12.0+)
- Python (v3.6+)

## 📦 Installation

```bash
git clone https://github.com/clarisseI/Networks
```

## 🎮 Usage

### Option 1: Launcher (Recommended)

```bash
./main.sh
```

Select:
- `1` - Node.js TCP Web Server
- `2` - Python UDP Client

### Option 2: Run Individually

**TCP Web Server:**
```bash
cd node_server
node server.js
```
Visit  `http://localhost:8080/`  or `http://localhost:8080/anything` 

**UDP Client:**
```bash
cd python_client
python3 client.py
```

## 🚀 Features

### TCP Web Server
- Listens on port 8080
- Serves custom HTML pages
- 30-second inactivity timeout
- Handles GET requests and errors

### UDP Client
- Sends math expressions to remote server (198.44.133.117:9375)
- 4-second response timeout
- Interactive CLI with graceful exit

## 📝 Example

```
Enter your math expression: 4+2
Server Response: 6
```

## 📄 License

MIT License

## 👤 Author

[Clarisse umulisa](https://github.com/clarisseI)
