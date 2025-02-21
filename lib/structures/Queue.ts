export function Queue<T>(params?: QueueParams<T>) {
	let queue: T[] = params?.initialItems ?? [];

	return {
		enqueue: (item: T) => {
			queue.push(item);
		},
		dequeue: () => {
			return queue.shift();
		},
		peek: () => {
			return queue[0];
		},
		get size() {
			return queue.length;
		},
		get isEmpty() {
			return queue.length === 0;
		},
		clear: () => {
			queue = [];
		},
	};
}

export interface QueueParams<T> {
	initialItems?: T[];
}
