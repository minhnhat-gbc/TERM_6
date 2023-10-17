//
//  LocationTableViewController.swift
//  101306676_labtest2
//
//  Created by Nhat Minh Vo on 2023-04-20.
//

import UIKit
import CoreLocation

class LocationTableViewController: UITableViewController, CLLocationManagerDelegate{
    let locationMgr = CLLocationManager()
    var locationsDict = [Date:CLLocation]()
   
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        locationMgr.delegate = self
        locationMgr.requestWhenInUseAuthorization()
        //locationMgr.startMonitoringSignificantLocationChanges()
        locationMgr.startUpdatingLocation()
        
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return locationsDict.count
        
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else {return}
        let timestamp = Date()
        locationsDict[timestamp] = location
        
        //print("\(timestamp): \(location)")
        tableView.reloadData()
    }
    
    
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)

        // Configure the cell...
        let sortedKeys = locationsDict.keys.sorted()
        let timestamp = sortedKeys[indexPath.row]
        let location = locationsDict[timestamp]!
        var formattedDate = ""
        var formattedLocation = ""
        
        //format date and location
        let dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .medium
        dateFormatter.timeStyle = .medium
        
        formattedDate = dateFormatter.string(from: timestamp)
        formattedLocation = String(format: "%.4f, %.4f", location.coordinate.latitude, location.coordinate.longitude)
       
        cell.textLabel?.text = (formattedDate)
        cell.detailTextLabel?.text = formattedLocation
        return cell
    }

}
