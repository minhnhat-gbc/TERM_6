var fs = require('fs');


const header = "eid, name, salary";
const file_name = "emp.csv"
fs.writeFileSync(file_name, header);

var data = "\n1, Minh Nhat, 500"
fs.writeFileSync(file_name, data, {flag: 'a'});

var data = "\n2, Huy Hoang, 1220"
fs.writeFileSync(file_name, data, {flag: 'a'});

var data = fs.readFileSync(file_name);
console.log(`${data.toString()}`);


// // Delete the file_name
// fs.unlinkSync(file_name)