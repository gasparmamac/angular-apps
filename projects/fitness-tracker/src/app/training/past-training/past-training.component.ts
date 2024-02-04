import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
  providers: [DatePipe],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private dataSourceSubscription = new Subscription();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private datePipe: DatePipe
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.trainingService.fetchFinishedOrCancelledExercises();
    this.dataSourceSubscription =
      this.trainingService.finishedOrCancelledxercises$.subscribe(
        (exercises) => (this.dataSource.data = exercises)
      );
  }

  ngOnDestroy(): void {
    if (this.dataSourceSubscription) this.dataSourceSubscription.unsubscribe();
  }

  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatFirestoreTimeStamp(timestamp: any): string | null {
    const dateObject = timestamp.toDate();
    return this.datePipe.transform(dateObject, 'yyyy-MM-dd');
  }
}
