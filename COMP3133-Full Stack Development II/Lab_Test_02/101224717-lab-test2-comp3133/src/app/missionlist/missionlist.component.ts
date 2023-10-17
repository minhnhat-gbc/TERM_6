import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mission } from '../models/missions';
import { SpacexapiService } from '../network/spacexapi.service';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  
  constructor(private spacexapiService: SpacexapiService, private router: Router) { }

  listMission: Mission[] = [];

  ngOnInit(): void {
    this.spacexapiService.getAllList().subscribe( (data: Mission[]): void => {
      this.listMission = data
      
    })
  }

}
