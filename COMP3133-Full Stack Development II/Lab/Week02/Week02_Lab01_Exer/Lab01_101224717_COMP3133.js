const express = require('express')
const fs = require('fs')
const fsPromise = require('fs').promises
const csv = require('csv-parser')
const path = require('path')

const app = express()

app.use(express.json())

let header = "country, year, population\n"
rs_file = "input_countries.csv"
file1 = "canada.txt"
file2 = "usa.txt"
fileName = (file) => {return path.join(__dirname, 'Files', file)} 
let cana_array = []
let us_array = []

let rs = fs.createReadStream(fileName(rs_file))

if ((!fs.existsSync(fileName(file1)) && !fs.existsSync(fileName(file2))) 
    || (!fs.existsSync(fileName(file1)) && fs.existsSync(fileName(file2)))
    || (fs.existsSync(fileName(file1)) && !fs.existsSync(fileName(file2)))){
    rs.pipe(csv({}))
        .on("data", (row) => {
            let keyCountry = Object.keys(row)
            if (row[keyCountry[0]] === "Canada") {
                cana_array.push(`${row[keyCountry[0]]}, ${row[keyCountry[1]]}, ${row[keyCountry[2]]} ${"\n"}`)
                let canaRes = cana_array.join("")
                fs.writeFileSync(fileName(file1), header)
                fs.writeFileSync(fileName(file1), canaRes, { flag: 'a' })
            }
            else if(row[keyCountry[0]] === "United States")
            {
                us_array.push(`${row[keyCountry[0]]}, ${row[keyCountry[1]]}, ${row[keyCountry[2]]} ${"\n"}`)
                let usRes = us_array.join("")
                fs.writeFileSync(fileName(file2), header)
                fs.writeFileSync(fileName(file2), usRes, { flag: 'a' })
            }
        })
        .on("error", (err) => {
            console.log(err.message)
        })
        .on("end", () => {
            console.log("**Complete creating files**");
        }) 
}
else 
{
    let removeFile = async () => {
        try{
            await fsPromise.unlink(fileName(file1))
            await fsPromise.unlink(fileName(file2))
            console.log("Delete Successfully!!");
        }catch (err){
            console.error(err);
        }
    }
    removeFile()
}


app.listen(3000, () => console.log("Server is running\n"))







