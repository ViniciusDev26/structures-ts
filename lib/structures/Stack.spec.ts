import { describe, it, expect } from "vitest"
import { Stack } from "./Stack"

describe("Stack", () => {
  it("should be instanced", () => {
    const numberStack = new Stack<number>()

    expect(numberStack).toBeDefined()
  })

  it("should get a next item from stack", () => {
    const numberStack = new Stack<number> ([1, 2, 3])
  
    const nextValue = numberStack.pop();
    expect(nextValue).toBe(3)
  })

  it("should push a new item in stack", () => {
    const stringList = new Stack<number>([1])
    stringList.push(2)

    expect(stringList.size).toBe(2);
    expect(stringList.pop()).toBe(2);
  })

  it("should peek next item in stack", () => {
    const stringList = new Stack<number>([1, 2, 5])

    expect(stringList.size).toBe(3);
    expect(stringList.peek()).toBe(5);
    expect(stringList.size).toBe(3);
  })

  it("should clear stack", () => {	
    const stringList = new Stack<number>([1, 2, 5])
    stringList.clear()

    expect(stringList.size).toBe(0);
  })

  it("should get stack size", () => {
    const stringList = new Stack<number>([1, 2, 5])
    
    expect(stringList.size).toBe(3);
  })

  it("should check if stack is empty", () => {
    const stringList = new Stack<number>([1, 2, 5])
    stringList.clear()

    expect(stringList.isEmpty).toBeTruthy();
  })

  
})