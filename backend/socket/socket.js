import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

// ✅ Enable CORS for Express API & WebSocket
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		credentials: true, // Allow cookies
	})
);

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {

	const userId = socket.handshake.query.userId;
	if (userId !== "undefined") userSocketMap[userId] = socket.id;

	// Send the list of online users
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];
