import { LinkedList } from "../../lib";

function main() {
	const list = LinkedList<number>({ initialItems: [1, 2, 3] });

	list.append(4);
	list.prepend(0);
	list.remove(2);

	console.log(list.toArray()); // [0, 1, 3, 4]
	console.log(list.get(1)); // 1
	console.log(list.size); // 4
}

main();
