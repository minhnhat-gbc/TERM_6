console.log("Week01 - Node  Buffer Object");

console.log(__filename)
console.log(__dirname)

// Buffer

var buffer1 = Buffer.from("ABC Hello World")
console.log(buffer1)
console.log(buffer1[0])
console.log(buffer1[1])

console.log(buffer1.toString())

// buffer1[0] = "X"
buffer1[0] = 88
// buffer1[2] = 240

var buffer2 = Buffer.from("🤘🏻")
console.log(buffer2)
console.log(buffer2[0])
console.log(buffer2[1])
console.log(buffer2.toString())

console.log(buffer2.length)
console.log(buffer1.length)

console.log( buffer1.toString("utf-8"))
console.log( buffer1.toString("utf-16le"))
console.log( buffer1.toString("hex"))

// Allocation of Buffer
var buffer3 = Buffer.alloc(10)
console.log(buffer3.toString())
console.log(buffer3.length)

buffer3[0]= 65
buffer3[1]= 66
buffer3[2]= 67
console.log(buffer3.toString())
console.log(buffer3.length)        

// write string to buffer
buffer3.write("Nhat Minh Vo")
console.log(buffer3.toString())
console.log(buffer3.length)

buffer3.write("!!!!!", 2, 5)
// buffer3.write("!!!!%^%$!!!", 2, 10)
console.log(buffer3.toString())
console.log(buffer3.length)

// Default values
var buffer4 = Buffer.alloc(10).fill('$')
console.log(buffer4.toString())

// Concate
var newBuffer = buffer1 + buffer3
console.log(newBuffer.toString())

newBuffer = Buffer.concat([buffer1, buffer3])
console.log(newBuffer.toString())

// To JSON
console.log(newBuffer.toJSON())

// Find Hello from newBuffer
var flag = newBuffer.indexOf("Hello")
console.log(flag) //4

var flag = newBuffer.includes("Hello")
console.log(flag) //true

// Buffer Slice
var bufferSlice = newBuffer.slice(4,15)
console.log(newBuffer.toString())
console.log(bufferSlice.toString())

// Slice will also update the base buffer obj
bufferSlice[0] = 65
console.log(newBuffer.toString())
console.log(bufferSlice.toString())

console.log();