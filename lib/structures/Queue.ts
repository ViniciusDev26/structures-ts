export class Queue<T> {
  private queue: T[] = [];

  constructor(items?: T[]) {
    if (items) this.queue = items;
  }

  public get size(): number {
    return this.queue.length;
  }

  public get isEmpty(): boolean {
    return this.size === 0;
  }

  public enqueue(item: T): void {
    this.queue.push(item);
  }

  public dequeue(): T | undefined {
    return this.queue.shift();
  }

  public peek(): T | undefined {
    return this.queue[0];
  }

  public clear(): void {
    this.queue = [];
  }

  public toArray(): T[] {
    return this.queue.slice();
  }
}