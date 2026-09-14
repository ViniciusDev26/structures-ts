export interface PriorityQueueEntry<T> {
	item: T;
	priority: number;
}

/**
 * Creates a priority queue where lower `priority` values are dequeued first.
 *
 * @example
 * ```ts
 * const queue = PriorityQueue<string>();
 * queue.enqueue("low", 2);
 * queue.enqueue("urgent", 0);
 * queue.dequeue(); // "urgent"
 * ```
 */
export function PriorityQueue<T>(params?: PriorityQueueParams<T>) {
	let entries: PriorityQueueEntry<T>[] = params?.initialItems ?? [];

	function sort() {
		entries.sort((a, b) => a.priority - b.priority);
	}

	sort();

	return {
		/** Adds an item with the given priority (lower dequeues first). */
		enqueue: (item: T, priority: number) => {
			entries.push({ item, priority });
			sort();
		},
		/** Removes and returns the highest-priority item, or `undefined` if empty. */
		dequeue: () => {
			return entries.shift()?.item;
		},
		/** Returns the highest-priority item without removing it, or `undefined` if empty. */
		peek: () => {
			return entries[0]?.item;
		},
		/** Number of items currently in the queue. */
		get size() {
			return entries.length;
		},
		/** Whether the queue has no items. */
		get isEmpty() {
			return entries.length === 0;
		},
		/** Removes all items from the queue. */
		clear: () => {
			entries = [];
		},
	};
}

export interface PriorityQueueParams<T> {
	initialItems?: PriorityQueueEntry<T>[];
}
