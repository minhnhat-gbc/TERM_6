//
//  ViewController.swift
//  lab1
//
//  Created by Nhat Minh Vo on 2023-01-26.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var label: UILabel!
    
    @IBOutlet weak var btnStepUp: UIButton!
    var counter = 0
    var step = 1
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        label.text = "\(counter)"
    }

    @IBAction func addOne(_ sender: UIButton) {
        
        counter+=step
        label.text = "\(counter)"
        
    }
    
    
    @IBAction func minusOne(_ sender: UIButton) {
        
        counter-=step
        label.text = "\(counter)"
    }
    
    @IBAction func clear(_ sender: UIButton) {
        counter=0
        step = 1
        label.text = "\(counter)"
        
        btnStepUp.setTitle("Step = \(step)", for: .normal)
        
    }
    
    @IBAction func stepup(_ sender: UIButton) {
        step+=1
        sender.setTitle("Step = \(step)", for: .normal)
    }
    
}

