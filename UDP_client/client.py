import socket
import sys

# Define the server IP Address and port
IP_Address= '198.44.133.117'
Port= 9375

# Create a UDP socket
client_socket= socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
client_socket.settimeout(4.0)

try:
    #check if the server is running 
    check_message= 'CHECK_SERVER_UP'
    client_socket.sendto(check_message.encode(), (IP_Address, Port))
    data,server= client_socket.recvfrom(1024)
    print(data ,'\n')
        
    while True:
        message = input('Enter your math expression (or exit to quit):')
            
        if message.lower() == 'exit':
            print('Goodbye!\n')
            break
        try:   
            # Send the client's message to the server
            client_socket.sendto(message.encode(), (IP_Address, Port))
            # Receive response from the server
            data, server= client_socket.recvfrom(1024)
            print(data, '\n')
        except socket.timeout:
            print('The response time is out.Please try again.\n')
            sys.exit()
        except Exception as e:
            print('Error during client and server communication.{e}\n')
        
except socket.timeout:
        print('Error: Server time is out\n')
        sys.exit()
        
except Exception as e:
    print('The server could not be reached: {e}\n')
    sys.exit()

# Close the socket
client_socket.close()

