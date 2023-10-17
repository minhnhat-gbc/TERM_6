const assert = require('chai').assert
const addNum = require('../app').addNum
const subNum = require('../app').subNum
const mulNum = require('../app').mulNum
const divNum = require('../app').divNum

describe('Lab2_mocha_test\n', () => {
    describe('Add number', () => {
        it('addNum should be equal 10', () => {
            // let expectRes = 8
            let result = addNum(5,5)
            // if (result !== expectRes){
            //     throw new Error(`Res should be 10 but its ${result}!`)
            // }
            assert.equal(result, 10)
        });
        it('addNum should return 10', () => {
            let result = addNum(5,3)
            assert.equal(result, 10)
        });    
    })
    describe('\nSubtract number', () => {
        it('subNum should be equal 10', () => {
            let result = subNum(15,5)
            assert.equal(result, 10)
        });
        it('subNum should return 10', () => {
            let result = subNum(8,3)
            assert.equal(result, 10)
        });    
    })
    describe('\nMultiply number', () => {
        it('mulNum should be equal 10', () => {
            let result = mulNum(2,5)
            assert.equal(result, 10)
        });
        it('mulNum should return 10', () => {
            let result = mulNum(8,3)
            assert.equal(result, 10)
        });    
    })
    describe('\nDivide number', () => {
        it('divNum should be equal 10', () => {
            let result = divNum(15,5)
            assert.equal(result, 3)
        });
        it('divNum should return 10', () => {
            let result = divNum(8,2)
            assert.equal(result, 5)
        });    
    })

})