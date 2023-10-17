var fs = require('fs');
var zlib = require('zlib')
const input_stream = "input_stream.txt"
const output_stream = "output_stream.txt"
var readSream = fs.createReadStream(input_stream)

var writeStream = fs.createWriteStream(output_stream)

readSream.pipe(writeStream)

//ZIP using pipe

var zlibWriteStream = fs.createWriteStream("output.data.gz")
readSream.pipe(zlib.createGzip())
        .pipe(zlibWriteStream)