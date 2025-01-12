import { useState, useEffect, useRef, useContext } from "react";
import { InboxContext } from "../contexts/InboxContext";
import { PotContext } from "../contexts/PotContext"; // Import PotContext
import { Event, Message } from "../Interfaces/websocket.interface";
import toast from "react-hot-toast";
import { refreshToken } from "../lib/functions";
import { MeasurementNotification } from "../components/notifications/MeasurementNotification";

const useWebSocket = (url: string) => {
	const { setMessages } = useContext(InboxContext);
	const { updatePotDataHandler } = useContext(PotContext); // Access cropPots and updatePotDataHandler
	const [isConnected, setIsConnected] = useState(false); // Connection status
	const socketRef = useRef<WebSocket | null>(null);
	const reconnectInterval = useRef<NodeJS.Timeout | null>(null); // Store reconnect timeout
	let toastPromiseRef = useRef<any>(null); // Reference for toast promise

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

					// Handle the message
					handleIncomingMessage(parsedMessage);
				} catch (error) {
					console.error("Error parsing message:", error);
				}
			};

			// Handle WebSocket errors
			socket.onerror = async (error) => {
				console.error("WebSocket error:", error);
				await refreshToken();
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
	}, [url, updatePotDataHandler]); // Reconnect if updatePotDataHandler changes

	// Parse any JSON strings within the data fields
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

	// Handle incoming messages
	const handleIncomingMessage = (message: any) => {
		if (message.event && message.event === Event.AsyncError) {
			const errorMessage = message.data;

			// Reject the toast promise if there's an error
			if (toastPromiseRef.current) {
				toastPromiseRef.current({
					isLoading: false,
					success: false,
					error: errorMessage.error.toString(),
				});
				toastPromiseRef.current = null;
			} else {
				toast.error(errorMessage.error.toString());
			}
			return;
		}

		if (message.event && message.event === Event.UpdatedPot) {
			const updatedPotData = message.data;
			updatePotDataHandler(updatedPotData);

			// Resolve the toast promise if the pot update is successful
			if (toastPromiseRef.current) {
				toastPromiseRef.current({
					isLoading: false,
					success: true,
					message: "Pot updated successfully!",
				});
				toastPromiseRef.current = null;
			}
			return;
		}

		if (message.event && message.event === Event.PotMeasurements) {
			const updatedPotData = message.data;
			//updatePotDataHandler(updatedPotData);
			console.log(updatedPotData);

			// Resolve the toast promise if the pot update is successful
			if (toastPromiseRef.current) {
				toastPromiseRef.current({
					isLoading: false,
					success: true,
					message: "Pot measurements updated successfully!",
				});
				toastPromiseRef.current = null;
			}
			return;
		}

		if (message.event && message.event === Event.NotificationAlert) {
			toast.success(message.data.toString());
			return;
		}

		setMessages((prevMessages) => [...prevMessages, message]);
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
