import { describe, it, expect } from "vitest";
import { WatchedList } from "./WatchedList";

describe("WatchedList", () => {
	it("should be instanced", () => {
		const stringList = WatchedList({
			compareItems: (a, b) => a === b,
			initialItems: ["John", "Doe"],
		});

		expect(stringList).toBeDefined();
	});

	it("should remove a item list", () => {
		const stringList = WatchedList({
			compareItems: (a, b) => a === b,
			initialItems: ["John", "Doe"],
		});
		stringList.remove("John");

		expect(stringList.getItems().length).toBe(1);
		expect(stringList.getItems()).contain("Doe");
		expect(stringList.getRemovedItems()).contain("John");
	});

	it("should add a new item list", () => {
		const stringList = WatchedList({
			compareItems: (a, b) => a === b,
			initialItems: ["John", "Doe"],
		});
		stringList.add("Jane");

		expect(stringList.getItems().length).toBe(3);
		expect(stringList.getItems()).contain("Jane");
		expect(stringList.getNewItems()).contain("Jane");
	});
});
