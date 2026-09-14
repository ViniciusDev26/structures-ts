/**
 * Creates a fixed-capacity buffer that overwrites the oldest item once full.
 *
 * @example
 * ```ts
 * const buffer = CircularBuffer<number>({ capacity: 3 });
 * buffer.push(1);
 * buffer.push(2);
 * buffer.push(3);
 * buffer.push(4);
 * buffer.toArray(); // [2, 3, 4]
 * ```
 */
export function CircularBuffer<T>(params: CircularBufferParams<T>) {
	const { capacity } = params;

	if (capacity <= 0) {
		throw new Error("CircularBuffer capacity must be greater than 0");
	}

	let buffer: T[] = [];
	let start = 0;

	for (const item of params.initialItems ?? []) {
		pushInternal(item);
	}

	function pushInternal(item: T) {
		if (buffer.length < capacity) {
			buffer.push(item);
			return;
		}

		buffer[start] = item;
		start = (start + 1) % capacity;
	}

	return {
		/** Adds an item, overwriting the oldest one if the buffer is at capacity. */
		push: (item: T) => {
			pushInternal(item);
		},
		/** Returns the buffer contents in insertion (oldest-first) order. */
		toArray: () => {
			return [...buffer.slice(start), ...buffer.slice(0, start)];
		},
		/** Maximum number of items the buffer can hold. */
		get capacity() {
			return capacity;
		},
		/** Number of items currently in the buffer. */
		get size() {
			return buffer.length;
		},
		/** Whether the buffer has no items. */
		get isEmpty() {
			return buffer.length === 0;
		},
		/** Whether the buffer is at capacity (further pushes overwrite the oldest item). */
		get isFull() {
			return buffer.length === capacity;
		},
		/** Removes all items from the buffer. */
		clear: () => {
			buffer = [];
			start = 0;
		},
	};
}

export interface CircularBufferParams<T> {
	capacity: number;
	initialItems?: T[];
}
