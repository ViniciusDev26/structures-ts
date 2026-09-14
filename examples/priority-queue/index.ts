import { PriorityQueue } from "../../lib";

function main() {
	const tickets = PriorityQueue<string>();

	tickets.enqueue("low-priority bug", 2);
	tickets.enqueue("outage", 0);
	tickets.enqueue("feature request", 3);
	tickets.enqueue("degraded performance", 1);

	while (!tickets.isEmpty) {
		console.log(tickets.dequeue());
	}
	// outage
	// degraded performance
	// low-priority bug
	// feature request
}

main();
