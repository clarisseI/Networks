#!/bin/bash
echo "Starting the application..."
echo "1 - Node.js TCP Web server"
echo "2 - Python UDP client"
read -p "Select an option (1 or 2): " option

case "$option" in
    1)
        echo "Launching Node.js TCP Web server..."
        cd TCP_server
        node server.js
        ;;
    2)
        echo "Launching Python UDP client..."
        cd UDP_client
        python3 client.py
        ;;
    *)
        echo "Invalid option selected. Please choose 1 or 2."
        ;;
esac