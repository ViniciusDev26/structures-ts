import { describe, expect, it } from "vitest";
import { LinkedList } from "./LinkedList";

describe("LinkedList", () => {
	it("should be instanced", () => {
		const list = LinkedList<number>();
		expect(list).toBeDefined();
	});

	it("should append items", () => {
		const list = LinkedList<number>({ initialItems: [1, 2] });
		list.append(3);

		expect(list.toArray()).toEqual([1, 2, 3]);
		expect(list.size).toBe(3);
	});

	it("should prepend items", () => {
		const list = LinkedList<number>({ initialItems: [2, 3] });
		list.prepend(1);

		expect(list.toArray()).toEqual([1, 2, 3]);
	});

	it("should get an item by index", () => {
		const list = LinkedList<number>({ initialItems: [1, 2, 3] });

		expect(list.get(1)).toBe(2);
		expect(list.get(5)).toBeUndefined();
	});

	it("should remove an item by value", () => {
		const list = LinkedList<number>({ initialItems: [1, 2, 3] });

		expect(list.remove(2)).toBe(true);
		expect(list.toArray()).toEqual([1, 3]);
		expect(list.size).toBe(2);
	});

	it("should remove the head and keep the list consistent", () => {
		const list = LinkedList<number>({ initialItems: [1, 2, 3] });
		list.remove(1);

		expect(list.toArray()).toEqual([2, 3]);
		list.append(4);
		expect(list.toArray()).toEqual([2, 3, 4]);
	});

	it("should return false when removing a value that does not exist", () => {
		const list = LinkedList<number>({ initialItems: [1, 2] });

		expect(list.remove(99)).toBe(false);
	});

	it("should check if the list is empty", () => {
		const list = LinkedList<number>({ initialItems: [1] });
		list.clear();

		expect(list.isEmpty).toBe(true);
		expect(list.toArray()).toEqual([]);
	});
});
