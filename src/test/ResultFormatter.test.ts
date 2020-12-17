import { expect } from "chai"
import { ResultFormatter, ResultMode } from "../ResultFormatter"

describe("Result Formatter API", () => {

  it("should output by default in AUTO mode.", () => {
    let rf = new ResultFormatter()
    expect(rf.format(1)).equal("1")
  })

  it("should output in scientific mode.", () => {
    let rf = new ResultFormatter()
    rf.setMode(ResultMode.SCIENTIFIC)

    rf.setPrecision(2)
    expect(rf.format(9.87654321)).equal("9.88e+0")

    rf.setPrecision(4)
    expect(rf.format(9.87654321)).equal("9.8765e+0")

    rf.setPrecision(4)
    expect(rf.format(0.0000123456789)).equal("1.2346e-5")
  })

  it("should output in fixed mode.", () => {
    let rf = new ResultFormatter()
    rf.setMode(ResultMode.FIXED)

    rf.setPrecision(2)
    expect(rf.format(9.87654321)).equal("9.88")

    rf.setPrecision(4)
    expect(rf.format(9.87654321)).equal("9.8765")

    rf.setPrecision(6)
    expect(rf.format(0.0000123456789)).equal("0.000012")
  })

  it("should output in auto mode.", () => {
    let rf = new ResultFormatter()
    rf.setMode(ResultMode.AUTO)

    expect(rf.format(9.87654321)).equal("9.87654321")

    expect(rf.format(1234567890)).equal("1234567890")

    expect(rf.format(0.0000123456789)).equal("0.0000123456789")
  })

})
