import express, { Request, Response } from "express";
import { createServer, Server } from "http";
import cors from "cors";
import { genRandomString } from "./utils/randomString";
import { Server as SocketServer, Socket } from "socket.io";
import { Player, Room } from "./types/types";


const app = express();
const httpServer: Server = createServer(app);

const CORS_OPTION = {
	origin: 'http://localhost:4000'
};

const rooms: Room[] = [];

app.use(cors(CORS_OPTION));
app.use(express.json());

app.post("/create-room", (req: Request, res: Response) => {
	const { id, name } = req.body as { id: string; name: string };
	const roomId: string = genRandomString(8);

	const player: Player = {
		id,
		name,
		turn: "x"
	};

	const newRoom: Room = {
		id: roomId,
		players: [player]
	};

	rooms.push(newRoom);

	res.status(201).json({
		message: "Successfully created room",
		roomId
	});
});

app.post("/join-room/:roomId", (req: Request, res: Response) => {
	const { roomId } = req.params as { roomId: string };
	const { name, id } = req.body as { name: string; id: string };

	const room = rooms.find(r => r.id === roomId);
	if (!room) {
		return res.status(404).json({
			error: "Cannot find a room with the id " + roomId
		});
	}

	room.players.push({ id, name, turn: "o" });

	res.status(200).json({
		message: "Successfully joined room"
	});
});

const io = new SocketServer(httpServer, {
	cors: CORS_OPTION
});

io.on("connection", (socket: Socket) => {
	const { user, roomId } = socket.handshake.auth;

	if (!getRoom(roomId)) {
		return io.emit("connect-err", "Room does exits!");
	}

	socket.join(roomId);

	io.to(socket.id).emit("turn", getTurn(roomId, user.id));

	io.to(socket.id).emit("opponent", getOpponent(roomId, user.id));

	socket.to(roomId).emit("player-joined", { ...user, turn: getTurn(roomId, user.id) });

	socket.on("play", (pos, turn) => {
		socket.broadcast.to(roomId).emit("played", pos, turn);
	});

	socket.on("stop", msg => {
		socket.emit("end", msg);
	});

	socket.on("disconnect", () => {
		leaveRoom(roomId, user.id);
		socket.broadcast.emit("player-disconnected", user.name);
	});
});

httpServer.listen(process.env.PORT || 5000, () => {
	console.log(`Server started on port ${process.env.PORT || 5000}`);
});

function getRoom(roomId: string): Room | undefined {
	return rooms.find(room => room.id === roomId);
}

function getTurn(roomId: string, playerId: string): string | undefined {
	const room = getRoom(roomId);
	return room?.players.find(player => player.id === playerId)?.turn;
}

function getOpponent(roomId: string, playerId: string): Player | undefined {
	const room = getRoom(roomId);
	return room?.players.filter(player => player.id !== playerId)[0];
}

function leaveRoom(roomId: string, playerId: string) {
	const room = getRoom(roomId);

	if (!room) return;
	room.players = room.players.filter(player => player.id !== playerId);

	if (room.players.length <= 0) {
		let index = rooms.findIndex(room => room.id === roomId);
		rooms.splice(index, 1);
	}
}
