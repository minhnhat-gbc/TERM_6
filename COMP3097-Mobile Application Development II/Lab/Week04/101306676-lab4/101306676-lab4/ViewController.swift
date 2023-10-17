//
//  ViewController.swift
//  101306676-lab4
//
//  Created by Phuong Hoang on 2023-02-15.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    @IBAction func getBackToMain(_ segue: UIStoryboardSegue){
        print(segue.identifier)
    }

}

