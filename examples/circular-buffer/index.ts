import { CircularBuffer } from "../../lib";

function main() {
	const lastLogs = CircularBuffer<string>({ capacity: 3 });

	lastLogs.push("boot");
	lastLogs.push("connect");
	lastLogs.push("sync");
	lastLogs.push("request"); // "boot" is dropped, buffer is full

	console.log(lastLogs.toArray()); // ["connect", "sync", "request"]
	console.log(lastLogs.isFull); // true
}

main();
