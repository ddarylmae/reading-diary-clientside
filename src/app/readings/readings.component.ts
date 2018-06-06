import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { Reading } from '../shared/reading.model';
import { ReadingService } from '../shared/reading.service';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.css']
})
export class ReadingsComponent implements OnInit {

  readingList: Reading[];
  // reading: Reading;
  
  _listFilter: string;
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      if(this.listFilter){ 
        this.readingList = this.performFilter(this.listFilter);
       }else{
        this.getReadings();
       }
  }

  constructor(
    private readingService: ReadingService
  ) { }

  performFilter(filterBy: string): Reading[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.readingList.filter((reading: Reading) =>
          reading.Title.toLocaleLowerCase().indexOf(filterBy) !== -1 );
}

  ngOnInit() {
    this.getReadings();
  }

  getReadings(): void {
    this.readingService.getAllReadings().subscribe(readings => this.readingList = readings);

  }

  pageTitle: string = 'Reading List';
  
}
