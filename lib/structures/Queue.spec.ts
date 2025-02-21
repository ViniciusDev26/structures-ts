import { describe, it, expect } from "vitest";
import { Queue } from "./Queue";

describe("Queue", () => {
	it("should be instanced", () => {
		const numberQueue = Queue<number>();
		expect(numberQueue).toBeDefined();
	});

	it("should get a next item from queue", () => {
		const numberQueue = Queue<number>({ initialItems: [1, 2, 3] });

		const nextValue = numberQueue.dequeue();
		expect(nextValue).toBe(1);
	});

	it("should push a item in queue", () => {
		const stringList = Queue<number>({ initialItems: [1] });
		stringList.enqueue(2);

		expect(stringList.size).toBe(2);
		expect(stringList.dequeue()).toBe(1);
	});

	it("should peek next item in queue", () => {
		const stringList = Queue<number>({ initialItems: [1, 2, 5] });

		expect(stringList.size).toBe(3);
		expect(stringList.peek()).toBe(1);
		expect(stringList.size).toBe(3);
	});

	it("should clear queue", () => {
		const stringList = Queue<number>({ initialItems: [1, 2, 5] });
		stringList.clear();

		expect(stringList.size).toBe(0);
	});

	it("should get queue size", () => {
		const stringList = Queue<number>({ initialItems: [1, 2, 5] });

		expect(stringList.size).toBe(3);
	});

	it("should check if queue is empty", () => {
		const stringList = Queue<number>({ initialItems: [1, 2, 5] });
		stringList.clear();

		expect(stringList.isEmpty).toBeTruthy();
	});
});
