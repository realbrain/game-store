function genRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function genRandomString(len: number): string {
	let randomString: string = "";
	for (let i: number = 0; i < len; i++) {
		randomString += String.fromCharCode(genRandomNumber(65, 91));
	}

	return randomString;
}
