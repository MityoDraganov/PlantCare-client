import { useState, useEffect, useRef, useContext } from "react";
import { InboxContext } from "../contexts/InboxContext";
import { PotContext } from "../contexts/PotContext";
import { Event, Message } from "../Interfaces/websocket.interface";
import toast from "react-hot-toast";
import { refreshToken } from "../lib/functions";

const useWebSocket = (url: string) => {
	const { AddMessage } = useContext(InboxContext);
	const { updatePotDataHandler } = useContext(PotContext);
	const [isConnected, setIsConnected] = useState(false);
	const socketRef = useRef<WebSocket | null>(null);
	const reconnectInterval = useRef<NodeJS.Timeout | null>(null);
	let toastPromiseRef = useRef<any>(null);

	useEffect(() => {
		const connect = () => {
			const socket = new WebSocket(url);
			socketRef.current = socket;

			socket.onopen = () => {
				console.log("WebSocket connection established");
				setIsConnected(true);
				if (reconnectInterval.current) {
					clearTimeout(reconnectInterval.current);
				}
			};

			socket.onmessage = (event) => {
				try {
					const message = JSON.parse(event.data);
					const parsedMessage = parseFields(message);

					handleIncomingMessage(parsedMessage);
				} catch (error) {
					console.error("Error parsing message:", error);
				}
			};

			socket.onerror = async (error) => {
				console.error("WebSocket error:", error);
				await refreshToken();
			};

			socket.onclose = () => {
				console.log(
					"WebSocket connection closed. Attempting to reconnect..."
				);
				setIsConnected(false);
				reconnectInterval.current = setTimeout(connect, 10000);
			};
		};

		connect();

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
				socketRef.current = null;
			}
			if (reconnectInterval.current) {
				clearTimeout(reconnectInterval.current);
			}
		};
	}, []);

	const parseFields = (data: any): any => {
		if (data && typeof data === "object") {
			for (const key in data) {
				if (
					typeof data[key] === "string" &&
					(data[key].startsWith("{") || data[key].startsWith("["))
				) {
					try {
						data[key] = JSON.parse(data[key]);
					} catch (e) {
						console.error(`Error parsing field '${key}':`, e);
					}
				} else if (typeof data[key] === "object") {
					data[key] = parseFields(data[key]);
				}
			}
		}
		return data;
	};

	const handleIncomingMessage = (message: any) => {
		if (message.event && message.event === Event.AsyncError) {
			const errorMessage = message.data;
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

		if (message.event && message.event === Event.NotificationAlert) {
			toast.success(message.data.toString());
			return;
		}

		// Add the new message
		AddMessage(message);
	};

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
