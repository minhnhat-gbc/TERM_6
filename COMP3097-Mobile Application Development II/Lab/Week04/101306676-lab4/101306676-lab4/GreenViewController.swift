//
//  GreenViewController.swift
//  101306676-lab4
//
//  Created by Nhat Minh Vo on 2023-02-15.
//

import UIKit

class GreenViewController: UIViewController {
    
    
    @IBOutlet weak var mesageBox: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    

    @IBAction func getBack(_ segue: UIStoryboardSegue){
        
    }
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
        if segue.identifier == "blue" {
            let c = segue.destination as! BlueViewController
            if let s = mesageBox.text {
                c.message = s
            }
        }
    }
    

}
