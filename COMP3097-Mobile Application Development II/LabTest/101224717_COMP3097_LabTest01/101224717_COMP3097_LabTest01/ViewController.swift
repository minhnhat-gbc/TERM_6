//
//  ViewController.swift
//  101224717_COMP3097_LabTest01
//
//  Created by Nhat Minh Vo on 2023-02-16.
//

import UIKit

class ViewController: UIViewController {

    
    @IBOutlet weak var N1: UILabel!
    
    @IBOutlet weak var N2: UILabel!
    
    @IBOutlet weak var N3: UILabel!
    
    @IBOutlet weak var N4: UILabel!
    
    @IBOutlet weak var N5: UILabel!

    @IBOutlet weak var N6: UILabel!
    
    @IBOutlet weak var table: UITableView!
    
//    var dataContainer: [String] = []
    
    func randInt(max: Int) -> Int {
        let rand: Int = Int(arc4random())
        return (rand % max) + 1
    }
    
    func randNum() -> Int{
        let max: Int = 65
        let random =  randInt(max: max)
        return random
    }
    
    
    @IBAction func clear(_ sender: Any) {
        N1.text = "-"
        N2.text = "-"
        N3.text = "-"
        N4.text = "-"
        N5.text = "-"
        N6.text = "-"
    }
    
    
    @IBAction func draw(_ sender: Any) {
        var labels = [UILabel]()
        labels.append(N1)
        labels.append(N2)
        labels.append(N3)
        labels.append(N4)
        labels.append(N5)
        labels.append(N6)
        
//        var ranNum = 0
//        for singLa in label{
//            var newRan = randNum()
//            while(newRan == ranNum){
//                newRan = randNum()
//                if(ranNum != newRan){
//                    singLa.text = "\(newRan)"
//                    break
//                }
//
//            }
//            singLa.text = "\(newRan)"
//            ranNum = newRan
//        }
            
        var count = 0
        var arrNum: [Int] = []
        
        while(count < 6){
            var rand: Int = randNum()
            if(arrNum.count == 0){
                arrNum.append(rand)
                count += 1
            }else{
                var is_exit = false
                for element in arrNum{
                    if (element == rand){
                        is_exit = true
                        break
                    }
                }
                if is_exit == false{
                    arrNum.append(rand)
                    count += 1
                }
            }
        }
//        dataContainer = arrNum.map{String($0)}
        
        for (label, element) in zip(labels, arrNum){
            label.text = "\(element)"
            
        }
    
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
//        table.delegate = self
//        table.dataSource = self
        
        
    }


}

//extension ViewController: UITableViewDelegate, UITableViewDataSource{
//    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
//        print("selected")
//    }
//    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
//        return 23
//    }
//
//    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
//        let cell = tableView.dequeueReusableCell(withIdentifier: "data", for: indexPath)
//        cell.textLabel?.text = dataContainer[indexPath.row]
//        return cell
//    }
//}
