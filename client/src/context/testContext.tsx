import { createContext } from "react";
export interface TestContext {
  testNum: number,
  testStr: string,
  testObj: {test: string}
}

export const TestContext = createContext<TestContext>({} as TestContext)
