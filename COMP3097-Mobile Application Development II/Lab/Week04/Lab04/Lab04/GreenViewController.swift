//
//  GreenViewController.swift
//  Lab04
//
//  Created by Nhat Minh Vo on 2023-02-02.
//

import UIKit

class GreenViewController: UIViewController {
    
    
    @IBOutlet weak var messageBox: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
    
    
    // MARK: - Navigation
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
        
        if segue.identifier == "grey" {
            let c = segue.destination as! GreyViewController
            if let s = messageBox.text{
                c.message = s
            }
            
        }
        
        
    }
}
