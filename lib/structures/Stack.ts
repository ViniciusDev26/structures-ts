/**
 * Creates a LIFO (last-in, first-out) stack.
 *
 * @example
 * ```ts
 * const stack = Stack<number>({ initialItems: [1, 2] });
 * stack.push(3);
 * stack.pop(); // 3
 * ```
 */
export function Stack<T>(params?: StackParams<T>) {
	let stack: T[] = params?.initialItems ?? [];

	return {
		/** Pushes an item onto the top of the stack. */
		push: (item: T) => {
			stack.push(item);
		},
		/** Removes and returns the top item, or `undefined` if the stack is empty. */
		pop: () => {
			return stack.pop();
		},
		/** Returns the top item without removing it, or `undefined` if the stack is empty. */
		peek: () => {
			return stack[stack.length - 1];
		},
		/** Number of items currently in the stack. */
		get size() {
			return stack.length;
		},
		/** Whether the stack has no items. */
		get isEmpty() {
			return stack.length === 0;
		},
		/** Removes all items from the stack. */
		clear: () => {
			stack = [];
		},
	};
}

export interface StackParams<T> {
	initialItems?: T[];
}
