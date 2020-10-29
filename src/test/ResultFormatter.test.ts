import { expect } from "chai"
import { O_RDONLY } from "constants"
import { ResultFormatter } from "../ResultFormatter"

describe("Result Formatter API", () => {
  it("should output bt default in GENERAL/DECIMAL mode.", () => {
    let rf = new ResultFormatter()
    expect(rf.format(1)).equal("1")
  })
})
