import { useState, useEffect, useRef } from 'react';
import { Message } from '../Interfaces/websocket.interface';

const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<Message[]>([]);    // Stores received messages
  const [isConnected, setIsConnected] = useState(false); // Connection status
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket(url);
    socketRef.current = socket;

    // When the connection is opened
    socket.onopen = () => {
      console.log('WebSocket connection established');
      setIsConnected(true);
    };

    // Listen for messages
    socket.onmessage = (event) => {
      console.log('Message received:', event.data);
      setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
    };

    // Handle WebSocket errors
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Handle connection close
    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    // Cleanup when component unmounts
    return () => {
      socket.close();
    };
  }, [url]);  // Reconnect only if the URL changes

  // Function to send a message
  const sendMessage = (message: Message) => {
    if (socketRef.current && isConnected) {
		socketRef.current.send(JSON.stringify(message));
    } else {
      console.error('Cannot send message, WebSocket is not connected.');
    }
  };

  return { messages, sendMessage, isConnected };
};

export default useWebSocket;
