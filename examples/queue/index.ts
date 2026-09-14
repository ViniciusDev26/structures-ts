import { Queue } from "../../lib";

interface Job {
	id: number;
}

function main() {
	const jobs = Queue<Job>();

	jobs.enqueue({ id: 1 });
	jobs.enqueue({ id: 2 });

	console.log(jobs.dequeue()); // { id: 1 }
	console.log(jobs.peek()); // { id: 2 }
	console.log(jobs.size); // 1
}

main();
