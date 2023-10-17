import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mission } from '../models/missions';
import { SpacexapiService } from '../network/spacexapi.service';

@Component({
  selector: 'app-missionfilter',
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionfilterComponent implements OnInit {
  launchYears = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020',]
  launchYearSelectedIndex: any

  constructor(private spacexapiService: SpacexapiService, private router: Router) { }

  listMission: Mission[] = [];

  ngOnInit(): void {
    this.spacexapiService.getAllList().subscribe((data: Mission[]): void => {
      this.listMission = data
    })
  }

  getAll(): any {
    this.spacexapiService.getAllList().subscribe((data: any) => {
      this.listMission = data
    }, (err: any) => {
      console.log(err);

    })
  }

  missionFilter(index: number, year: string): any {
    this.getFilteredLaunches(year);
    this.launchYearSelectedIndex = index
  }


  getFilteredLaunches(year: string): any {
    this.spacexapiService.getMissionFilter(year).subscribe((data: any) => {
      this.listMission = data
    }, (err: any) => {
      console.log(err);

    })
  }

  successLaunchFilter(value: boolean): any {
    this.getSuccessLaunch(value)
  }

  getSuccessLaunch(value: boolean): any {
    this.spacexapiService.getSuccessLaunch(value).subscribe((data: any) => {
      this.listMission = data
    }, (err: any) => {
      console.log(err);
    })
  }

  successLandingFilter(value: boolean): any {
    this.getSuccessLanding(value)
  } 

  getSuccessLanding(value: boolean): any {
    this.spacexapiService.getSuccessLanding(value).subscribe((data: any) => {
      this.listMission = data
    }, (err: any) => {
      console.log(err);
    })
  }


  removeFilter(): void {
    this.getAll()
    this.launchYearSelectedIndex = null
  }
}
