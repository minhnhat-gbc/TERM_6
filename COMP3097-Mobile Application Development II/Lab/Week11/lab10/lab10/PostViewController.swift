//
//  PostViewController.swift
//  lab10
//
// 2023-03-26.
//

import UIKit

class PostViewController: UIViewController {

    @IBOutlet weak var userId: UILabel!
    
    @IBOutlet weak var postId: UILabel!
    
    @IBOutlet weak var postTitle: UILabel!
    
    
    @IBOutlet weak var postBody: UILabel!
    
    var post:Post!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        userId.text = "UserID: \(post.userId)"
        postId.text = "PostId: \(post.id)"
        postTitle.text = "Title: \n\(post.title)"
        postBody.text = "Body: \n\(post.body)"
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
