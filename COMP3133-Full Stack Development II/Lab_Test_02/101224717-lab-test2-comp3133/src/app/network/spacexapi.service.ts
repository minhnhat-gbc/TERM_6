import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {

  constructor(private http: HttpClient) { }

  getAllList(): any {
    return this.http.get('https://api.spacexdata.com/v3/launches?')
  }

  getMissionFilter(year: string): any {
    return this.http.get(`https://api.spacexdata.com/v3/launches?launch_year=${year}`)
  }

  getSuccessLaunch(launch_success: boolean): any {
    return this.http.get(`https://api.spacexdata.com/v3/launches?launch_success=${launch_success}`)
  }
  getSuccessLanding(landing_intent: boolean): any {
    return this.http.get(`https://api.spacexdata.com/v3/launches?landing_intent=${landing_intent}`)
  }
  getMissionDetail(flightNo: any): any{
    return this.http.get(`https://api.spacexdata.com/v3/launches/${flightNo}`)
  }
}
