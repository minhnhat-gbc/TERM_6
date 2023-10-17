const method = require('./app/calculator.js')

module.exports = {
    addNum: (val1, val2) => {
        return method.add(val1, val2)
    },
    
    subNum: (val1, val2) => {
        return method.sub(val1, val2)
    },
    
    mulNum: (val1, val2) => {
        return method.mul(val1, val2)
    },
    
    divNum: (val1, val2) => {
        return method.div(val1, val2)
    },
 }
