import { describe, it, expect } from "vitest"
import { WatchedList } from "./WatchedList"

class StringList extends WatchedList<string> {
  public compareItems(a: string, b: string): boolean {
    return a === b
  }
}

describe("WatchedList", () => {
  it("should be instanced", () => {
    const stringList = new StringList (["John", "Doe"])

    expect(stringList).toBeDefined()
  })

  it("should remove a item list", () => {
    const stringList = new StringList (["John", "Doe"])
    stringList.remove("John")

    expect(stringList.getItems().length).toBe(1)
    expect(stringList.getItems()).contain("Doe")
    expect(stringList.getRemovedItems()).contain("John")
  })

  it("should add a new item list", () => {
    const stringList = new StringList (["John", "Doe"])
    stringList.add("Jane")

    expect(stringList.getItems().length).toBe(3)
    expect(stringList.getItems()).contain("Jane")
    expect(stringList.getNewItems()).contain("Jane")
  })
})