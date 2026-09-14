interface LinkedListNode<T> {
	value: T;
	next: LinkedListNode<T> | null;
}

/**
 * Creates a singly linked list.
 *
 * @example
 * ```ts
 * const list = LinkedList<number>({ initialItems: [1, 2] });
 * list.append(3);
 * list.toArray(); // [1, 2, 3]
 * ```
 */
export function LinkedList<T>(params?: LinkedListParams<T>) {
	let head: LinkedListNode<T> | null = null;
	let tail: LinkedListNode<T> | null = null;
	let length = 0;

	function createNode(value: T): LinkedListNode<T> {
		return { value, next: null };
	}

	function nodeAt(index: number): LinkedListNode<T> | null {
		if (index < 0 || index >= length) return null;

		let current = head;
		for (let i = 0; i < index; i++) {
			current = current?.next ?? null;
		}
		return current;
	}

	for (const item of params?.initialItems ?? []) {
		appendInternal(item);
	}

	function appendInternal(value: T) {
		const node = createNode(value);

		if (!head || !tail) {
			head = node;
			tail = node;
		} else {
			tail.next = node;
			tail = node;
		}

		length++;
	}

	return {
		/** Adds an item to the end of the list. */
		append: (value: T) => {
			appendInternal(value);
		},
		/** Adds an item to the start of the list. */
		prepend: (value: T) => {
			const node = createNode(value);

			if (!head) {
				head = node;
				tail = node;
			} else {
				node.next = head;
				head = node;
			}

			length++;
		},
		/** Returns the item at `index`, or `undefined` if out of bounds. */
		get: (index: number) => {
			return nodeAt(index)?.value;
		},
		/** Removes the first item equal to `value` (using `===`). Returns whether an item was removed. */
		remove: (value: T) => {
			let previous: LinkedListNode<T> | null = null;
			let current = head;

			while (current) {
				if (current.value === value) {
					if (previous) {
						previous.next = current.next;
					} else {
						head = current.next;
					}

					if (current === tail) {
						tail = previous;
					}

					length--;
					return true;
				}

				previous = current;
				current = current.next;
			}

			return false;
		},
		/** Returns the list contents as a plain array, from head to tail. */
		toArray: () => {
			const result: T[] = [];
			let current = head;

			while (current) {
				result.push(current.value);
				current = current.next;
			}

			return result;
		},
		/** Number of items currently in the list. */
		get size() {
			return length;
		},
		/** Whether the list has no items. */
		get isEmpty() {
			return length === 0;
		},
		/** Removes all items from the list. */
		clear: () => {
			head = null;
			tail = null;
			length = 0;
		},
	};
}

export interface LinkedListParams<T> {
	initialItems?: T[];
}
