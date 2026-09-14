import { Stack } from "../../lib";

function main() {
	const history = Stack<string>();

	history.push("/home");
	history.push("/products");
	history.push("/products/42");

	console.log(history.pop()); // "/products/42"
	console.log(history.peek()); // "/products"
	console.log(history.size); // 2
}

main();
