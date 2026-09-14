/**
 * Creates a list that tracks additions and removals relative to its initial
 * state (or the state since the last `update` call). Useful for diffing a
 * collection against a backend before sending a sync/patch request.
 *
 * @example
 * ```ts
 * const playlist = WatchedList<Music>({
 *   initialItems: [music1, music2],
 *   compareItems: (a, b) => a.name === b.name,
 * });
 * playlist.add(music3);
 * playlist.remove(music2);
 * playlist.getNewItems();     // [music3]
 * playlist.getRemovedItems(); // [music2]
 * ```
 */
export function WatchedList<T>({
	compareItems,
	initialItems,
}: WatchedListParams<T>) {
	let currentItems: T[] = initialItems || [];
	const initial: T[] = initialItems || [];
	let newItems: T[] = [];
	let removed: T[] = [];

	function isNewItem(item: T) {
		return newItems.filter((v) => compareItems(item, v)).length !== 0;
	}

	function isCurrentItem(item: T) {
		return currentItems.filter((v) => compareItems(item, v)).length !== 0;
	}

	function isRemovedItem(item: T) {
		return removed.filter((v) => compareItems(item, v)).length !== 0;
	}

	function removeFromNew(item: T) {
		newItems = newItems.filter((v) => !compareItems(v, item));
	}

	function removeFromCurrent(item: T) {
		currentItems = currentItems.filter((v) => !compareItems(v, item));
	}

	function removeFromRemoved(item: T) {
		removed = removed.filter((v) => !compareItems(v, item));
	}

	function wasAddedInitially(item: T) {
		return initial.filter((v) => compareItems(item, v)).length !== 0;
	}

	return {
		/** All items currently in the list. */
		getItems: () => currentItems,
		/** Items added since the initial state (or since the last `update`). */
		getNewItems: () => newItems,
		/** Items removed since the initial state (or since the last `update`). */
		getRemovedItems: () => removed,
		/** Whether the item is currently in the list. */
		exists: (item: T) => isCurrentItem(item),
		/** Adds an item to the list, tracking it as new unless it was part of the initial state. */
		add: (item: T) => {
			if (isRemovedItem(item)) {
				removeFromRemoved(item);
			}

			if (!isNewItem(item) && !wasAddedInitially(item)) {
				newItems.push(item);
			}

			if (!isCurrentItem(item)) {
				currentItems.push(item);
			}
		},
		/** Removes an item from the list, tracking it as removed unless it had only ever been a new (unsaved) item. */
		remove: (item: T) => {
			removeFromCurrent(item);

			if (isNewItem(item)) {
				removeFromNew(item);
				return;
			}

			if (!isRemovedItem(item)) {
				removed.push(item);
			}
		},
		/** Replaces the whole list with `items`, recomputing new/removed relative to the current state. */
		update: (items: T[]) => {
			const nextNewItems = items.filter((a) => {
				return !currentItems.some((b) => compareItems(a, b));
			});

			const nextRemovedItems = currentItems.filter((a) => {
				return !items.some((b) => compareItems(a, b));
			});

			currentItems = items;
			newItems = nextNewItems;
			removed = nextRemovedItems;
		},
	};
}

export interface WatchedListParams<T> {
	compareItems: (a: T, b: T) => boolean;
	initialItems?: T[];
}
