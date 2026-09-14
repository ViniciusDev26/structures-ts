/**
 * Creates a FIFO (first-in, first-out) queue.
 *
 * @example
 * ```ts
 * const queue = Queue<number>({ initialItems: [1, 2] });
 * queue.enqueue(3);
 * queue.dequeue(); // 1
 * ```
 */
export function Queue<T>(params?: QueueParams<T>) {
	let queue: T[] = params?.initialItems ?? [];

	return {
		/** Adds an item to the end of the queue. */
		enqueue: (item: T) => {
			queue.push(item);
		},
		/** Removes and returns the item at the front of the queue, or `undefined` if the queue is empty. */
		dequeue: () => {
			return queue.shift();
		},
		/** Returns the item at the front of the queue without removing it, or `undefined` if the queue is empty. */
		peek: () => {
			return queue[0];
		},
		/** Number of items currently in the queue. */
		get size() {
			return queue.length;
		},
		/** Whether the queue has no items. */
		get isEmpty() {
			return queue.length === 0;
		},
		/** Removes all items from the queue. */
		clear: () => {
			queue = [];
		},
	};
}

export interface QueueParams<T> {
	initialItems?: T[];
}
