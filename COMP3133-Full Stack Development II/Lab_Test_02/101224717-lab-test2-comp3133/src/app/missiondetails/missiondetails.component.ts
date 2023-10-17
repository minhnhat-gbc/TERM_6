import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mission } from '../models/missions';
import { SpacexapiService } from '../network/spacexapi.service';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent implements OnInit {
  singleMission: any
  flightNo: any;
  constructor(private route: ActivatedRoute, private spacexapiService: SpacexapiService) { }

  ngOnInit() {
    // console.log(this.route.snapshot.params['flight_number']);
    this.flightNo = this.route.snapshot.params['flight_number'];
    this.getSingleMission()
  }

  getSingleMission() {
    this.spacexapiService.getMissionDetail(this.flightNo).subscribe((data: any) => {
      this.singleMission = data
      console.log(this.singleMission);
      // console.log(data.rocket.first_stage.cores[0].landing_intent);
    })
  }

}
