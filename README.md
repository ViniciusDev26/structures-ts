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
import { WatchedList } from "structures-ts"
```

and use

```ts
  class MusicList extends WatchedList<Music> {
    // This method is used to compare if objects is equals
    compareItems(a: Music, b: Music): boolean {
      return a.name === b.name;
    }
  }
```

## Links:
- [NPM: structure-ts](https://www.npmjs.com/package/structures-ts)