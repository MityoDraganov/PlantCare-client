import { useState, useEffect, useRef, useContext } from "react";
import { InboxContext } from "../contexts/InboxContext";
import { PotContext } from "../contexts/PotContext"; // Import PotContext
import { Event, Message } from "../Interfaces/websocket.interface";

const useWebSocket = (url: string) => {
	const { setMessages } = useContext(InboxContext);
	const { updatePotDataHandler } = useContext(PotContext); // Access cropPots and updatePotDataHandler
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
				console.log("WebSocket connection established");
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

					// Only handle the message if cropPots is populated
				
						handleIncomingMessage(parsedMessage); // Handle incoming message
	
				} catch (error) {
					console.error("Error parsing message:", error);
				}
			};

			// Handle WebSocket errors
			socket.onerror = (error) => {
				console.error("WebSocket error:", error);
			};

			// Handle connection close
			socket.onclose = () => {
				console.log(
					"WebSocket connection closed. Attempting to reconnect..."
				);
				setIsConnected(false);
				// Start reconnecting after a delay
				reconnectInterval.current = setTimeout(connect, 1000); // Try to reconnect after 1 second
			};
		};

		connect(); // Initial connection

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
			}
			if (reconnectInterval.current) {
				clearTimeout(reconnectInterval.current);
			}
		};
	}, [url, updatePotDataHandler]); // Add cropPots as a dependency so it reconnects if cropPots change

	const parseFields = (data: any): any => {
		if (data && typeof data === "object") {
			for (const key in data) {
				if (
					typeof data[key] === "string" &&
					(data[key].startsWith("{") || data[key].startsWith("["))
				) {
					// Only try to parse if the string looks like JSON (starts with { or [)
					try {
						data[key] = JSON.parse(data[key]);
					} catch (e) {
						// If parsing fails, just log and move on
						console.error(`Error parsing field '${key}':`, e);
					}
				} else if (typeof data[key] === "object") {
					// Recur for nested objects
					data[key] = parseFields(data[key]);
				}
			}
		}
		return data;
	};

	const handleIncomingMessage = (message: any) => {
        console.log(message)
		if (message.event && message.event == Event.UpdatedPot) {
            console.log("set message here " + message);
			const updatedPotData = message.data;
			updatePotDataHandler(updatedPotData); // Update cropPots
		} else {
			console.log("set message here 11" + Object.entries(message));
            
			setMessages((prevMessages) => [...prevMessages, message]);
		}
	};

	// Function to send a message
	const sendMessage = (message: Message) => {
		if (socketRef.current && isConnected) {
			socketRef.current.send(JSON.stringify(message));
		} else {
			console.error("Cannot send message, WebSocket is not connected.");
		}
	};

	return { sendMessage, isConnected };
};

export default useWebSocket;
