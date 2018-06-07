import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Reading } from '../shared/reading.model';
import { ReadingService } from '../shared/reading.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-reading',
  templateUrl: './add-reading.component.html',
  styleUrls: ['./add-reading.component.css']
})

export class AddReadingComponent implements OnInit {

  reading: Reading;
  category: Category;
  
  constructor( 
    private readingService: ReadingService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    // this.getReading();
  }

  getReading(): void {
    // const id = +this.route.snapshot.paramMap.get('Id');
    this.reading = this.data.reading;
    //console.log('CATEGORY ID ' + id);
    //this.categoryService.getCategoryDetails(id).subscribe(c => this.catInfo = c);
  }

}
