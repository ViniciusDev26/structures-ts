import { describe, expect, it } from "vitest";
import { CircularBuffer } from "./CircularBuffer";

describe("CircularBuffer", () => {
	it("should be instanced", () => {
		const buffer = CircularBuffer<number>({ capacity: 3 });
		expect(buffer).toBeDefined();
	});

	it("should throw when capacity is not greater than 0", () => {
		expect(() => CircularBuffer<number>({ capacity: 0 })).toThrow();
	});

	it("should push items while under capacity", () => {
		const buffer = CircularBuffer<number>({ capacity: 3 });
		buffer.push(1);
		buffer.push(2);

		expect(buffer.toArray()).toEqual([1, 2]);
		expect(buffer.isFull).toBe(false);
	});

	it("should overwrite the oldest item once full", () => {
		const buffer = CircularBuffer<number>({ capacity: 3 });
		buffer.push(1);
		buffer.push(2);
		buffer.push(3);
		buffer.push(4);

		expect(buffer.toArray()).toEqual([2, 3, 4]);
		expect(buffer.isFull).toBe(true);
		expect(buffer.size).toBe(3);
	});

	it("should accept initialItems up to capacity", () => {
		const buffer = CircularBuffer<number>({
			capacity: 3,
			initialItems: [1, 2, 3, 4],
		});

		expect(buffer.toArray()).toEqual([2, 3, 4]);
	});

	it("should clear the buffer", () => {
		const buffer = CircularBuffer<number>({
			capacity: 2,
			initialItems: [1, 2],
		});
		buffer.clear();

		expect(buffer.isEmpty).toBe(true);
		expect(buffer.toArray()).toEqual([]);
	});
});
