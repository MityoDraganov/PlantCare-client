import { useEffect, useState, useCallback } from "react";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

const useWebSocket = () => {
	const [ws, setWs] = useState<WebSocket | null>(null); // Type the state as WebSocket or null
	const [message, setMessage] = useState<string>("");

	useEffect(() => {
		// Connect to the WebSocket server
		const wsInstance = new WebSocket(SOCKET_SERVER_URL);

		wsInstance.onopen = () => {
			console.log("WebSocket connection established");
		};

		wsInstance.onmessage = (event) => {
			console.log("Received message:", event.data);
			setMessage(event.data);
		};

		wsInstance.onclose = () => {
			console.log("WebSocket connection closed");
		};

		wsInstance.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		setWs(wsInstance);

		// Clean up WebSocket connection on component unmount
		return () => {
			if (wsInstance) {
				wsInstance.close();
			}
		};
	}, [SOCKET_SERVER_URL]);

	const sendMessage = useCallback(
		(msg: string) => {
			// Explicitly type msg as string
			if (ws) {
				ws.send(msg);
			}
		},
		[ws]
	);

	return { message, sendMessage };
};

export default useWebSocket;
