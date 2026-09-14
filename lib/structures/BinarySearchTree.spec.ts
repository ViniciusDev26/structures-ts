import { describe, expect, it } from "vitest";
import { BinarySearchTree } from "./BinarySearchTree";

const numberCompare = (a: number, b: number) => a - b;

describe("BinarySearchTree", () => {
	it("should be instanced", () => {
		const tree = BinarySearchTree<number>({ compare: numberCompare });
		expect(tree).toBeDefined();
	});

	it("should insert and check for values", () => {
		const tree = BinarySearchTree<number>({ compare: numberCompare });
		tree.insert(5);
		tree.insert(2);
		tree.insert(8);

		expect(tree.has(2)).toBe(true);
		expect(tree.has(8)).toBe(true);
		expect(tree.has(99)).toBe(false);
	});

	it("should return in-order traversal", () => {
		const tree = BinarySearchTree<number>({
			initialItems: [5, 2, 8, 1, 3],
			compare: numberCompare,
		});

		expect(tree.inOrder()).toEqual([1, 2, 3, 5, 8]);
	});

	it("should return the minimum value", () => {
		const tree = BinarySearchTree<number>({
			initialItems: [5, 2, 8, 1],
			compare: numberCompare,
		});

		expect(tree.min()).toBe(1);
	});

	it("should return undefined for min on an empty tree", () => {
		const tree = BinarySearchTree<number>({ compare: numberCompare });

		expect(tree.min()).toBeUndefined();
	});

	it("should remove a leaf value", () => {
		const tree = BinarySearchTree<number>({
			initialItems: [5, 2, 8],
			compare: numberCompare,
		});
		tree.remove(2);

		expect(tree.has(2)).toBe(false);
		expect(tree.size).toBe(2);
	});

	it("should remove a value with two children, keeping the tree ordered", () => {
		const tree = BinarySearchTree<number>({
			initialItems: [5, 2, 8, 7, 9],
			compare: numberCompare,
		});
		tree.remove(8);

		expect(tree.has(8)).toBe(false);
		expect(tree.inOrder()).toEqual([2, 5, 7, 9]);
		expect(tree.size).toBe(4);
	});

	it("should get size and isEmpty", () => {
		const tree = BinarySearchTree<number>({ compare: numberCompare });
		expect(tree.isEmpty).toBe(true);

		tree.insert(1);
		expect(tree.size).toBe(1);
		expect(tree.isEmpty).toBe(false);
	});

	it("should clear the tree", () => {
		const tree = BinarySearchTree<number>({
			initialItems: [1, 2, 3],
			compare: numberCompare,
		});
		tree.clear();

		expect(tree.size).toBe(0);
		expect(tree.inOrder()).toEqual([]);
	});
});
