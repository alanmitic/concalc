import { expect } from "chai"
import { ProgOperation } from "../../operation/ProgOperation"

describe("ProgOperation API", () => {

  it("should implement assign operation", () => {
    let op = new ProgOperation(32)
    expect(op.assign(1.23456789)).equal(1)
  })

  it("should implement unaryMinus operation", () => {
    let op = new ProgOperation(32)
    expect(op.unaryMinus(1.23456789)).equal(-1)
  })

  it("should implement unaryPlus operation", () => {
    let op = new ProgOperation(32)
    expect(op.unaryPlus(1.23456789)).equal(1)
  })

  it("should implement add operation", () => {
    let op = new ProgOperation(32)
    expect(op.add(1.2, 3.4)).equal(4)
  })

  it("should implement subtract operation", () => {
    let op = new ProgOperation(32)
    expect(op.subtract(1.75, 0.5)).equal(1)
  })

  it("should implement multiply operation", () => {
    let op = new ProgOperation(32)
    expect(op.multiply(3.5, 2.5)).equal(6)
  })

  it("should implement divide operation", () => {
    let op = new ProgOperation(32)
    expect(op.divide(3, 2)).equal(1.5)
  })

  it("should implement power operation", () => {
    let op = new ProgOperation(32)
    expect(op.power(2, 8)).equal(256)
  })

  it("should implement modulo operation", () => {
    let op = new ProgOperation(32)
    expect(op.modulo(9, 2)).equal(1)
  })

  it("should implement not operation", () => {
    let op = new ProgOperation(32)

    //  ‭~1010 1010 1010 1010 1010 1010 1010 1010‬
    // = ‭0101 0101 0101 0101 0101 0101 0101 0101‬
    expect(op.not(-1431655766)).equal(1431655765)
  })

  it("should implement or operation", () => {
    let op = new ProgOperation(32)

    //  ‭ 1111 0000 1111 0000 1010 1010 1010 1010
    // & 0000 1111 1111 0000 0101 0101 0101 0101
    // = 1111 1111 1111 0000 1111 1111 1111 1111
    expect(op.or(-252663126, 267408725)).equal(-983041)
  })

  it("should implement and operation", () => {
    let op = new ProgOperation(32)

    //  ‭ 1111 0000 1111 0000 1010 1010 1010 1010
    // & 0000 1111 1111 0000 0101 0101 0101 0101
    // = 0000 0000 1111 0000 0000 0000 0000 0000
    expect(op.and(-252663126, 267408725)).equal(15728640)
  })

  it("should implement xor operation", () => {
    let op = new ProgOperation(32)

    //  ‭ 1111 0000 1111 0000 1010 1010 1010 1010
    // ' 0000 1111 1111 0000 0101 0101 0101 0101
    // = 1111 1111 0000 0000 1111 1111 1111 1111
    expect(op.xor(-252663126,  267408725)).equal(-16711681)
  })

  it("should implement left shift operation", () => {
    let op = new ProgOperation(32)

    //  ‭  1111 0000 1111 0000 1010 1010 1010 1010
    // << 1
    // =  1110 0001 1110 0001 0101 0101 0101 0100
    expect(op.leftShift(-252663126, 1)).equal(-505326252)
  })

  it("should implement right shift operation", () => {
    let op = new ProgOperation(32)
    //  ‭  1111 0000 1111 0000 1010 1010 1010 1010
    // >> 1
    // =  1111 1000 0111 1000 0101 0101 0101 0101
    expect(op.rightShift(-252663126, 1)).equal(-126331563)
  })

  it("should implement unsigned right shift operation", () => {
    let op = new ProgOperation(32)
    //  ‭   1111 0000 1111 0000 1010 1010 1010 1010
    // >>> 1
    // =   0111 1000 0111 1000 0101 0101 0101 0101
    expect(op.unsignedRightShift(-252663126, 1)).equal(2021152085)
  })

  it("should validate supported bit size with isSupportedBitSize", () => {
    expect(ProgOperation.isSupportedBitSize(8)).equal(true)
    expect(ProgOperation.isSupportedBitSize(16)).equal(true)
    expect(ProgOperation.isSupportedBitSize(32)).equal(true)
    expect(ProgOperation.isSupportedBitSize(0)).equal(false)
    expect(ProgOperation.isSupportedBitSize(7)).equal(false)
    expect(ProgOperation.isSupportedBitSize(-8)).equal(false)
  })

  it("should truncate values to the current bit size when in 8-bit mode", () => {
    let op = new ProgOperation(8)

    // Min value
    // 1111 1111 1111 1111 1111 1111 1000 0000 -> 1000 0000
    expect(op.assign(-128)).equal(-128)

    // Zero value
    // 0000 0000 0000 0000 0000 0000 0000 0000 -> 0000 0000
    expect(op.assign(0)).equal(0)

    // Max value
    // 0000 0000 0000 0000 0000 0000 0111 1111 -> 0111 1111
    expect(op.assign(127)).equal(127)

    // +ve overflow value
    // 0000 0000 0000 0000 0000 0000 1000 0000 -> 1000 1000
    expect(op.assign(128)).equal(-128)

    // -ve overflow value
    // ‭1111 1111 1111 1111 1111 1111 0111 1111‬ -> 0111 1111
    expect(op.assign(-129)).equal(127)
  })

  it("should truncate values to the current bit size when in 16-bit mode", () => {
    let op = new ProgOperation(16)

    // Min value
    // 1111 1111 1111 1111 1000 0000 0000 0000 -> 1000 0000 0000 0000
    expect(op.assign(-32768)).equal(-32768)

    // Zero value
    // 0000 0000 0000 0000 0000 0000 0000 0000 -> 0000 0000 0000 0000
    expect(op.assign(0)).equal(0)

    // Max value
    // 0000 0000 0000 0000 0111 1111 1111 1111 -> 0111 1111 1111 1111
    expect(op.assign(32767)).equal(32767)

    // +ve overflow value
    // 0000 0000 0000 0000 1000 0000 0000 0000 -> 1000 0000 0000 0000
    expect(op.assign(32768)).equal(-32768)

    // -ve overflow value
    // ‭1111 1111 1111 1111 0111 1111 1111 1111‬ -> 0111 1111 1111 1111
    expect(op.assign(-32769)).equal(32767)
  })

  it("should truncate values to the current bit size when in 32-bit mode", () => {
    let op = new ProgOperation(32)

    // Min value
    // 1000 0000 0000 0000 0000 0000 0000 0000 -> 1000 0000 0000 0000 0000 0000 0000 0000
    expect(op.assign(-2147483648)).equal(-2147483648)

    // Zero value
    // 0000 0000 0000 0000 0000 0000 0000 0000 -> 0000 0000 0000 0000 0000 0000 0000 0000
    expect(op.assign(0)).equal(0)

    // Max value
    // 0111 1111 1111 1111 1111 1111 1111 1111 -> 0111 1111 1111 1111 1111 1111 1111 1111
    expect(op.assign(2147483647)).equal(2147483647)

    // +ve overflow value
    // 1000 0000 0000 0000 0000 0000 0000 0000 -> 1000 0000 0000 0000 0000 0000 0000 0000
    expect(op.assign(2147483648)).equal(-2147483648)

    // -ve overflow value
    // ‭0111 1111 1111 1111 1111 1111 1111 1111‬ -> 0111 1111 1111 1111 1111 1111 1111 1111
    expect(op.assign(-2147483649)).equal(2147483647)
  })

})
