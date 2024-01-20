export class Stack<T> {
  private _stack: T[] = [];

  constructor(items?: T[]) {
    if (!items) return;
    this._stack = items;
  }

  public push(item: T): void {
      this._stack.push(item);
  }

  public pop(): T | undefined {
      return this._stack.pop();
  }

  public peek(): T | undefined {
      return this._stack[this._stack.length - 1];
  }

  public get size(): number {
      return this._stack.length;
  }

  public get isEmpty(): boolean {
      return this._stack.length === 0;
  }

  public clear(): void {
      this._stack = [];
  }
}