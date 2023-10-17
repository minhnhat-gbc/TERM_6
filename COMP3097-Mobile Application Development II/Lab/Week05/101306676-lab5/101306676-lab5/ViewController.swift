//
//  ViewController.swift
//  101306676-lab5
//
//  Created by Phuong Hoang on 2023-02-15.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var label: UILabel!
    
    var country:Country! = nil
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        label.text = country.name
    }


}

