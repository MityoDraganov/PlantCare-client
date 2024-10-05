import { useState, useEffect, useRef, useContext } from 'react';
import { InboxContext } from '../contexts/InboxContext';

const useWebSocket = (url: string) => {
  const { setMessages } = useContext(InboxContext);
  const [isConnected, setIsConnected] = useState(false); // Connection status
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null); // Store reconnect timeout

  useEffect(() => {
    // Function to connect the WebSocket
    const connect = () => {
      const socket = new WebSocket(url);
      socketRef.current = socket;

      // When the connection is opened
      socket.onopen = () => {
        console.log('WebSocket connection established');
        setIsConnected(true);
        if (reconnectInterval.current) {
          clearTimeout(reconnectInterval.current); // Clear the reconnect timer
        }
      };

      // Listen for messages
      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const parsedMessage = parseFields(message);
          // Ensure we append new messages correctly
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      // Handle WebSocket errors
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      // Handle connection close
      socket.onclose = () => {
        console.log('WebSocket connection closed. Attempting to reconnect...');
        setIsConnected(false);
        // Start reconnecting after a delay
        reconnectInterval.current = setTimeout(connect, 1000); // Try to reconnect after 1 second
      };

      // Cleanup when component unmounts
      return () => {
        socket.close();
        if (reconnectInterval.current) {
          clearTimeout(reconnectInterval.current); // Clear the timeout if component unmounts
        }
      };
    };

    connect(); // Initial connection

    // Cleanup function on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectInterval.current) {
        clearTimeout(reconnectInterval.current);
      }
    };
  }, [url]); // Reconnect only if the URL changes

  // Function to recursively parse fields
  const parseFields = (data: any): any => {
    if (data && typeof data === 'object') {
      for (const key in data) {
        if (typeof data[key] === 'string' && (data[key].startsWith('{') || data[key].startsWith('['))) {
          // Only try to parse if the string looks like JSON (starts with { or [)
          try {
            data[key] = JSON.parse(data[key]);
          } catch (e) {
            // If parsing fails, just log and move on
            console.error(`Error parsing field '${key}':`, e);
          }
        } else if (typeof data[key] === 'object') {
          // Recur for nested objects
          data[key] = parseFields(data[key]);
        }
      }
    }
    return data;
  };

  // Function to send a message
  const sendMessage = (message: Message) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error('Cannot send message, WebSocket is not connected.');
    }
  };

  return { sendMessage, isConnected };
};

export default useWebSocket;

// Define the Event enum
export enum Event {
  ForecastAlert = "forecastAlert",
}

// Define the Message interface
export interface Message {
  event: Event;
  data: {
    Message: string;
  };
  timestamp: string;
}
