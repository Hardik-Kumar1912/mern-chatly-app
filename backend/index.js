import express from "express"; 
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*", (req,res) => {
	res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})


// ✅ Start the server only after database is connected
connectDB().then(() => {
	server.listen(PORT, () => {
		console.log(`🚀 Server running on port ${PORT}`);
	});
});
