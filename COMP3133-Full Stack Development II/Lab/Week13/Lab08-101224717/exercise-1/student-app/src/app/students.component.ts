import { Component } from "@angular/core";

@Component({
    selector: 'students',
    template: `<h2>{{ getTitle() }} {{getCurrentDate() | date:'yyyy-MM-dd' }}</h2>`
})
export class StudentsComponent {
    title = 'My list of Students';

    getTitle(){
        return this.title
    };
    

    myDate = new Date()
    
    getCurrentDate(){
        return this.myDate

    }
}