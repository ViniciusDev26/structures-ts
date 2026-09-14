# structures-ts

[![npm version](https://img.shields.io/npm/v/structures-ts.svg)](https://www.npmjs.com/package/structures-ts)
[![CI](https://github.com/ViniciusDev26/structures-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/ViniciusDev26/structures-ts/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

Type-safe, dependency-free data structures for TypeScript, built as plain factory functions instead of classes.

## Structures

- **Stack** — LIFO
- **Queue** — FIFO
- **LinkedList** — singly linked list
- **PriorityQueue** — dequeues items in priority order
- **BinarySearchTree** — ordered tree with custom `compare`
- **CircularBuffer** — fixed-capacity buffer that overwrites the oldest item once full
- **WatchedList** — a list that tracks what was added/removed relative to its initial state (diffable list)

## Install

```bash
npm install structures-ts
# or
pnpm add structures-ts
```

## Usage

### Stack

```ts
import { Stack } from "structures-ts";

const stack = Stack<number>({ initialItems: [1, 2] });

stack.push(3);
stack.pop(); // 3
stack.peek(); // 2
stack.size; // 2
stack.isEmpty; // false
stack.clear();
```

### Queue

```ts
import { Queue } from "structures-ts";

const queue = Queue<number>({ initialItems: [1, 2] });

queue.enqueue(3);
queue.dequeue(); // 1
queue.peek(); // 2
queue.size; // 2
queue.isEmpty; // false
queue.clear();
```

### LinkedList

```ts
import { LinkedList } from "structures-ts";

const list = LinkedList<number>({ initialItems: [1, 2, 3] });

list.append(4);
list.prepend(0);
list.remove(2);

list.toArray(); // [0, 1, 3, 4]
list.get(1); // 1
list.size; // 4
```

### PriorityQueue

Lower `priority` values are dequeued first.

```ts
import { PriorityQueue } from "structures-ts";

const tickets = PriorityQueue<string>();

tickets.enqueue("low-priority bug", 2);
tickets.enqueue("outage", 0);

tickets.dequeue(); // "outage"
tickets.peek(); // "low-priority bug"
```

### BinarySearchTree

Ordered by a custom `compare` function, so it works with any comparable type.

```ts
import { BinarySearchTree } from "structures-ts";

const tree = BinarySearchTree<number>({
  compare: (a, b) => a - b,
  initialItems: [8, 3, 10, 1, 6],
});

tree.has(6); // true
tree.min(); // 1
tree.inOrder(); // [1, 3, 6, 8, 10]
tree.remove(3);
```

### CircularBuffer

```ts
import { CircularBuffer } from "structures-ts";

const lastLogs = CircularBuffer<string>({ capacity: 3 });

lastLogs.push("boot");
lastLogs.push("connect");
lastLogs.push("sync");
lastLogs.push("request"); // "boot" is dropped, buffer is full

lastLogs.toArray(); // ["connect", "sync", "request"]
lastLogs.isFull; // true
```

### WatchedList

Useful for syncing a collection with a backend: it keeps track of which items are new, current, and removed since it was created (or since the last `update` call).

```ts
import { WatchedList } from "structures-ts";

interface Music {
  name: string;
}

const music1: Music = { name: "Music 1" };
const music2: Music = { name: "Music 2" };
const music3: Music = { name: "Music 3" };

const playlist = WatchedList<Music>({
  initialItems: [music1, music2],
  compareItems: (a, b) => a.name === b.name,
});

playlist.add(music3);
playlist.remove(music2);

playlist.getItems(); // [music1, music3]
playlist.getNewItems(); // [music3]
playlist.getRemovedItems(); // [music2]
playlist.exists(music1); // true
```

More runnable examples for every structure live under [`examples/`](./examples).

## Development

```bash
pnpm install
pnpm test    # run tests
pnpm lint    # check formatting & lint rules (biome)
pnpm build   # compile to dist/
```

See `CLAUDE.md` for architecture notes if you're contributing.

## Links

- [NPM: structures-ts](https://www.npmjs.com/package/structures-ts)
