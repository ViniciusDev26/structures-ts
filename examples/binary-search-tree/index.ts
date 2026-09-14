import { BinarySearchTree } from "../../lib";

function main() {
	const tree = BinarySearchTree<number>({
		compare: (a, b) => a - b,
		initialItems: [8, 3, 10, 1, 6],
	});

	console.log(tree.inOrder()); // [1, 3, 6, 8, 10]
	console.log(tree.has(6)); // true
	console.log(tree.min()); // 1

	tree.remove(3);
	console.log(tree.inOrder()); // [1, 6, 8, 10]
}

main();
