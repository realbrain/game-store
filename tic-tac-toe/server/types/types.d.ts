export interface Player {
	id: string;
	name: string;
	turn: string;
}

export interface Room {
	id: string;
	players: Player[];
}
