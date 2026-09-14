import { describe, expect, it } from "vitest";
import { PriorityQueue } from "./PriorityQueue";

describe("PriorityQueue", () => {
	it("should be instanced", () => {
		const queue = PriorityQueue<string>();
		expect(queue).toBeDefined();
	});

	it("should dequeue items in priority order", () => {
		const queue = PriorityQueue<string>();
		queue.enqueue("low", 2);
		queue.enqueue("urgent", 0);
		queue.enqueue("medium", 1);

		expect(queue.dequeue()).toBe("urgent");
		expect(queue.dequeue()).toBe("medium");
		expect(queue.dequeue()).toBe("low");
	});

	it("should peek the highest-priority item without removing it", () => {
		const queue = PriorityQueue<string>();
		queue.enqueue("low", 2);
		queue.enqueue("urgent", 0);

		expect(queue.peek()).toBe("urgent");
		expect(queue.size).toBe(2);
	});

	it("should get queue size and isEmpty", () => {
		const queue = PriorityQueue<string>();
		expect(queue.isEmpty).toBe(true);

		queue.enqueue("item", 1);
		expect(queue.size).toBe(1);
		expect(queue.isEmpty).toBe(false);
	});

	it("should clear the queue", () => {
		const queue = PriorityQueue<string>();
		queue.enqueue("item", 1);
		queue.clear();

		expect(queue.size).toBe(0);
	});

	it("should return undefined when dequeuing or peeking an empty queue", () => {
		const queue = PriorityQueue<string>();

		expect(queue.dequeue()).toBeUndefined();
		expect(queue.peek()).toBeUndefined();
	});
});
