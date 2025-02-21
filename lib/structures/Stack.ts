export function Stack<T>(params?: StackParams<T>) {
	let stack: T[] = params?.initialItems ?? [];

	return {
		push: (item: T) => {
			stack.push(item);
		},
		pop: () => {
			return stack.pop();
		},
		peek: () => {
			return stack[stack.length - 1];
		},
		get size() {
			return stack.length;
		},
		get isEmpty() {
			return stack.length === 0;
		},
		clear: () => {
			stack = [];
		},
	};
}

export interface StackParams<T> {
	initialItems?: T[];
}
