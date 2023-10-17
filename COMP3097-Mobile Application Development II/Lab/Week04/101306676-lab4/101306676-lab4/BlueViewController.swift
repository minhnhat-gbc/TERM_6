//
//  BlueViewController.swift
//  101306676-lab4
//
//  Created by Nhat Minh Vo on 2023-02-15.
//

import UIKit

class BlueViewController: UIViewController {

    @IBOutlet weak var mesageLabel: UILabel!
    
    var message = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()

        mesageLabel.text = message
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
