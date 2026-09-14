interface TreeNode<T> {
	value: T;
	left: TreeNode<T> | null;
	right: TreeNode<T> | null;
}

/**
 * Creates a binary search tree ordered by the given `compare` function.
 *
 * @example
 * ```ts
 * const tree = BinarySearchTree<number>({ compare: (a, b) => a - b });
 * tree.insert(5);
 * tree.insert(2);
 * tree.has(2); // true
 * tree.inOrder(); // [2, 5]
 * ```
 */
export function BinarySearchTree<T>(params: BinarySearchTreeParams<T>) {
	const { compare } = params;
	let root: TreeNode<T> | null = null;
	let length = 0;

	function insertNode(node: TreeNode<T> | null, value: T): TreeNode<T> {
		if (!node) {
			length++;
			return { value, left: null, right: null };
		}

		if (compare(value, node.value) < 0) {
			node.left = insertNode(node.left, value);
		} else if (compare(value, node.value) > 0) {
			node.right = insertNode(node.right, value);
		}

		return node;
	}

	function findNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
		if (!node) return null;

		const result = compare(value, node.value);
		if (result === 0) return node;
		return result < 0
			? findNode(node.left, value)
			: findNode(node.right, value);
	}

	function minNode(node: TreeNode<T>): TreeNode<T> {
		return node.left ? minNode(node.left) : node;
	}

	function removeNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
		if (!node) return null;

		const result = compare(value, node.value);

		if (result < 0) {
			node.left = removeNode(node.left, value);
			return node;
		}

		if (result > 0) {
			node.right = removeNode(node.right, value);
			return node;
		}

		if (!node.left) {
			length--;
			return node.right;
		}

		if (!node.right) {
			length--;
			return node.left;
		}

		const successor = minNode(node.right);
		node.value = successor.value;
		node.right = removeNode(node.right, successor.value);
		return node;
	}

	function traverseInOrder(node: TreeNode<T> | null, result: T[]) {
		if (!node) return;
		traverseInOrder(node.left, result);
		result.push(node.value);
		traverseInOrder(node.right, result);
	}

	for (const item of params.initialItems ?? []) {
		root = insertNode(root, item);
	}

	return {
		/** Inserts a value into the tree. */
		insert: (value: T) => {
			root = insertNode(root, value);
		},
		/** Returns whether a value exists in the tree. */
		has: (value: T) => {
			return findNode(root, value) !== null;
		},
		/** Removes a value from the tree, if present. */
		remove: (value: T) => {
			root = removeNode(root, value);
		},
		/** Returns the smallest value in the tree, or `undefined` if empty. */
		min: () => {
			return root ? minNode(root).value : undefined;
		},
		/** Returns all values in ascending order. */
		inOrder: () => {
			const result: T[] = [];
			traverseInOrder(root, result);
			return result;
		},
		/** Number of values currently in the tree. */
		get size() {
			return length;
		},
		/** Whether the tree has no values. */
		get isEmpty() {
			return length === 0;
		},
		/** Removes all values from the tree. */
		clear: () => {
			root = null;
			length = 0;
		},
	};
}

export interface BinarySearchTreeParams<T> {
	compare: (a: T, b: T) => number;
	initialItems?: T[];
}
