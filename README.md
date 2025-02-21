# structures-ts

## Overview

This lib is a helper to construct complex estructures using typescript

Current Structures:

- Watched List
- Stack
- Queue

## Get Started

```bash
npm install structures-ts
```

Import on project:

```ts
import { WatchedList } from "structures-ts";
```

and use

```ts
const playlist = WatchedList<Music>({
  initialItems: [music1, music2],
  compareItems: (a, b) => a.name === b.name,
});
```

## Links:

- [NPM: structure-ts](https://www.npmjs.com/package/structures-ts)
