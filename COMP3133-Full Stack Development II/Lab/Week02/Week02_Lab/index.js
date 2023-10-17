console.log("Week02 - File Handling\n");

const fs = require('fs');

console.log("___START___\n");
fs.readFile("input.txt", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Async: ${data.toString()}`);
})

console.log("___START Async___");
var data = fs.readFileSync("input.txt");
console.log(`Async: ${data.toString()}`);
console.log("___END___");

