//
//  ViewController.swift
//  lab10
//
//  2023-03-26.
//

import UIKit

class ViewController: UITableViewController {
    
    var posts:[Post] = []
    
    func decodeAPI(){
        guard let url = URL(string: "https://jsonplaceholder.typicode.com/posts")
        else{
            return
        }
        
        let task = URLSession.shared.dataTask(with: url){
            data, response, error in
            
            let decoder = JSONDecoder()
            
            if let data = data{
                do{
                    self.posts = try decoder.decode([Post].self, from: data)
                    
                    DispatchQueue.main.sync {
                        self.tableView.reloadData()
                    }
                }catch{
                    print(error)
                }
            }
        }
            task.resume()
    
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tableView.delegate = self
        self.tableView.dataSource = self
        
        decodeAPI()
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return posts.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for:indexPath)
        cell.textLabel?.text = posts[indexPath.row].title
        
        return cell
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let dest = segue.destination as? PostViewController{
            
            if let selected =
                self.tableView.indexPathForSelectedRow?.row{
                
                dest.post = posts[selected]
                
            }
        }
    }

}

