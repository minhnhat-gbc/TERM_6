import UIKit

// Q1
func greet(name:String) ->Void{
    print("Wellcome \(name) to the Swift!")
}

greet(name:"Minh Nhat")

// Q2
func area(width w:Int, height h:Int) ->Int{
    var res = 0
    res = w*h
    
    return res
}

area(width:1, height:2)

// Q3
func area2(_ w:Int, _ h:Int) ->Int{
    var res = 0
    res = w*h
    
    return res
}

area2(1, 2)

// Q4

func caculator(a:Int, b: Int, op:String) ->Int{
    func plus(a:Int, b: Int) ->Int{return a+b}
    func minus(a:Int, b: Int) ->Int{return a-b}
    func multi(a:Int, b: Int) ->Int{return a*b}
    
    switch op{
    case "+":
        return plus(a:a, b:b)
    case "-":
        return minus(a:a, b:b)
    case "*":
        return multi(a:a, b:b)
    default:
        return 0
    
    }
}

caculator(a: 2, b: 3, op: "+")
