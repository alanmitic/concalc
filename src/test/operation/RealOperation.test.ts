import { expect } from "chai"
import { RealOperation } from "../../operation/RealOperation"

describe("RealOperation API", () => {

  it("should implement assign operation", () => {
    let op = new RealOperation()
    expect(op.assign(1.23456789)).equal(1.23456789)
  })

  it("should implement unaryMinus operation", () => {
    let op = new RealOperation()
    expect(op.unaryMinus(1.23456789)).equal(-1.23456789)
  })

  it("should implement unaryPlus operation", () => {
    let op = new RealOperation()
    expect(op.unaryPlus(1.23456789)).equal(1.23456789)
  })

  it("should implement add operation", () => {
    let op = new RealOperation()
    expect(op.add(1.2, 3.4)).equal(4.6)
  })

  it("should implement subtract operation", () => {
    let op = new RealOperation()
    expect(op.subtract(1.75, 0.5)).equal(1.25)
  })

  it("should implement multiply operation", () => {
    let op = new RealOperation()
    expect(op.multiply(1.5, 0.5)).equal(0.75)
  })

  it("should implement divide operation", () => {
    let op = new RealOperation()
    expect(op.divide(3, 2)).equal(1.5)
  })

  it("should implement power operation", () => {
    let op = new RealOperation()
    expect(op.power(9, 0.5)).equal(3)
  })

  it("should implement modulo operation", () => {
    let op = new RealOperation()
    expect(op.modulo(9, 2)).equal(1)
  })

  it("should not support not operation", () => {
    let op = new RealOperation()
    expect(() => { op.not(1) }).to.throw("Operation not supported in real mode!")
  })

  it("should not support or operation", () => {
    let op = new RealOperation()
    expect(() => { op.or(1, 2) }).to.throw("Operation not supported in real mode!")
  })

  it("should not support and operation", () => {
    let op = new RealOperation()
    expect(() => { op.and(1, 2) }).to.throw("Operation not supported in real mode!")
  })

  it("should not support xor operation", () => {
    let op = new RealOperation()
    expect(() => { op.xor(1, 2) }).to.throw("Operation not supported in real mode!")
  })

  it("should not support left shift operation", () => {
    let op = new RealOperation()
    expect(() => { op.leftShift(1, 2) }).to.throw("Operation not supported in real mode!")
  })

  it("should not support right shift operation", () => {
    let op = new RealOperation()
    expect(() => { op.rightShift(1, 2) }).to.throw("Operation not supported in real mode!")
  })

  it("should not support unsigned right shift operation", () => {
    let op = new RealOperation()
    expect(() => { op.unsignedRightShift(1, 2) }).to.throw("Operation not supported in real mode!")
  })

})
