//
//  ViewController.swift
//  Labtest02_MinhNhatVo
//
//  Created by Nhat Minh Vo on 2023-04-13.
//
import UIKit
import CoreMotion // Accelermeter etc
import CoreLocation // GPS etc
import MapKit

class ViewController: UIViewController, CLLocationManagerDelegate {
    
    let motionManager = CMMotionManager()
    let locationMgr = CLLocationManager()
    @IBOutlet weak var mapView: MKMapView!

    var timer: Timer!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        locationMgr.delegate = self
        
        locationMgr.requestWhenInUseAuthorization()
        locationMgr.startUpdatingLocation()
        //locationMgr.startMonitoringSignificantLocationChanges()
//        locationMgr.startMonitoringVisits()
        if (motionManager.isAccelerometerActive && motionManager.isAccelerometerAvailable){
            print("Gyro present and active")
        } else{
            print("Gyro status: active=\(motionManager.isAccelerometerActive), avai=\(motionManager.isAccelerometerAvailable)")
        
            timer =
//            Timer.scheduledTimer(timeInterval: 3.0, target: self, selector: #selector(ViewController.update), userInfo: nil, repeats: true)
                         Timer(timeInterval: 3.0, repeats: true, block: {(timer) in self.update()})
//                        RunLoop.current.add(self.timer, forMode: RunLoop.Mode.default)
        }
    }
        
        @objc func update(){
            if let accData = motionManager.accelerometerData{
                print(accData)
            }else{
                print("No data avai")
            }
        }
    
    var pin: MKPlacemark?
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        
        guard let location = locations.last else {return}
        
        let geoCoder = CLGeocoder()
        geoCoder.reverseGeocodeLocation(location, completionHandler: {
            (placemarks, err) in
                    if let pls = placemarks{
                for p in pls{
                    let desc = p.description
                    print(desc)
                }
                    }else{
                        print(location)
                    }
            
        })
//        print(location)
        if let myPin = pin{
            mapView.removeAnnotation(pin!)
        }
        
        pin = MKPlacemark(coordinate: location.coordinate)
        
        mapView.setRegion( MKCoordinateRegion(center: location.coordinate, latitudinalMeters: 300  , longitudinalMeters: 300), animated: true)
        
        mapView.addAnnotation(pin!)
    }
    
    func locationManager(_ manager: CLLocationManager, didVisit visit: CLVisit) {
        print("Visit: \(visit.coordinate)" )
    }
    
    
    }
