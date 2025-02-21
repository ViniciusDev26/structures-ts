export function WatchedList<T>({
	compareItems,
	initialItems,
}: WatchedListParams<T>) {
	let currentItems = initialItems || [];
	let initial = initialItems || [];
	let new_items = [];
	let removed = [];

	function isNewItem(item: T) {
		return new_items.filter((v) => compareItems(item, v)).length !== 0;
	}

	function isCurrentItem(item: T) {
		return currentItems.filter((v) => compareItems(item, v)).length !== 0;
	}

	function isRemovedItem(item: T) {
		return removed.filter((v) => compareItems(item, v)).length !== 0;
	}

	function removeFromNew(item: T) {
		new_items = new_items.filter((v) => !compareItems(v, item));
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
		getItems: () => currentItems,
		getNewItems: () => new_items,
		getRemovedItems: () => removed,
		exists: (item: T) => isCurrentItem(item),
		add: (item: T) => {
			if (isRemovedItem(item)) {
				removeFromRemoved(item);
			}

			if (!isNewItem(item) && !wasAddedInitially(item)) {
				new_items.push(item);
			}

			if (!isCurrentItem(item)) {
				currentItems.push(item);
			}
		},
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
		update: (items: T[]) => {
			const newItems = items.filter((a) => {
				return !currentItems.some((b) => compareItems(a, b));
			});

			const removedItems = currentItems.filter((a) => {
				return !items.some((b) => compareItems(a, b));
			});

			currentItems = items;
			new_items = newItems;
			removed = removedItems;
		},
	};
}

export interface WatchedListParams<T> {
	compareItems: (a: T, b: T) => boolean;
	initialItems?: T[];
}
